import { Canvas } from 'graphico';

const canvas = new Canvas({
    // debug: true,
    background: '#aabbcc',
    border: '#000000',
    width: 60,
    height: 40,
    scale: 10,
    keyboard(key) { console.log(key) },
});

class Obj {
    draw(ctx) {
        ctx.strokeStyle = '#f00000';
        ctx.lineWidth = 5;
        ctx.moveTo(10, 20);
        ctx.lineTo(30, 50);
        ctx.stroke();
    }
}

canvas.draw(new Obj());

// canvas.clear();