In this example we create two `Drawable` classes: a button and a sound status (to show whether the canvas sound is on/off.) When the cursor moves over a button, it changes color; and when the mouse is down (clicked), the button appears like it was pressed and calls a callback function.

In this example, the green button plays a sound using the `playAudio()` API function. This function accepts some parameters to adjust the audio volume and whether or not the audio should be played on a loop. The red button stops all sound using the `stopAudio()` API function. Pressing the green button will start the sound from the beginning.

When the user presses the `M` key, it toggles the sound on/off using the `mute()` and `unmute()` API functions. Try pressing `M` slowly twice when the sound is playing. Any audio files that are currently playing will be muted when the sound is toggled off, and then unmuted when the sound is toggled back on. It does not pause any currently playing audio files.
