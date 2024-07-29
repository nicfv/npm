# Builtin Palettes

This example demonstrates how to interpolate a color within one of the builtin color palettes to render a temperature display panel. Builtin palettes can be accessed with `Palette.Name` or `Palette["Name"]`. To know how to interpolate a palette, look at the list of builtin color palettes. The leftmost color of the gradient is the "zero" or minimum bound of the interpolated range, and the rightmost color of the gradient is the "one" or maximum bound of the interpolated range.

For "Spectral", the color on the left is red, meaning that red is the minimum bound of the range. We want to map that to the "hot" temperature.