Generate color gradients for data visualization inspired by [MatPlotLib colormaps](https://bids.github.io/colormap/) and the [Viridis](https://cran.r-project.org/web/packages/viridis/index.html) package for R.

![NPM Version](https://img.shields.io/npm/v/viridis)
![NPM Downloads](https://img.shields.io/npm/dt/viridis)

## Installation

`viridis` can be installed from the official [npm package repository](https://www.npmjs.com/package/viridis). It is highly recommended to install the latest version, which is installed by default with the following command.

```shell
npm i viridis
```

## Getting Started

`viridis` exports 3 main classes: `Color`, `Gradient`, and `Palette`. You are able to define your own colors and gradients using the corresponding classes, or use [builtin palettes](#builtin-palettes) using the values contained in the `Palette` object. Let's get started with a simple example.

## Examples

All examples assume an HTML page containing a single element:

```html
<div id="box">Hello!</div>
```

### Example 1

Use a simple color definition to set the background and foreground of an HTML element.

```js
import { Color } from 'viridis';

// Set some styling parameters
// to a basic <div> element
const box = document.getElementById('box');
box.style.width = '100px';
box.style.height = '100px';

// Use the color class to
// dynamically define a color
// using R, G, and B values
const red = new Color(255, 0, 0);

// Use the color and
// `Color.getContrastringColor()`
// get the CSS color codes for
// the background and foreground.
// `.toString()` is not necessary
// here, but shown for example.
box.style.background = red.toString();
box.style.color = red.getContrastingColor().toString();
```

### Example 2

Define your own color gradient and display it on an HTML element.

```js
import { Color, Gradient } from 'viridis';

// Set some styling parameters
// to a basic <div> element
const box = document.getElementById('box');
box.style.width = '100px';
box.style.height = '100px';

// Define color stops
const red = Color.from('#ff0000'),
    blue = Color.from('#0000ff');

// Define the gradient
const gradient = new Gradient([red, blue]);

// Set the background of the HTML
// element at 45 degrees clockwise
// from the vertical (12 o'clock)
box.style.background = gradient.toString(45);
```

### Example 3

Use one of the [builtin palettes](#builtin-palettes).

```js
import { Palette } from 'viridis';

// Set some styling parameters
// to a basic <div> element
const box = document.getElementById('box');
box.style.width = '100px';
box.style.height = '100px';

// Set the element's background
// to one of the builtin palettes.
// `.toString()` is not necessary
// when using the default angle,
// but shown here for example.
box.style.background = Palette.Viridis.toString();
```

### Example 4

Linearly interpolate within a color gradient to obtain a single color along that gradient. In this example, we display a panel showing the current temperature with a solid background color somewhere along the `coldHot` gradient we defined. Cold temperatures should color the panel blue and hot temperatures should color it red.

```js
import { Color, Gradient } from 'viridis';

// Set some styling parameters
// to a basic <div> element
const box = document.getElementById('box');
box.style.width = '100px';
box.style.height = '100px';

// Define a temperature range
const temp_cold = 0,
    temp_hot = 100;

// Define the current temperature
// and display it in the element
const temp_current = 70;
box.innerHTML = temp_current + '&deg;F';

// Define color stops for a custom gradient
const cold = new Color(25, 195, 255),
    hot = new Color(255, 0, 0);

// Define a color gradient where the
// lowest value is the cold color,
// and the highest value is the hot color
const coldHot = new Gradient([cold, hot]);

// Linearly interpolate between color
// stops using the `.getColor()` function.
const interpolatedColor = coldHot.getColor(temp_current, temp_cold, temp_hot);

// Set the element's background and foreground colors.
box.style.background = interpolatedColor;
box.style.color = interpolatedColor.getContrastingColor();
```

## Builtin Palettes

<style>
    div.viridis-palette {
        width: calc(100% - 1rem);
        margin: 0.5rem;
        padding: 0.25rem;
        color: black;
        font: bold 0.8rem sans-serif;
    }
</style>

<div class="viridis-palette" style="background: linear-gradient(90deg, rgb(253, 231, 37), rgb(122, 209, 81), rgb(34, 168, 132), rgb(42, 120, 142), rgb(65, 68, 135), rgb(68, 1, 84));">Viridis</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(252, 255, 164), rgb(252, 165, 10), rgb(221, 81, 58), rgb(147, 38, 103), rgb(66, 10, 104), rgb(0, 0, 4));">Inferno</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(252, 253, 191), rgb(254, 159, 109), rgb(222, 73, 104), rgb(140, 41, 129), rgb(59, 15, 112), rgb(0, 0, 4));">Magma</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(240, 249, 33), rgb(252, 166, 54), rgb(225, 100, 98), rgb(177, 42, 144), rgb(106, 0, 168), rgb(13, 8, 135));">Plasma</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(247, 247, 247), rgb(37, 37, 37));">Grayscale</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(247, 254, 174), rgb(183, 230, 165), rgb(124, 203, 162), rgb(70, 174, 160), rgb(8, 144, 153), rgb(0, 113, 139), rgb(4, 82, 117));">Parula</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(211, 242, 163), rgb(151, 225, 150), rgb(108, 192, 139), rgb(76, 155, 130), rgb(33, 122, 121), rgb(16, 89, 101), rgb(7, 64, 80));">Emerald</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(228, 241, 225), rgb(180, 217, 204), rgb(137, 192, 182), rgb(99, 166, 160), rgb(68, 140, 138), rgb(40, 114, 116), rgb(13, 88, 95));">Mint</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(243, 231, 155), rgb(250, 196, 132), rgb(248, 160, 126), rgb(235, 127, 134), rgb(206, 102, 147), rgb(160, 89, 160), rgb(92, 83, 165));">Sunset</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(252, 222, 156), rgb(250, 164, 118), rgb(240, 116, 110), rgb(227, 79, 111), rgb(220, 57, 119), rgb(185, 37, 122), rgb(124, 29, 111));">Dusk</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(230, 249, 114), rgb(111, 218, 151), rgb(56, 172, 175), rgb(97, 120, 153), rgb(108, 71, 96), rgb(77, 37, 39));">Chroma</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(213, 62, 79), rgb(252, 141, 89), rgb(254, 224, 139), rgb(230, 245, 152), rgb(153, 213, 148), rgb(50, 136, 189));">Spectral</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(127, 246, 88), rgb(33, 228, 153), rgb(42, 159, 222), rgb(98, 82, 197));">Cool</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(198, 214, 60), rgb(255, 128, 63), rgb(245, 70, 142), rgb(146, 61, 179));">Warm</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(232, 242, 209), rgb(176, 199, 162), rgb(122, 171, 146), rgb(67, 127, 121), rgb(29, 81, 103));">Turquoise</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(232, 250, 255), rgb(176, 214, 249), rgb(112, 138, 220), rgb(90, 63, 170), rgb(66, 4, 87));">Purplish</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(241, 215, 92), rgb(207, 169, 73), rgb(169, 126, 57), rgb(129, 87, 42), rgb(86, 52, 27), rgb(44, 22, 10));">Dirt</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(243, 248, 110), rgb(169, 208, 102), rgb(108, 165, 94), rgb(61, 122, 82), rgb(27, 79, 62), rgb(7, 40, 36));">Lime</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(141, 249, 162), rgb(85, 200, 157), rgb(48, 157, 142), rgb(36, 112, 116), rgb(32, 70, 81), rgb(21, 33, 43));">Teal</div><div class="viridis-palette" style="background: linear-gradient(90deg, rgb(248, 247, 222), rgb(247, 234, 135), rgb(210, 157, 48), rgb(133, 77, 13), rgb(58, 32, 12));">Bee</div>

## Contribute

`viridis` is an open source software package hosted on a [GitHub repository](https://github.com/nicfv/npm) and is distributed under the [MIT License](https://raw.githubusercontent.com/nicfv/npm/main/LICENSE). Bug reports and feature requests can be submitted in [issues](https://github.com/nicfv/npm/issues). Contributions are also accepted by submitting a [pull request](https://github.com/nicfv/npm/pulls). Please follow the code styling if submitting a pull request. Thank you for your consideration!
