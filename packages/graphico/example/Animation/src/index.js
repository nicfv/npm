import { Canvas } from 'graphico';

const px_per_m = 100; // Pixels per meter
const G = 9.81; // Gravitation constant [m/s^2]

class Ball {
    #color;
    #x;
    #r;
    #y;
    #vy;
    #groundY;
    constructor(color = '', radius = 0, x = 0, dropHeight = 0, groundY = 0) {
        this.#color = color;
        this.#x = x;
        this.#r = radius;
        this.#y = groundY - dropHeight;
        this.#vy = 0;
        this.#groundY = groundY;
    }
    reset(dropHeight = 0) {
        this.#y = this.#groundY - dropHeight;
        this.#vy = 0;
    }
    step(dt) {
        const dt_s = dt / 1000; // convert ms to s
        this.#vy += px_per_m * G * dt_s; // [px/m] * [m/s^2] * [s] = [px/s]
        this.#y += this.#vy * dt_s; // [px/s] * [s] = [px]
        // Check if the ball should bounce off the ground
        if (this.#y + this.#r >= this.#groundY) {
            this.#y = this.#groundY - this.#r; // make sure ball doesn't go through the ground
            this.#vy *= -0.9; // some "energy" is lost
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.#color;
        ctx.beginPath();
        ctx.arc(this.#x, this.#y, this.#r, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Ground {
    #y;
    constructor(y = 0) {
        this.#y = y;
    }
    draw(ctx) {
        ctx.fillStyle = 'sandybrown';
        ctx.fillRect(0, this.#y, canvas.width, canvas.height);
    }
}

// Create the animation objects
const ball = new Ball('red', 10, 100, 100, 150);
const ground = new Ground(150);

// Create the canvas
const canvas = new Canvas({
    border: 'black',
    borderBlur: 'gray',
    background: 'skyblue',
    width: 200,
    height: 200,
    loop(dt) {
        ball.step(dt); // Compute the motion for the ball
        canvas.clear(); // Clear the canvas before rendering any objects
        canvas.draw(ground); // Draw the ground (calls the ground.draw() function)
        canvas.draw(ball); // Draw the ball
    },
    keydown(key) {
        // Press space to drop the ball
        if (key === ' ') {
            ball.reset(100);
        }
    },
});
