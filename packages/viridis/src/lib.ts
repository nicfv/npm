import * as SMath from 'smath';
import { HSL, RGB } from './types';

export function rgb2hsl(rgb: RGB): HSL {
    const r: number = SMath.clamp(SMath.normalize(rgb.red, 0, 255), 0, 1);
    const g: number = SMath.clamp(SMath.normalize(rgb.green, 0, 255), 0, 1);
    const b: number = SMath.clamp(SMath.normalize(rgb.blue, 0, 255), 0, 1);
    const M: number = Math.max(r, g, b);
    const m: number = Math.min(r, g, b);
    const C: number = M - m;
    let H = 0;
    if (C !== 0) {
        if (M === r) {
            H = ((g - b) / C) % 6;
        } else if (M === g) {
            H = (b - r) / C + 2;
        } else if (M === b) {
            H = (r - g) / C + 4;
        }
    }
    const L: number = (M + m) / 2;
    let S = 0;
    if (L > 0 && L < 1) {
        S = C / (1 - Math.abs(2 * L - 1));
    }
    return { hue: H * 60, saturation: S * 100, lightness: L * 100 };
}

export function hsl2rgb(hsl: HSL): RGB {
    const H: number = hsl.hue % 360;
    const S: number = SMath.clamp(SMath.normalize(hsl.saturation, 0, 100), 0, 1);
    const L: number = SMath.clamp(SMath.normalize(hsl.lightness, 0, 100), 0, 1);
    const C: number = (1 - Math.abs(2 * L - 1)) * S;
    const X: number = C * (1 - Math.abs(((H / 60) % 2) - 1));
    const m: number = L - C / 2;
    let r = 0;
    let g = 0;
    let b = 0;
    if (H < 60) {
        r = C;
        g = X;
    } else if (H < 120) {
        r = X;
        g = C;
    } else if (H < 180) {
        g = C;
        b = X;
    } else if (H < 240) {
        g = X;
        b = C;
    } else if (H < 300) {
        b = C;
        r = X;
    } else {
        b = X;
        r = C;
    }
    return { red: (r + m) * 255, green: (g + m) * 255, blue: (b + m) * 255 };
}