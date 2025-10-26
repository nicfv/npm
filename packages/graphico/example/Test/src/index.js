import { Canvas } from 'graphico';
import { Color } from 'viridis';

const canvas = new Canvas({
    background: new Color(99, 111, 222),
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

const img = new Image(); // Create new img element
img.src = "data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==";
canvas.graphics.drawImage(img, 0, 0);

// canvas.clear();