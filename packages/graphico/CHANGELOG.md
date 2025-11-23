# Changelog

## 1.0.0

- All layers are drawn onto a single canvas element
- Support simple screen recording (no audio)
- Updates to paint example
- Add main README file

## 0.0.5

- Remove `get/setPixel()` functions
    - Remove hardware/software acceleration type (only used for pixel manipulation)
- Remove shorthand in `loop()` function from returning an array of `Drawable`, to make behavior consistent for single and multi-layered canvases
- Minor updates to animation example
- Add instructions to both examples

## 0.0.4

- Support canvas layers
    - Defaults:
        - One layer (zero-indexed, so layer ID is `0`)
        - Drawables are drawn onto layer `0` (including returned from `loop()` callback)
        - `Canvas.clear()` clears *all* layers unless a layer is specified
        - Get/set pixel functions default to layer `0`
- Accept hardware/software acceleration toggle configuration parameter
- `Canvas.screenshot()` function now accepts a name for the screenshot (optionally)
- Update simple paint example so that it accepts user keyboard input to change brush size and color

## 0.0.3

- Add animation example
- Expose `Canvas.width` and `Canvas.height`
- Change `setInterval` to `requestAnimationFrame`
- Create and expose several new functions in the `Canvas` class:
    - `getMousePosition`
    - `getPixel`
    - `setPixel`
    - `screenshot`
- Main animation `loop()` function can return an array of `Drawable` to automatically render

## 0.0.2

- Add first iteration of `Canvas` class
    - Support several callback functions (`keydown`/`up`, `mousedown`/`up`, `mousemove`)
- Create a basic painting example

## 0.0.1

- Add details in `package.json`

## 0.0.0

- Initialize empty package on npm