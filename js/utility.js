var generator = new Vue({
    el: '#generated-name',
    data: {
        name: DEFAULT,
        exists: true,
        result: 'This repository does exist.'
    },
    methods: {
        randomWord: function() {
            this.name = NOUNS[Math.floor(Math.random() * NOUNS.length)];
            this.name = this.name.charAt(0).toUpperCase() + this.name.substr(1) + EXTENSION;
            this.checkExistence();
        },
        checkExistence: function() {
            //this.exists =
            this.result = 'This repository does' + ((this.exists) ? '' : "n't") + ' exist.'; 
        }
    }
})

var tray = new Vue({
    el: '#icon-tray',
    methods: {
        searchForName: function() {
            window.open('https://www.google.com/search?q=' + generator.name);
        },
        travelToRepository: function() {
            window.open('https://github.com/MJVL/Noun.js');
        }
    }
})
