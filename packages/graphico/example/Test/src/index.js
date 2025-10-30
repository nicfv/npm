import { Canvas } from 'graphico';

// Mouse button IDs (could possibly be different for your hardware)
const LCLICK = 0,
    MCLICK = 1,
    RCLICK = 2,
    NONE = -1;

// Current mouse button pressed
let mouseButtonDown = NONE;


// Extends `Drawable` by implementing the `draw` function.
class Circle {
    #color;
    #x;
    #y;
    #r;
    constructor(color = '', x = 0, y = 0, r = 0) {
        this.#color = color;
        this.#x = x;
        this.#y = y;
        this.#r = r;
    }
    draw(ctx) {
        // Call HTML canvas context rendering 2D functions here using the `ctx` object
        ctx.fillStyle = this.#color;
        ctx.beginPath();
        ctx.arc(this.#x, this.#y, this.#r, 0, 2 * Math.PI);
        ctx.fill();
    }
}

const canvas = new Canvas({
    background: '#aabbcc',
    border: 'black',
    borderBlur: 'gray',
    // The following 3 functions are event listeners
    mousedown(mouseButton) {
        mouseButtonDown = mouseButton;
    },
    mouseup() {
        mouseButtonDown = NONE;
    },
    mousemove(x, y) {
        const RADIUS = 3;
        // Change paint color depending on which mouse button was pressed
        if (mouseButtonDown === LCLICK) {
            canvas.draw(new Circle('blue', x, y, RADIUS));
        } else if (mouseButtonDown === MCLICK) {
            canvas.draw(new Circle('green', x, y, RADIUS));
        } else if (mouseButtonDown === RCLICK) {
            canvas.draw(new Circle('yellow', x, y, RADIUS));
        }
    },
});
