var generator = new Vue({
    el: '#main',
    data: {
        package: DEFAULT,
        packageStem: "",
        exists: true,
        noun: true,
        link: 'https://github.com/MJVL/Noun.js',
        firstClick: true
    },
    methods: {
        randomWord: function() {
            this.noun = false;
            // Pick a packageStem that won't result in a div overflow
            // TODO: Allow the user to type in their own package name.
            do {
                this.packageStem = NOUNS[Math.floor(Math.random() * NOUNS.length)];
            } while (this.checkOverflow());

            // Capitalize first character and add ".js" to the end for display
            this.package = this.packageStem.charAt(0).toUpperCase() + this.packageStem.substr(1) + EXTENSION;

            this.firstClick = false;
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
                    let found = false;
                    let pkgLink = '';

                    // Check each "hit" from npmsearch.com's api for an exact match
                    packages.forEach(function(p) {
                        if (p.name == generator.packageStem || p.name == generator.package) {
                            found = true;

                            // All NPM packages have this homepage link format
                            pkgLink = 'http://npmjs.com/package/' + p.name;
                        }
                    });

                    // Whack those values back into the Vue
                    generator.exists = found;
                    generator.link = pkgLink;
                }
            });
        },
        checkOverflow: function() {
            return this.packageStem.indexOf('-') !== -1 && this.packageStem.length >= 10;
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
