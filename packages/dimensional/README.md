Dimensional is the ultimate tool for any chemist's, physicist's, or engineer's toolbox. It augments JavaScript or TypeScript by allowing the programmer to assign units to their numerical quantities.

## Getting Started

`Dimensional` contains 3 main features:

1. Dimensional analysis
1. Quantity mathematics
1. Unit conversions

## Data Structure

Physical **quantities** contain a numerical value, which is "scaled" by a **unit**. The unit in turn measures a **dimension** or compound of dimensions. The structure of data is outlined below. A quantity contains both a numerical value, and a unit. The unit then contains its respective [base dimensions](#base-dimensions).

- Quantity
    - Numerical value
    - Unit(s)
        - Dimension(s)

For example, the speedometer on your vehicle is a readout of a physical *quantity*. In this case, the *dimension* of this quantity is **speed**, which expressed in base dimensions, is distance over time. If you live in the United States, the *unit* measured is typically **miles per hour** and elsewhere in the world, the unit is likely **kilometers per hour**. Let's say you live in the United States, and your speedometer readout is 65 miles per hour.

- Quantity = \\\(65 \left[ \frac{\text{mi}}{\text{hr}} \right]\\\)
    - Numerical value = \\\(65\\\)
    - Unit(s) = \\\(\frac{\text{mi}}{\text{hr}}\\\)
        - Dimension(s) = \\\(\frac{{\textbf{L}}}{{\textbf{T}}}\\\)

## Base Dimensions

Base dimensions refer to the quality being measured. The physical base dimensions are as follows:

- Mass \\\({\textbf{M}}\\\)
- Length \\\({\textbf{L}}\\\)
- Time \\\({\textbf{T}}\\\)
- Temperature \\\({\boldsymbol{\Theta}}\\\)
- Electrical Current \\\({\textbf{I}}\\\)
- Luminous Intensity \\\({\textbf{J}}\\\)
- Amount Of Substance \\\({\textbf{N}}\\\)
- Dimensionless \\\(1\\\)

The base dimensions above can be combined to form other measurable qualities, like speed, from the example above. In physics, compounds of dimensions are referred to as **attributes** or **properties**. Here are a few attributes that come pre-packaged in `Dimensional` by default:

- Area \\\({\textbf{L}}^{2}\\\)
- Volume \\\({\textbf{L}}^{3}\\\)
- Velocity \\\(\frac{{\textbf{L}}}{{\textbf{T}}}\\\)
- Acceleration \\\(\frac{{\textbf{L}}}{{\textbf{T}}^{2}}\\\)
- Force \\\(\frac{{\textbf{M}} \cdot {\textbf{L}}}{{\textbf{T}}^{2}}\\\)
- ...and many others

## Units

<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></script>
