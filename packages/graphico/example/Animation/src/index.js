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
    step(dt) {
        const dt_s = dt / 1000; // convert ms to s
        this.#vy += px_per_m * G * dt_s; // [px/m] * [m/s^2] * [s] = [px/s]
        this.#y += this.#vy * dt_s; // [px/s] * [s] = [px]
        // Check if the ball should bounce off the ground
        if (this.#y + this.#r >= this.#groundY) {
            this.#y = this.#groundY - this.#r;
            this.#vy *= -0.9; // some "energy" is lost
        }
        console.log(this.#x, this.#y, this.#vy);
    }
    draw(ctx) {
        if (ctx instanceof CanvasRenderingContext2D) {
            ctx.fillStyle = this.#color;
            ctx.beginPath();
            ctx.arc(this.#x, this.#y, this.#r, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

class Ground {
    #y;
    constructor(y = 0) {
        this.#y = y;
    }
    draw(ctx) {
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, this.#y);
        ctx.lineTo(1000, this.#y);
        ctx.stroke();
    }
}

const ball = new Ball('red', 10, 50, 200, 300);
const ground = new Ground(300);

const canvas = new Canvas({
    // debug: true,
    border: 'black',
    background: 'skyblue',
    loop(dt) {
        ball.step(dt);
        canvas.clear();
        return [ground, ball];
    },
});
