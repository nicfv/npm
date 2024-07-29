# Numeric Comparisons

We can also use exray to run comparisons on numeric values. The following example shows a few equivalents to using the math tests (e.g. `gt`) as compared to the standard `true()` and `false()` tests. Using the math tests are preferred for 2 reasons.

1. More descriptive default exception message
1. Forces the developer to provide 2 explicit inputs into the test (`true()` and `false()` only require a single boolean input)