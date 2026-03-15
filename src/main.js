"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
// Resize canvas to full window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
// Particle array
const particles = [];
// Spawn a particle
function spawnParticle() {
    particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 5 + 2,
        color: "orange",
        lifetime: 100
    });
}
// Update particles
function updateParticles() {
    for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.lifetime -= 1;
    }
    // Remove dead particles
    for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].lifetime <= 0)
            particles.splice(i, 1);
    }
}
// Draw particles
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.lifetime / 100, 0); // fade out
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1; // reset alpha
}
// Animation loop
function animate() {
    spawnParticle();
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
}
animate();
//# sourceMappingURL=main.js.map