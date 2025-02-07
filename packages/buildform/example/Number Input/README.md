# Number Input

This example demonstrates how to install the package, import the `NumberInput` class, and configure it. All configuration options are optional - none are required. If unset, they will be set to their default values (typically empty for strings and numbers, or `false` for boolean options.)

In this example, we have created a new `NumberInput` to simulate an input asking for the user's age, and attached an input event listener to it. This will print out the selected age every time the user makes a change to the input. In the options, we are enforcing a minimum and maximum value, and only allowing integer values.

Finally, we use the `getElement()` function to appent our newly created/configured control onto our HTML page.