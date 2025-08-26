Dimensional is the ultimate tool for any chemist's, physicist's, or engineer's toolbox. It augments JavaScript or TypeScript by allowing the programmer to assign units to their numerical quantities.

## Getting Started

`Dimensional` contains 3 main features:

1. [Dimensional analysis](#dimensions)
1. [Unit conversions](#units)
1. [Quantity mathematics](#quantities)

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

## Dimensions

Base dimensions refer to the fundamental, independent quality being measured. The physical base dimensions are as follows:

- Mass \\\({\textbf{M}}\\\)
- Length \\\({\textbf{L}}\\\)
- Time \\\({\textbf{T}}\\\)
- Temperature \\\({\boldsymbol{\Theta}}\\\)
- Electrical Current \\\({\textbf{I}}\\\)
- Luminous Intensity \\\({\textbf{J}}\\\)
- Amount Of Substance \\\({\textbf{N}}\\\)
- Dimensionless \\\(1\\\)

The base dimensions are the building blocks that can be combined to form other measurable qualities, like speed (velocity), from the example above. In physics, compounds of dimensions are referred to as **attributes** or **properties**. Here are a few attributes that come pre-packaged in `Dimensional` by default:

- Area \\\({\textbf{L}}^{2}\\\)
- Volume \\\({\textbf{L}}^{3}\\\)
- Velocity \\\(\frac{{\textbf{L}}}{{\textbf{T}}}\\\)
- Acceleration \\\(\frac{{\textbf{L}}}{{\textbf{T}}^{2}}\\\)
- Force \\\(\frac{{\textbf{M}} \cdot {\textbf{L}}}{{\textbf{T}}^{2}}\\\)
- ...and many others

## Units

A unit is a standard measurement of a base or derived dimension. The examples below are some examples of length units that come pre-packaged in `Dimensional` by default:

- meter \\\(\text{m}\\\)
- foot \\\(\text{ft}\\\)
- inch \\\(\text{in}\\\)
- yard \\\(\text{yd}\\\)
- mile \\\(\text{mi}\\\)

Each one of these units represents a particular "scaling" factor for a numerical quantity.

Units can also be combined in the same way as dimensions to form other measurements. For example, a common measurement of speed (velocity) in the United States is \\\(\frac{\text{mi}}{\text{hr}}\\\) or miles over hours.

Units can also be converted into other units of like dimensions.

## Prefixes

Units can be further adjusted using prefixes to increase or decrease their magnitude. Units can only have one prefix at a time. Here are a few examples that come pre-packaged in `Dimensional` by default:

- giga \\\(\text{G} = 10^{9}\\\)
- mega \\\(\text{M} = 10^{6}\\\)
- kilo \\\(\text{k} = 10^{3}\\\)
- hecto \\\(\text{h} = 100\\\)
- deca \\\(\text{da} = 10\\\)
- deci \\\(\text{d} = 0.1\\\)
- centi \\\(\text{c} = 0.01\\\)
- milli \\\(\text{m} = 10^{-3}\\\)
- micro \\\({\mu} = 10^{-6}\\\)
- nano \\\(\text{n} = 10^{-9}\\\)

And here are some default units that use some of these prefixes to scale the base unit:

- kilometer \\\({\text{k}\text{m}}\\\)
- centimeter \\\({\text{c}\text{m}}\\\)
- millimeter \\\({\text{m}\text{m}}\\\)
- kilogram \\\({\text{k}\text{g}}\\\)

Unit prefixes provide a convenient way to express very large or very small quantities where a unit of that scale/magnitude might not exist. For example, \\\(1 \left[ {\text{k}\text{m}} \right] = 1000 \left[ \text{m} \right]\\\)

All base units can have a prefix to change the magnitude, even if they are not in the SI system. For example, in the volume dimension, 1,000 gallons can be expressed as one \\\({\text{k}\text{gal}}\\\).

## Quantities

Lastly, a quantity is a property that can be measured and are described by both a numerical value and a unit.

$$24 \left[ \text{V} \right]$$

Quantities of any unit can be converted to another quantity of any other unit in that same dimension.

$$5.75 \left[ \text{ft} \right] = 175.2... \left[ {\text{c}\text{m}} \right]$$
$${\textbf{L}} = {\textbf{L}}$$

Quantities with the same dimensions can be added to or subtracted from and the dimensions will remain the same. Units will automatically be converted to the first argument's units.

$$5 \left[ \text{ft} \right] + 9 \left[ \text{in} \right] = 5.75 \left[ \text{ft} \right]$$
$${\textbf{L}} + {\textbf{L}} = {\textbf{L}}$$

Any two quantities can be multiplied or divided, and the corresponding units and dimensions will be multiplied or divided.

$$1 \left[ \text{mi} \right] \div 8 \left[ \text{min} \right] = 0.125 \left[ \frac{\text{mi}}{\text{min}} \right]$$
$${\textbf{L}} \div {\textbf{T}} = \frac{{\textbf{L}}}{{\textbf{T}}}$$

Quantities can also be scaled by a constant factor, which does not affect units or dimensions.

$$4 \left[ \text{oz} \right] \times 3 = 12 \left[ \text{oz} \right]$$
$${\textbf{M}} \times 1 = {\textbf{M}}$$

Quantities can be raised to a power, which effectively raises the units and dimensions by that power as well.

$$\left(2 \left[ {\text{c}\text{m}} \right]\right)^{2} = 4 \left[ {\text{c}\text{m}}^{2} \right]$$
$$({\textbf{L}})^{2} = {\textbf{L}}^{2}$$

## Extensibility

`Dimensional` comes pre-packaged with several standard dimensions, units, and prefixes, but it is completely customizable! This package allows you to define totally custom dimensions, units, and conversions, using all the same basic rules for physical dimensions!

Take a look at the examples to learn how to use and extend this package!

<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></script>
