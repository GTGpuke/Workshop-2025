// N_05/fond_transparent/script.test.js

// Step 1: Set up the fake canvas element in our fake document
document.body.innerHTML = `<canvas id="particle-canvas"></canvas>`;

// Step 2: Create a "mock" (a fake version) of the canvas drawing tools.
// These are empty functions that prevent our script from crashing.
const mockContext = {
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
};

// Step 3: Tell Jest that any time getContext('2d') is called on ANY canvas,
// it should return our harmless mock tools instead of throwing an error.
// We must do this BEFORE importing the script.
HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext);

// Step 4: Now that the mock is in place, we can safely import the script.
// The global code in script.js will run without errors.
const { Particle } = require('./script.js');

// Step 5: Run the original tests, which will now work correctly.
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
    expect(particle.x).not.toBe(initialX);
    expect(particle.y).not.toBe(initialY);
  });
});