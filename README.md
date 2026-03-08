# ESLint Plugin: eslint-plugin-no-implicit-undefined

Disallow the use of optional operator (`?`) as an explicit type in TypeScript and instead use `undefined` instead.

## 📚 Rule Examples

This rule disallows the use of optional operator (`?`)as an explicit type in TypeScript. Instead, developers should use `undefined`.

Examples of **incorrect** code for this rule ❌

```ts
interface Example {
  prop?: string;
}
type Example = { prop?: string };
```

Examples of **correct** code for this rule ✅

```ts
interface Example {
  prop: string | undefined;
}
type Example = { prop: string | undefined };
```

## 🚀 Installation

Install the package using `npm`:

```bash
npm install eslint-plugin-no-implicit-undefined --save-dev
```

## 📝 Configuration

### ESLint 9+ (Flat Config)

```js
// eslint.config.js
import noImplicitUndefined from 'eslint-plugin-no-implicit-undefined';

export default [
  noImplicitUndefined.configs.recommended,
];
```

### ESLint 8 (Legacy Config)

```json
{
  "plugins": ["no-implicit-undefined"],
  "rules": {
    "no-implicit-undefined/no-implicit-undefined": "error"
  }
}
```

## 📃 License

MIT
