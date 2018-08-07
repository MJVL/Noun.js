Vue.component('github-button', {
    template: '<img src="src/assets/github.png" id="repository" class="hvr-push" v-on:click="travelToRepository"/>',
    methods: {
        travelToRepository: function() {
            window.open('https://github.com/MJVL/Noun.js');
        }
    }
});

Vue.component('spinner', {
    template: `
        <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
    `
});