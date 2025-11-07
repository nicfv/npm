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

class Cursor {
    #color;
    #x;
    #y;
    #r;
    constructor(color = '', r = 0) {
        this.#color = color;
        this.#x = 0;
        this.#y = 0;
        this.#r = r;
    }
    updatePos(x = 0, y = 0) {
        this.#x = x;
        this.#y = y;
    }
    draw(ctx) {
        ctx.strokeStyle = this.#color;
        ctx.lineWidth = this.#r / 3;
        ctx.beginPath();
        ctx.arc(this.#x, this.#y, this.#r, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

const myCursor = new Cursor('red', 4);

const canvas = new Canvas({
    // Set the background and border colors on focus/unfocus
    background: '#aabbcc',
    border: 'black',
    borderBlur: 'gray',
    showMouse: false,
    numLayers: 2,
    // The following 3 functions are event listeners for mouse input (when the canvas is selected)
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
            canvas.draw(new Circle('blue', x, y, RADIUS), 0); // Draw on layer 0
        } else if (mouseButtonDown === MCLICK) {
            canvas.draw(new Circle('green', x, y, RADIUS), 0);
        } else if (mouseButtonDown === RCLICK) {
            canvas.draw(new Circle('yellow', x, y, RADIUS), 0);
        }
        canvas.clear(1);
        myCursor.updatePos(x, y);
        canvas.draw(myCursor, 1); // Draw on layer 1
    },
});
