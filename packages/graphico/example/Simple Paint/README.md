In this example, we create a simple canvas in which we can paint in different colors, depending on what color is currently selected which mouse button is pressed. Our "paint" is a series of circles that are rendered whenever the mouse button is down and when the mouse is moved. The canvas must also be in focus.

We use callback functions to accept user mouse input and keyboard input, and have set up the following controls:

- Left arrow = Change color hue by -45 degrees
- Right arrow = Change color hue by 45 degrees
- Up arrow = Increase brush stroke by 1px
- Down arrow = Decrease brush stroke by 1px
- P = Take a screenshot of the canvas

We also can determine which mouse button was pressed and draw different colors depending on which button was pressed:

- Left mouse button = Selected color
- Scroll button = Selected color + 90 degrees
- Right mouse button = Selected color + 180 degrees (complimentary color)

We also use some basic customization properties for the canvas such as `background`, `border`, and `borderBlur` to customize the canvas appearance, and all of the drawing logic is inside our callback functions.

Our canvas has 2 layers. Layer 0 contains the drawing canvas, and layer 1 is for our cursor. We only want to clear layer 1 each frame so we can render the new cursor position, size, and color. We want layer 0 to remain static.

Anything we need to draw on the canvas must be a class that extends `Drawable` meaning that it must implement the `draw(context)` function. We define `draw` functions within both our `Circle` and `Cursor` classes to satisfy this requirement.