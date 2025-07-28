# THIS PACKAGE IS UNDER DEVELOPMENT AND SHOULD NOT BE USED IN PRODUCTION AT THIS TIME

## Getting Started

This package is currently under development and is not yet stable.

It will contain 3 main features:

1. Dimensional analysis
1. Quantity mathematics
1. Unit conversions

## Data Structure

How is the data structured? Remember the acronym "**QUAD**"! Math is performed primarily using *quantities*, which is the outermost structure. Let's say you have a quantity of \\\(5 [kN]\\\), for instance.

- **Q**uantity (5) [What is the value of measurement?]
    - **U**nit (kN) [What is the unit of measurement?]
        - **A**ttribute (force) [What is being measured?]
            - **D**imension (\\\(\frac{\textbf{ML}}{\textbf{T}^{2}}\\\)) [What are the base dimensions?]