import { Canvas } from 'graphico';

class Button {
    #x;
    #y;
    #rx;
    #ry;
    #h;
    #color;
    #hovercolor;
    #backcolor;
    #isHover;
    #isDown;
    constructor(x = 0, y = 0, size = 100, color = 'red', hovercolor = 'yellow', backcolor = 'gray') {
        this.#x = x;
        this.#y = y;
        this.#rx = size;
        this.#ry = size * 0.75;
        this.#h = size * 0.25;
        this.#color = color;
        this.#hovercolor = hovercolor;
        this.#backcolor = backcolor;
        this.#isHover = false;
        this.#isDown = false;
    }
    mouseMove(x = 0, y = 0) {
        // Determine if the location of the cursor lies within the button
        this.#isHover = ((((x - this.#x) / this.#rx) ** 2 + ((y - this.#y) / this.#ry) ** 2) < 1);
    }
    mouseClick(btn = 0) {
        // Make sure that the cursor is over the button and the left mouse button was pressed
        this.#isDown = (this.#isHover && btn === 0);
    }
    mouseRelease(btn = 0) {
        if (this.#isDown && btn === 0) {
            this.#isDown = false;
        }
    }
    draw(ctx) {
        if (!(ctx instanceof CanvasRenderingContext2D)) { return; }
        // Draw the background
        ctx.fillStyle = this.#backcolor;
        ctx.beginPath();
        ctx.ellipse(this.#x, this.#y + this.#h, this.#rx, this.#ry, 0, 0, 2 * Math.PI);
        ctx.fill();
        // Draw the main button
        ctx.fillStyle = this.#isHover ? this.#hovercolor : this.#color;
        ctx.beginPath();
        ctx.ellipse(this.#x, this.#y + (this.#isDown ? this.#h : 0), this.#rx, this.#ry, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
}


const canv = new Canvas({
    border: 'black',
    borderBlur: 'gray',
    mousemove(x, y) {
        btn.mouseMove(x, y);
    },
    mousedown(button) {
        btn.mouseClick(button);
    },
    mouseup(button) {
        btn.mouseRelease(button);
    },
    loop(dt) {
        canv.clear();
        canv.draw(btn);
    },
});

const btn = new Button(canv.width / 2, canv.height / 2);
