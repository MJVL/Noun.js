var arrNouns = ['node', 'atom', 'brick', 'react', 'mouse', 'store', 'tree'];

function fillWords() {
    
}

fillWords();

var generator = new Vue({
    el: '#generated-name',
    data: {
        name: 'Unoriginal.js'
    },
    methods: {
        randomWord: function() {
            this.name = arrNouns[Math.floor(Math.random() * arrNouns.length)];
        }
    }
})