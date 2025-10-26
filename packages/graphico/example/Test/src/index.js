import { Canvas } from 'graphico';
import { Color } from 'viridis';

const canvas = new Canvas({
    border: new Color(0, 0, 0),
    width: 60,
    height: 40,
    scale: 10,
});
canvas.graphics.strokeStyle = '#f00000';
canvas.graphics.lineWidth = 5;
canvas.graphics.moveTo(10, 20);
canvas.graphics.lineTo(30, 50);
canvas.graphics.stroke();
