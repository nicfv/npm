import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(eslint.configs.recommended, tseslint.configs.strict, /*tseslint.configs.stylistic,*/ {
    rules: {
        '@typescript-eslint/unified-signatures': ['error', { 'ignoreDifferentlyNamedParameters': true }], // (1)
    },
});

/**
 * (1) Required because preventing constructor overloads actually changes TS compiler behavior.
 * For example, the overloads in the `class`:
 * constructor(str: string, num: number);
 * constructor(num: number, str: string);
 * Translate to the signature:
 * constructor(a: string | number, b: number | string);
 * That means, technically this call is allowed, even though it's not an overload:
 * new class('str', 'str')
 */