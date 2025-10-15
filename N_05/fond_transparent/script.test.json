// N_09/fond_transparent/script.test.js

// JSDOM provides a 'document' object, but we need to create a canvas element for the script.
document.body.innerHTML = `
  <canvas id="particle-canvas"></canvas>
`;

// Now we can require the script, which expects the canvas to exist.
const { Particle } = require('./script.js');

describe('Particle Class', () => {

  // Test 1: Checks if a particle is created with valid initial properties.
  test('should initialize with correct properties', () => {
    const particle = new Particle();
    
    expect(particle.x).toBeGreaterThanOrEqual(0);
    expect(particle.y).toBeGreaterThanOrEqual(0);
    expect(particle.size).toBeGreaterThanOrEqual(0.5);
    expect(particle.size).toBeLessThanOrEqual(2.0);
    expect(particle.life).toBeGreaterThan(0);
  });

  // Test 2: Checks if the update logic correctly modifies particle state.
  test('should update its life and position when update() is called', () => {
    const particle = new Particle();
    const initialLife = particle.life;
    const initialX = particle.x;
    const initialY = particle.y;

    particle.update();

    expect(particle.life).toBe(initialLife - 1);
    expect(particle.x).not.toBe(initialX); // Position should change
    expect(particle.y).not.toBe(initialY);
  });
});