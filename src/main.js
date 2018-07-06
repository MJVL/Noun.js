var generator = new Vue({
    el: '#generated-name',
    data: {
        package: DEFAULT,
        exists: true,
        result: 'This package does exist.'
    },
    methods: {
        randomWord: function() {
            this.package = NOUNS[Math.floor(Math.random() * NOUNS.length)];
            this.package = this.package.charAt(0).toUpperCase() + this.package.substr(1) + EXTENSION;
            this.checkExistence();
        },
        checkExistence: function() {
            //this.exists =
            this.result = 'This package does' + ((this.exists) ? '' : "n't") + ' exist.'; 
        },
        createRepository: function() {
            let ghWindow = window.open('https://github.com/new');
            ghWindow.getElementById('repository_name').value = this.package;
        }
    }
})

var tray = new Vue({
    el: '#icon-tray',
    methods: {
        searchForName: function() {
            window.open('https://www.google.com/search?q=' + generator.package);
        },
        travelToRepository: function() {
            window.open('https://github.com/MJVL/Noun.js');
        }
    }
})
