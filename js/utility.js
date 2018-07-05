var generator = new Vue({
    el: '#generated-name',
    data: {
        name: DEFAULT
    },
    methods: {
        randomWord: function() {
            this.name = NOUNS[Math.floor(Math.random() * NOUNS.length)];
            this.name = this.name.charAt(0).toUpperCase() + this.name.substr(1) + EXTENSION;
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
