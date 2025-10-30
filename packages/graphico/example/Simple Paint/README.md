In this example, we create a very simple canvas in which we can paint with 3 different colors, depending on which mouse button is pressed. Our "paint" is a series of circles that are rendered whenever the mouse button is down and when the mouse is moved. The canvas must also be in focus.

- Left mouse button = Blue
- Scroll button = Green
- Right mouse button = Yellow

We also use some basic customization properties for the canvas such as `background`, `border`, and `borderBlur` to customize the canvas appearance, and all of the drawing logic is inside our callback functions.

Anything we need to draw on the canvas must be a class that extends `Drawable` meaning that it must implement the `draw(context)` function. We define a `draw` function within our `Circle` class which satisfies this requirement.