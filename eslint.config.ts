import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    // ignore node_modules and dist folders
    ignores: ['node_modules/**', 'dist/**'],

    // custom rules
    rules: {
      'no-console': 'warn',

      'no-var': 'error',
      'prefer-const': 'error',
      'no-undef': 'error',
      'no-unused-expressions': 'error',
    },
  },
  tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);
