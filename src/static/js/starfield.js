'use strict';
window.onload = function() {
    setTimeout(start, 200);
};

function start() {

    function lineToAngle(x1, y1, length, radians) {
        return { x: x1 + length * Math.cos(radians), y: y1 + length * Math.sin(radians) };
    }

    function randomRange(min, max) {
        return min + Math.random() * (max - min);
    }

    function degreesToRads(degrees) {
        return degrees / 180 * Math.PI;
    }

    let particle = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 0,

        create: function(x, y, speed, direction) {
            let obj = Object.create(this);
            obj.x = x;
            obj.y = y;
            obj.vx = Math.cos(direction) * speed;
            obj.vy = Math.sin(direction) * speed;
            return obj;
        },

        getSpeed: function() {
            return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        },

        setSpeed: function(speed) {
            let heading = this.getHeading();
            this.vx = Math.cos(heading) * speed;
            this.vy = Math.sin(heading) * speed;
        },

        getHeading: function() {
            return Math.atan2(this.vy, this.vx);
        },

        setHeading: function(heading) {
            let speed = this.getSpeed();
            this.vx = Math.cos(heading) * speed;
            this.vy = Math.sin(heading) * speed;
        },

        update: function() {
            this.x += this.vx;
            this.y += this.vy;
        }
    };
    
    let canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        stars = [],
        layers = [
            { speed: 0.015, scale: 0.2, count: 320 },
            { speed: 0.03, scale: 0.5, count: 50 },
            { speed: 0.05, scale: 0.75, count: 30 }
        ],
        starsAngle = 145,
        starBaseRadius = 2,
        paused = false;

    
    for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];
        for (let j = 0; j < layer.count; j++) {
            let star = particle.create(randomRange(0, width), randomRange(0, height), 0, 0);
            star.radius = starBaseRadius * layer.scale;
            star.setSpeed(layer.speed);
            star.setHeading(degreesToRads(starsAngle));
            stars.push(star);
        }
    }

    function update() {
        if (!paused) {
            context.clearRect(0, 0, width, height);
            context.fillStyle = "#243146";
            context.fillRect(0, 0, width, height);
            context.fill();
            for (let i = 0; i < stars.length; i++) {
                let star = stars[i];
                star.update();
                drawStar(star);
                star.x = (star.x > width) ? 0 : (star.x < 0) ? width : star.x;
                star.y = (star.y > height) ? 0 : (star.y < 0) ? height : star.y;
            }
        }
        requestAnimationFrame(update);
    }

    function drawStar(star) {
        context.fillStyle = '#ffdd9d';
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        context.fill();
    }

   
    update();

    window.onfocus = function () {
      paused = false;
    };

    window.onblur = function () {
      paused = true;
    };

}