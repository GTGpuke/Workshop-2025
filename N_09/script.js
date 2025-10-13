// --- PART 1: HIDE LOADER ON PAGE LOAD ---

window.addEventListener('load', function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    const mainContent = document.getElementById('main-content');
    
    setTimeout(() => {
        loaderWrapper.classList.add('hidden');
        mainContent.style.display = 'block';
    }, 200);
});


// --- PART 2: ANIMATED PARTICLES LOGIC ---

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 80; // A few more particles for a denser sparkle effect

// --- MODIFIED: Tighter spawn area around the fox ---
const spawnZoneWidth = 250;
const spawnZoneHeight = 250;

class Particle {
    constructor() {
        this.reset();
    }
    
    // --- NEW: Reset method to initialize and respawn particles ---
    reset() {
        const spawnX = (canvas.width / 2) - (spawnZoneWidth / 2);
        const spawnY = (canvas.height / 2) - (spawnZoneHeight / 2);
        this.x = spawnX + Math.random() * spawnZoneWidth;
        this.y = spawnY + Math.random() * spawnZoneHeight;
        
        // --- MODIFIED: Smaller size for a sparkle effect ---
        this.size = Math.random() * 1.5 + 0.5; // Size between 0.5px and 2px
        
        // --- MODIFIED: Slower, more subtle movement ---
        this.speedY = Math.random() * 0.5 - 0.25;
        this.speedX = Math.random() * 0.5 - 0.25;

        // --- NEW: Lifespan for fading effect ---
        this.life = Math.random() * 60 + 30; // Lifespan of 30-90 frames
        this.initialLife = this.life;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--; // Decrease life every frame

        // Reset particle when its life runs out
        if (this.life <= 0) {
            this.reset();
        }
    }
    
    draw() {
        // --- NEW: Calculate opacity based on remaining life to create a fade-out effect ---
        const opacity = Math.max(0, (this.life / this.initialLife) * 0.8); // Max opacity of 0.8
        
        ctx.fillStyle = `rgba(0, 191, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();