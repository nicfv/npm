## Builtin Palettes

This list is best viewed on the [official documentation](https://npm.nicfv.com/modules/viridis.html), and contains all the builtin color palettes obtained by `Palette.Name` or `Palette['Name']`.

<style>
    div.viridis-palette {
        width: calc(100% - 1rem);
        margin: 0.5rem;
        padding: 0.25rem;
        color: black;
        font: bold 0.8rem sans-serif;
    }
</style>

<div class="viridis-palette" style="background:linear-gradient(90deg,#FDE725,#7AD151,#22A884,#2A788E,#414487,#440154)">Viridis</div><div class="viridis-palette" style="background:linear-gradient(90deg,#FCFFA4,#FCA50A,#DD513A,#932667,#420A68,#000004)">Inferno</div><div class="viridis-palette" style="background:linear-gradient(90deg,#FCFDBF,#FE9F6D,#DE4968,#8C2981,#3B0F70,#000004)">Magma</div><div class="viridis-palette" style="background:linear-gradient(90deg,#F0F921,#FCA636,#E16462,#B12A90,#6A00A8,#0D0887)">Plasma</div><div class="viridis-palette" style="background:linear-gradient(90deg,#F7F7F7,#252525)">Grayscale</div><div class="viridis-palette" style="background:linear-gradient(90deg,#F7FEAE,#B7E6A5,#7CCBA2,#46AEA0,#089099,#00718B,#045275)">Parula</div><div class="viridis-palette" style="background:linear-gradient(90deg,#D3F2A3,#97E196,#6CC08B,#4C9B82,#217A79,#105965,#074050)">Emerald</div><div class="viridis-palette" style="background:linear-gradient(90deg,#E4F1E1,#B4D9CC,#89C0B6,#63A6A0,#448C8A,#287274,#0D585F)">Mint</div><div class="viridis-palette" style="background:linear-gradient(90deg,#F3E79B,#FAC484,#F8A07E,#EB7F86,#CE6693,#A059A0,#5C53A5)">Sunset</div><div class="viridis-palette" style="background:linear-gradient(90deg,#FCDE9C,#FAA476,#F0746E,#E34F6F,#DC3977,#B9257A,#7C1D6F)">Dusk</div><div class="viridis-palette" style="background:linear-gradient(90deg,#E6F972,#6FDA97,#38ACAF,#617899,#6C4760,#4D2527)">Chroma</div><div class="viridis-palette" style="background:linear-gradient(90deg,#D53E4F,#FC8D59,#FEE08B,#E6F598,#99D594,#3288BD)">Spectral</div><div class="viridis-palette" style="background:linear-gradient(90deg,#7FF658,#21E499,#2A9FDE,#6252C5)">Cool</div><div class="viridis-palette" style="background:linear-gradient(90deg,#C6D63C,#FF803F,#F5468E,#923DB3)">Warm</div><div class="viridis-palette" style="background:linear-gradient(90deg,#E8F2D1,#B0C7A2,#7AAB92,#437F79,#1D5167)">Turquoise</div><div class="viridis-palette" style="background:linear-gradient(90deg,#E8FAFF,#B0D6F9,#708ADC,#5A3FAA,#420457)">Purplish</div><div class="viridis-palette" style="background:linear-gradient(90deg,#F1D75C,#CFA949,#A97E39,#81572A,#56341B,#2C160A)">Dirt</div><div class="viridis-palette" style="background:linear-gradient(90deg,#F3F86E,#A9D066,#6CA55E,#3D7A52,#1B4F3E,#072824)">Lime</div><div class="viridis-palette" style="background:linear-gradient(90deg,#8DF9A2,#55C89D,#309D8E,#247074,#204651,#15212B)">Teal</div><div class="viridis-palette" style="background:linear-gradient(90deg,#F8F7DE,#F7EA87,#D29D30,#854D0D,#3A200C)">Bee</div>

## Getting Started

`viridis` generates color gradients for data visualization, inspired by [MatPlotLib colormaps](https://bids.github.io/colormap/) and the [Viridis](https://cran.r-project.org/web/packages/viridis/index.html) package for R. It exports 3 main classes: `Color`, `Gradient`, and `Palette`. You are able to define your own colors and gradients using the corresponding classes, or use [builtin palettes](#builtin-palettes) using the values contained in the `Palette` object. Let's get started with a simple example.
