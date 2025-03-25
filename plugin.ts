import type { ClassicConfig, FlatConfig, Linter } from '@typescript-eslint/utils/ts-eslint';
import rule from './rules/eslint-plugin-no-implicit-undefined';
import {name,version} from './package.json';

const plugin = {
  meta: { name, version },
  rules: {
    'no-implicit-undefined': rule,
  } satisfies Linter.PluginRules,
  configs: {
    // configs are assigned later
    'legacy-recommended': {} satisfies ClassicConfig.Config,
    recommended: {} satisfies FlatConfig.Config,
  },
} satisfies Linter.Plugin;

Object.assign(plugin.configs, {
  'legacy-recommended': {
    plugins: ['no-implicit-undefined'],
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
