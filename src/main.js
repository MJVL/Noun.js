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
                url: 'https://api.npms.io/v2/search?q=' + generator.packageStem + "&size=1",
                success: function (result) {
                    if (result === undefined || result.results.length === 0) return;

                    let package = result.results[0]['package'];
                    if (package.name.toLowerCase() === generator.packageStem.toLowerCase() || package.name.toLowerCase() === generator.package.toLowerCase()) {
                        generator.exists = true;
                        generator.card.title = package.name;
                        generator.card.link = 'http://npmjs.com/package/' + package.name;
                        generator.card.slug = package.description;
                        generator.card.details = package.version;
                        generator.cardReady = true;
                    }
                }
            });
        },
        checkOverflow: function() {
            return this.packageStem.indexOf('-') !== -1 && this.packageStem.length >= 10;
        }
    }
});

new Vue({ el: '#icon-tray' });

new Vue({ el: '#card-load' });
