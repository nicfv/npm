import { Canvas } from 'graphico';

const px_per_m = 100; // Pixels per meter
const G = 9.81; // Gravitation constant [m/s^2]

class Ball {
    #color;
    #x; // [px]
    #r; // [px]
    #y; // [px]
    #vy; // [px/s]
    #groundY; // [px]
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
        ctx.fillRect(0, this.#y, 1000, 1000);
    }
}

const ball = new Ball('red', 10, 50, 200, 300);
const ground = new Ground(300);

const canvas = new Canvas({
    // debug: true,
    border: 'black',
    borderBlur: 'gray',
    background: 'skyblue',
    loop(dt) {
        ball.step(dt);
        canvas.clear();
        return [ground, ball];
    },
    keydown(key) {
        if (key === ' ') {
            ball.reset(200);
        }
    }
});
