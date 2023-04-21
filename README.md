# ESLint Plugin: eslint-plugin-no-explicit-undefined

Disallow the use of `undefined` as an explicit type in TypeScript.

## 🚀 Installation

Install the package using `npm`:

```bash
npm install eslint-plugin-no-explicit-undefined --save-dev
```

Install the package using `yarn`:

```bash
yarn add eslint-plugin-no-explicit-undefined --dev
```

Install the package using `pnpm`:

```bash
pnpm install eslint-plugin-no-explicit-undefined --save-dev
```

## 📝 Configuration

To configure the rule, add it to your ESLint configuration file (`.eslintrc.json`, `.eslintrc.js`, etc.):

```json
{
  "extends": ["custom"],
  "plugins": ["no-undefined-type-declaration"],
  "rules": {
    "no-undefined-type-declaration/no-undefined-type": "error"
  }
}
```

## 📚 Rule Details

This rule disallows the use of undefined as an explicit type in TypeScript. Instead, developers should use optional properties or null.

Examples of incorrect code for this rule:

```ts
type Example = string | undefined;
let example: string | undefined = 'hello';
function example(param: string | undefined) {}
```

Examples of correct code for this rule ✅:

```ts
type Example = string | null;
let example: string | null = 'hello';
function example(param?: string) {}
```

## 🔧 Customization

This rule doesn't have any options or customization.

## 📃 License

MIT
