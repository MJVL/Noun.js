var generator = new Vue({
    el: '#main',
    data: {
        package: DEFAULT,
        packageStem: "",
        exists: true,
        noun: true,
        link: "https://github.com/MJVL/Noun.js",
        card: {
          title: "",
          link: "",
          slug: "",
          details: ""
        },
        cardReady: false,
        firstClick: true
    },
    methods: {
        randomWord: function() {
            this.noun = false;
            // Pick a package name
            // TODO: Allow the user to type in their own package name.
            this.packageStem = NOUNS[Math.floor(Math.random() * NOUNS.length)];

            // Capitalize first character and add ".js" to the end for display
            this.package = this.packageStem.charAt(0).toUpperCase() + this.packageStem.substr(1) + EXTENSION;

            this.firstClick = false;

            this.exists = false;
            this.cardReady = false;

            this.checkExistence();
        },
        checkExistence: function() {
            jQuery.ajax({
                url: 'https://npmsearch.com/query?q=' + this.packageStem + '&fields=name',
                success: function (result) {
                    // TODO: Little red balloon on error instead of using alert()
                    if (result.isOk == false) alert(result.message);

                    // Parse the result into an object
                    let packages = JSON.parse(result).results;

                    // JS is dumb and I can't access the regular variables from inside a loop...
                    // so use these temp ones.
                    var found = false;
                    var pkgLink = "";

                    // Check each "hit" from npmsearch.com's api for an exact match
                    packages.forEach(function(p) {
                        if (p.name[0].toLowerCase() == generator.packageStem.toLowerCase()
                            || p.name[0].toLowerCase() == generator.package.toLowerCase()) {
                            found = true;

                            // All NPM packages have this homepage link format
                            pkgLink = 'http://npmjs.com/package/' + p.name[0];
                        }
                    });

                    // Whack those values back into the Vue
                    generator.exists = found;
                    generator.link = pkgLink;

                    if (generator.exists == true) {
                        generator.getCardInfo();
                    }
                }
            });
        },
        getCardInfo: function() {
            // Get the info for the card
            // See end of file for details on why use fetch() and why JS is dumb.
            fetch('https://registry.npmjs.org/' + generator.packageStem);
        }
    }
});

var tray = new Vue({
    el: '#icon-tray',
    methods: {
        // FIXME: This is a private repo. Either make it public or remove this.
        travelToRepository: function() {
            window.open('https://github.com/MJVL/Noun.js');
        }
    }
});

// JavaScript is dumb. All of this is to allow me to make a cross-site
// JSON request without modifying headers using PHP.

// https://stackoverflow.com/questions/20510336/get-data-json-format-from-another-domain-without-jsonp

function getJSON(url) {  //quick and dirty
  let script = document.createElement('script');
  script.setAttribute('src', url);
  script.setAttribute('type', 'text/javascript');
  document.getElementsByTagName('head')[0].appendChild(script);
}

function cbfunc(json) {     //the callback function
   if (json.query.count) {
        let data = json.query.results.json;

        // Update generator card thing
        generator.card.title = data._id;
        generator.card.link = generator.link;
        generator.card.slug = data.description;

        let currentVer = data['dist-tags'].latest;
        let currentVerInfo = null;

        for (let version in data.versions) {
            if (data.versions.hasOwnProperty(version)) {
                console.log(version);
                if (data.versions[version].version == currentVer) {
                    currentVerInfo = data.versions[version];
                }
            }
        }

        console.log('Current version info: ');
        console.log(currentVerInfo);

        generator.card.details = currentVerInfo.version;
        generator.cardReady = true;

   } else {
        //alert('Error: nothing found');
        generator.cardReady = false;
        return false;
   }
}

function fetch(url) {
   let yql="select * " +
           " from json" +
           " where url='" + url + "';";
   yql="http://query.yahooapis.com/v1/public/yql?q=" +
       encodeURIComponent(yql) +
       "&format=json" +
       "&callback=cbfunc";
   getJSON(yql);
}
