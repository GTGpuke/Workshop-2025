// PART 1: HIDE LOADER ON PAGE LOAD

window.addEventListener('load', function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    
    // Step 1: Add the 'hidden' class to trigger the fade-out animation
    loaderWrapper.classList.add('hidden');

    // Step 2: After the transition finishes (500ms), set display to 'none'
    setTimeout(() => {
        loaderWrapper.style.display = 'none';
    }, 500); // This time must match the CSS transition time
});


// PART 2: ANIMATED PARTICLES LOGIC

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numberOfParticles = 80;
const spawnZoneWidth = 250;
const spawnZoneHeight = 250;

class Particle {
    constructor() { 
        this.reset(); 
    }
    
    reset() {
        const spawnX = (canvas.width / 2) - (spawnZoneWidth / 2);
        const spawnY = (canvas.height / 2) - (spawnZoneHeight / 2);
        this.x = spawnX + Math.random() * spawnZoneWidth;
        this.y = spawnY + Math.random() * spawnZoneHeight;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.life = Math.random() * 60 + 30;
        this.initialLife = this.life;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        if (this.life <= 0) { 
            this.reset(); 
        }
    }
    
    draw() {
        const opacity = Math.max(0, (this.life / this.initialLife) * 0.8);
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

// Add this line at the end of N_09/fond_transparent/script.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Particle };
}