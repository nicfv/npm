## Getting Started

exray contains a simple, lightweight assertion testing framework for JavaScript and TypeScript projects. If any one of the exray tests fail, it will throw an exception and halt program execution. Exceptions can be caught using the standard `try ... catch` block.

exray exports one class, `X`, that includes several different test types, however all of them can be simply derived from `X.true(...)`. Custom exception messages are always optional, but recommended for clarity in case a test fails.
