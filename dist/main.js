"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Particle {
    constructor(x, y, speed, angle, radius, color, deathTime, startTime) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angle = angle;
        this.radius = radius;
        this.color = color;
        this.deathTime = deathTime;
        this.startTime = startTime;
    }
    move() {
        let xdist = Math.cos(this.angle * Math.PI / 180) * this.speed;
        this.x += xdist;
        let ydist = -Math.sin(this.angle * Math.PI / 180) * this.speed;
        this.y += ydist;
        this.radius *= 0.995;
    }
    draw(ctx, time) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        let alpha = (this.deathTime - time) / (this.deathTime - this.startTime);
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`;
        ctx.fill();
    }
    isDead(time) {
        return time > this.deathTime;
    }
}
let midx = canvas.width / 2;
let midy = canvas.height / 2;
let spawnFrequency = 10;
let speedModifier = 5;
let spawnCountMultiplier = 5;
// returns random particles
function generateParticles(time) {
    let count = 5 + Math.random() * spawnCountMultiplier;
    let particles = [];
    for (let i = 0; i < count; i++) {
        let speed = 1 + Math.random() * speedModifier;
        let angle = Math.random() * 360;
        let rgb = { r: Math.random() * 360, g: Math.random() * 360, b: Math.random() * 360 };
        let radius = 20 + Math.random() * 20;
        let deadTime = 100 + Math.random() * 100 + time;
        particles.push(new Particle(midx, midy, speed, angle, radius, rgb, deadTime, time));
    }
    return particles;
}
function begin() {
    return __awaiter(this, void 0, void 0, function* () {
        let time = 0;
        let particles = [];
        yield sleep(1000);
        yield spawnListeners();
        while (true) {
            if (time % spawnFrequency == 0) {
                particles = particles.concat(generateParticles(time));
            }
            // delete current content
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let toRemove = [];
            let i = 0;
            // loop over all particles and draw / prepare remove
            for (const particle of particles) {
                if (particle.isDead(time)) {
                    toRemove.push(i);
                }
                else {
                    particle.draw(ctx, time);
                    particle.move();
                }
                i++;
            }
            // remove all dead particles
            for (const ind in toRemove.reverse()) {
                particles.splice(Number(ind), 1);
            }
            yield sleep(10);
            time += 1;
        }
    });
}
function spawnListeners() {
    return __awaiter(this, void 0, void 0, function* () {
        // Spawn frequency
        const slider = document.getElementById("freqSlider");
        const sliderValue = document.getElementById("freqSliderValue");
        slider.addEventListener("input", () => {
            spawnFrequency = Number(slider.value);
            sliderValue.textContent = slider.value;
        });
        const speedSlider = document.getElementById("speedSlider");
        const speedSliderValue = document.getElementById("speedSliderValue");
        speedSlider.addEventListener("input", () => {
            speedModifier = Number(speedSlider.value);
            speedSliderValue.textContent = speedSlider.value;
        });
        const spawnCountSlider = document.getElementById("spawnCountSlider");
        const spawnCountSliderValue = document.getElementById("spawnCountSliderValue");
        spawnCountSlider.addEventListener("input", () => {
            spawnCountMultiplier = Number(spawnCountSlider.value);
            spawnCountSliderValue.textContent = spawnCountSlider.value;
        });
    });
}
// Source - https://stackoverflow.com/a/37764963
// Posted by v-andrew, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-15, License - CC BY-SA 4.0
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
begin();
//# sourceMappingURL=main.js.map