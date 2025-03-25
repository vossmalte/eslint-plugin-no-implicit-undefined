import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import noImplicitUndefined from './plugin';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPlugin.configs['flat/recommended'],
  noImplicitUndefined.configs.recommended,
  { ignores: ['node_modules/', 'dist/'] },
);

defineConfig([
  {
    files: ['**/*.{ts}'],
    ignores: ['node_modules/', 'dist/', 'index.js'],
  },
]);
