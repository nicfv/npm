## Getting Started

`graphico` is a package used for creating games, animations, and other visual projects. It simplifies canvas 2D rendering within the browser and provides the foundation for user interaction.

## Features

`graphico` boasts several features that make it an extremely versatile package for several project types.

- Simple, **object-oriented canvas API** for organized graphics programming
- Easy debugging and extensive configuration for **complete customizability**
- Supports multiple independent **canvas layers** with transparency
- **Hardware-accelerated graphics** for fast and smooth animation
- **User interaction** captured via keyboard inputs or mouse movements or clicks
- Multiple audio tracks supported by system **audio player** with volume, mute, and loop toggle
- Built-in logic for **screenshots** and **screen recordings** that capture both video and audio

## Caveats

By default, many browsers prevent autoplay, which arguably is a good thing. (Don't you hate it when you have several tabs open and one of them starts making noise?) This security feature blocks API calls to `Canvas.playAudio()` from being called automatically on page load. It needs to be triggered manually (initially) by some form of user interaction; either a key press or a mouse click. After this initial interaction step, calls to `playAudio()` can be performed automatically. If you wanted to have background music looping for a game, it would need to be triggered after pressing the "start" button, for example.

## Learn More

The best way to learn and experience its features is to try it out yourself. See the examples to learn how to use `graphico`!
