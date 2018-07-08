Vue.component('github-button', {
    template: '<img src="src/assets/github.png" id="repository" v-on:click="travelToRepository"/>',
    methods: {
        // Won't work for users until repository is public
        travelToRepository: function() {
            window.open('https://github.com/MJVL/Noun.js');
        }
    }
});