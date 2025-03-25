# ESLint Plugin: eslint-plugin-no-explicit-undefined

Disallow the use of optional operator (`?`)  as an explicit type in TypeScript and instead use `undefined` instead.

## 📚 Rule Examples

This rule disallows the use of optional operator (`?`)as an explicit type in TypeScript. Instead, developers should use `undefined`.

Examples of **incorrect** code for this rule ❌

```ts
interface Example { prop?: string; }
type Example = { prop?: string; }
```

Examples of **correct** code for this rule ✅

```ts
interface Example { prop: string | undefined; }
type Example = { prop: string | undefined; }
```

## 🚀 Installation

Install the package using `npm`:

```bash
npm install eslint-plugin-no-implicit-undefined --save-dev
```

## 📝 Configuration

To configure the rule, add it to your ESLint configuration file (`.eslintrc.json`, `.eslintrc.js`, etc.):

```json
{
  "extends": ["custom"],
  "plugins": ["no-optional-type-declaration"],
  "rules": {
    "no-optional-type-declaration/no-implicit-undefined": "error"
  }
}
```

## 📃 License

MIT
