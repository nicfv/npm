import { Canvas } from 'graphico';

let mx, my, md, mb;

class point {
    draw(ctx) {
        if (md) {
            if (mb === 0) {
                ctx.fillStyle = 'yellow';
            } else {
                ctx.fillStyle = 'green';
            }
            ctx.fillRect(mx, my, 2, 2);
        }
    }
}

const canvas = new Canvas({
    // debug: true,
    background: '#aabbcc',
    border: '#000000',
    borderBlur: 'gray',
    width: 600,
    height: 400,
    scale: 2,
    mousedown(x, y, b) { md = true; mb = b; },
    mouseup() { md = false },
    mousemove(x, y) { mx = x; my = y; },
    loop() {
        canvas.draw(new point());
    }
});


// canvas.clear();