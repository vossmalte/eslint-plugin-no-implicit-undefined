import type { ClassicConfig, FlatConfig, Linter } from '@typescript-eslint/utils/ts-eslint';
import rule from './rules/eslint-plugin-no-implicit-undefined';

const plugin = {
  meta: { name: 'eslint-plugin-no-implicit-undefined', version: '0.1.0' },
  rules: {
    'no-implicit-undefined': rule,
  },
  configs: {
    // configs are assigned later
    'legacy-recommended': {} satisfies ClassicConfig.Config,
    recommended: {} satisfies FlatConfig.Config,
  },
} satisfies Linter.Plugin;

Object.assign(plugin.configs, {
  'legacy-recommended': {
    plugins: ['implicit-undefined'],
    rules: {
      'no-implicit-undefined/no-implicit-undefined': 'error',
    },
  } satisfies ClassicConfig.Config,
  recommended: {
    plugins: { 'no-implicit-undefined': plugin },
    rules: {
      'no-implicit-undefined/no-implicit-undefined': 'error',
    },
  } satisfies FlatConfig.Config,
});

export default plugin;
