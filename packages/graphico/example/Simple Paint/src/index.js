import { Canvas } from 'graphico';

// Mouse button IDs (could possibly be different for your hardware)
const LCLICK = 0,
    MCLICK = 1,
    RCLICK = 2;

// The HSL color hue
let hue = 0;

// The paint brush radius
let radius = 3;


// Return the HSL color code
function hsl(h = 0, s = 100, l = 50) {
    return `hsl(${h},${s}%,${l}%)`;
}

// Extends `Drawable` by implementing the `draw` function.
class Circle {
    #color;
    #x;
    #y;
    constructor(color = '', x = 0, y = 0) {
        this.#color = color;
        this.#x = x;
        this.#y = y;
    }
    draw(ctx) {
        // Call HTML canvas context rendering 2D functions here using the `ctx` object
        ctx.fillStyle = this.#color;
        ctx.beginPath();
        ctx.arc(this.#x, this.#y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Cursor {
    #x;
    #y;
    constructor() {
        this.#x = 0;
        this.#y = 0;
    }
    updatePos(x = 0, y = 0) {
        this.#x = x;
        this.#y = y;
    }
    draw(ctx) {
        ctx.strokeStyle = hsl(hue);
        ctx.lineWidth = radius / 3;
        ctx.beginPath();
        ctx.arc(this.#x, this.#y, radius + 1, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

const myCursor = new Cursor();

const canvas = new Canvas({
    // Append the canvas onto the <div id="canvas"> element
    parent: document.getElementById('canvas'),
    // Set the background and border colors on focus/unfocus
    background: '#aabbcc',
    border: 'black',
    borderBlur: 'gray',
    showMouse: false,
    numLayers: 2,
    // The following 2 functions are event listeners for mouse/keyboard input (when the canvas is selected)
    mousemove(x, y) {
        // Change paint color depending on which mouse button was pressed
        // We could use the `mousedown(button)` event listener to record which
        // mouse button is down in a global `mouseButtonDown` variable, instead
        // of calling `isMouseButtonDown(button)` each time the mouse moves.
        if (canvas.isMouseButtonDown(LCLICK)) {
            canvas.draw(new Circle(hsl(hue), x, y)); // Draws on layer 0 automatically
        } else if (canvas.isMouseButtonDown(MCLICK)) {
            canvas.draw(new Circle(hsl(hue + 90), x, y));
        } else if (canvas.isMouseButtonDown(RCLICK)) {
            canvas.draw(new Circle(hsl(hue + 180), x, y));
        }
        canvas.clear(1);
        myCursor.updatePos(x, y);
        canvas.draw(myCursor, 1); // Draw on layer 1
    },
    keydown(key) {
        switch (key) {
            case ('arrowup'): {
                // Increase the brush size
                if (radius < 10) {
                    radius++;
                }
                break;
            }
            case ('arrowdown'): {
                // Decrease the brush size
                if (radius > 1) {
                    radius--;
                }
                break;
            }
            case ('arrowleft'): {
                // Change color by -45deg
                hue -= 45;
                break;
            }
            case ('arrowright'): {
                // Change color by 45deg
                hue += 45;
                break;
            }
            case ('p'): {
                // Take and save a screenshot
                canvas.screenshot();
                break;
            }
        }
        canvas.clear(1);
        canvas.draw(myCursor, 1); // Draw on layer 1
    }
});
