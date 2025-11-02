import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    { // https://github.com/eslint/eslint/issues/20272
        rules: {
            '@typescript-eslint/unified-signatures': 'off',
        },
    },
);
