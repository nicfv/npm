import { Canvas } from 'graphico';

// Generate a button with a custom callback function on click
class Button {
    #x;
    #y;
    #rx;
    #ry;
    #h;
    #callback;
    #color;
    #hovercolor;
    #backcolor;
    #isHover;
    #isDown;
    constructor(x = 0, y = 0, size = 100, callback = () => { }, color = 'red', hovercolor = 'yellow', backcolor = 'gray') {
        this.#x = x;
        this.#y = y;
        this.#rx = size;
        this.#ry = size * 0.75;
        this.#h = size * 0.25;
        this.#callback = callback;
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
        if (this.#isHover && btn === 0 && !this.#isDown) {
            this.#isDown = true;
            this.#callback();
        }
    }
    mouseRelease(btn = 0) {
        // Release the button if the left mouse button is released
        if (this.#isDown && btn === 0) {
            this.#isDown = false;
        }
    }
    draw(ctx) {
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

// Display "sound on/off" depending on whether the canvas is muted or not
class SoundStatus {
    #x;
    #y;
    #font;
    constructor(x = 0, y = 0, font = '20px sans-serif') {
        this.#x = x;
        this.#y = y;
        this.#font = font;
    }
    draw(ctx) {
        ctx.font = this.#font;
        // Determine if the canvas is currently muted
        if (canv.isMuted()) {
            ctx.fillStyle = 'red';
            ctx.fillText('Sound off', this.#x, this.#y);
        } else {
            ctx.fillStyle = 'black';
            ctx.fillText('Sound on', this.#x, this.#y);
        }
    }
}


const canv = new Canvas({
    border: 'black',
    borderBlur: 'gray',
    mousemove(x, y) {
        btnPlay.mouseMove(x, y);
        btnStop.mouseMove(x, y);
    },
    mousedown(button) {
        btnPlay.mouseClick(button);
        btnStop.mouseClick(button);
    },
    mouseup(button) {
        btnPlay.mouseRelease(button);
        btnStop.mouseRelease(button);
    },
    keydown(key) {
        if (key === 'm') {
            if (canv.isMuted()) {
                canv.unmute();
            } else {
                canv.mute();
            }
        }
    },
    loop(dt) {
        canv.clear();
        canv.draw(btnPlay);
        canv.draw(btnStop);
        canv.draw(soundStatus);
    },
});

// Set the button callback functions to the `playAudio()` and `stopAudio()` API calls
const btnPlay = new Button(canv.width * 1 / 3, canv.height / 2, 80, () => canv.playAudio('https://cs1.mp3.pm/download/88834782/eGpsZHUyd3pJempjbWozeUJhSUxnRzBUUXp5TGVkcnl4aExUcmhDVzR5Y3d2MUZrUnBpamM0bWNieW5yQ1BxYndTSEkwTUpuUitFUFVCQy9XUG5PNWRYL2s2bFFGSFJyclNpODhEMnVRZ0pVUjJiL0FDUXhNajJJc3JJcXJRTFU/Ricky_Astley_-_Never_Gonna_Give_You_Up_(mp3.pm).mp3'), 'green');
const btnStop = new Button(canv.width * 2 / 3, canv.height / 2, 80, () => canv.stopAudio(), 'red');
const soundStatus = new SoundStatus(10, 30);
