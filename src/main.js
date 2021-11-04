var generator = new Vue({
    el: '#main',
    data: {
        package: DEFAULT,
        packageStem: '',
        exists: true,
        link: 'https://github.com/MJVL/Noun.js',
        card: {
          title: '',
          link: '',
          slug: '',
          details: ''
        },
        cardReady: false,
        firstClick: true
    },
    methods: {
        randomWord: function() {
            // Pick a packageStem that won't result in a div overflow
            // TODO: Allow the user to type in their own package name.
            do {
                this.packageStem = NOUNS[Math.floor(Math.random() * NOUNS.length)];
            } while (this.checkOverflow());

            // Capitalize first character and add ".js" to the end for display
            this.package = this.packageStem.charAt(0).toUpperCase() + this.packageStem.substr(1) + EXTENSION;

            this.firstClick = this.cardReady = this.exists = false;

            this.checkExistence();
        },
        checkExistence: function() {
            jQuery.ajax({
                url: 'https://npmsearch.com/query?q=' + this.packageStem + '&fields=name',
                success: function (result) {
                    if (result.isOk === false) alert(result.message);

                    // Parse the result into an object
                    let packages = JSON.parse(result).results;

                    // Check each "hit" from npmsearch.com's api for an exact match
                    packages.forEach(function(p) {
                        if (p.name[0].toLowerCase() === generator.packageStem.toLowerCase()
                            || p.name[0].toLowerCase() === generator.package.toLowerCase()) {
                            generator.$data.exists = true;

                            // All NPM packages have this homepage link format
                            generator.$data.link = 'http://npmjs.com/package/' + p.name[0];
                            
                            return false;
                        }
                    });

                    if (generator.exists === true) {
                        generator.getCardInfo();
                    }
                }
            });
        },
        getCardInfo: function() {
            jQuery.ajax({
                url: 'https://api.codetabs.com/v1/proxy?quest=https://registry.npmjs.org/' + generator.packageStem,
                dataType: 'json',
                headers: {
                    'Access-Control-Allow-Credentials' : true,
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'GET',
                    'Access-Control-Allow-Headers':'application/json',
                },
                success: function (result) {
                    generator.card.title = result._id;
                    generator.card.link = generator.link;
                    generator.card.slug = result.description;

                    let currentVer = result['dist-tags'].latest;
                    let currentVerInfo = null;

                    for (let version in result.versions) {
                        if (result.versions.hasOwnProperty(version)) {
                            if (result.versions[version].version === currentVer) {
                                currentVerInfo = result.versions[version];
                            }
                        }
                    }
                
                    generator.card.details = (currentVerInfo !== null) ? currentVerInfo.version : currentVer;
                    generator.cardReady = true;
                },
            });
        },
        checkOverflow: function() {
            return this.packageStem.indexOf('-') !== -1 && this.packageStem.length >= 10;
        }
    }
});

new Vue({ el: '#icon-tray' });

new Vue({ el: '#card-load' });
