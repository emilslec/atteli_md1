const canvas = document.getElementById("particleCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

type RGB = {
    r: number
    g: number
    b: number
}

class Particle {
    private x: number;
    private y: number;
    private speed: number;
    private angle: number;
    private radius: number;
    private color: RGB;
    private deathTime: number;
    private startTime: number;

    constructor( x: number,  y: number,  speed: number,  angle: number, radius: number,  color: RGB,  deathTime: number, startTime: number) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angle = angle;
        this.radius = radius;
        this.color = color;
        this.deathTime = deathTime;
        this.startTime = startTime;
    }

    public move() {
        let xdist = Math.cos(this.angle * Math.PI / 180) * this.speed;
        this.x += xdist;
        let ydist = -Math.sin(this.angle * Math.PI / 180) * this.speed;
        this.y += ydist;
        this.radius *= 0.995
    }

    public draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

        let alpha = (this.deathTime - time) / (this.deathTime - this.startTime);

        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`;
        ctx.fill();
    }

    public isDead(time: number) {
        return time > this.deathTime;
    }
}


let midx = canvas.width / 2;
let midy = canvas.height / 2;

// returns random particles
function generateParticles(time: number): Particle[] {
    let count = 5 + Math.random() * 5;

    let particles = []
    for (let i = 0; i < count; i++) {
        let speed = 1 + Math.random() * 5;
        let angle = Math.random() * 360;
        let rgb = {r: Math.random() * 360, g: Math.random() * 360, b: Math.random() * 360};
        let radius = 20 + Math.random() * 20;
        let deadTime = 100 + Math.random() * 100 + time;
        particles.push(new Particle(midx, midy, speed, angle, radius, rgb, deadTime, time));
    }
    return particles;
}

async function begin() {

    let time = 0;
    let particles: Particle[] = [];

    while(true) {

        if(time % 10 == 0) {
            particles = particles.concat(generateParticles(time));
        }

        // delete current content
        ctx.clearRect(0, 0, canvas.width, canvas.height)


        let toRemove: Number[] = [];
        let i = 0;
        // loop over all particles and draw / prepare remove
        for(const particle of particles) {
            if(particle.isDead(time)) {
                toRemove.push(i);
            } else {
                particle.draw(ctx, time);
                particle.move();
            }
            i++;
        }
        // remove all dead particles
        for(const ind in toRemove.reverse()) {
            particles.splice(Number(ind), 1);
        }

        await sleep(10);
        time += 1;

        console.log(particles.length);
        if(particles.length == 0) {break;}
    }
}


// Source - https://stackoverflow.com/a/37764963
// Posted by v-andrew, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-15, License - CC BY-SA 4.0

function sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

begin();
