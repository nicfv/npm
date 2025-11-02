In this example, we learn how to animate a bouncing ball on the canvas. We need to use the canvas `loop(dt)` callback function which can compute the new state and render each frame.

Our `Ball` and `Ground` classes both implement `Drawable` by implementing the `draw(ctx)` function which is used to render the objects onto the canvas.

For our `Ball` class, we also want to create a custom `step(dt)` function to compute the motion of the ball at each interval. Note that `dt` is in milliseconds, so if we want to convert that into seconds, we need to divide by 1,000.

$$\text{s} = \frac{\text{ms}}{1000}$$

We have also provided a `keydown(key)` event listener, that when `space` is pressed, the ball is dropped again, resetting the animation.