const path = require("path");
const rule = require("../rules/eslint-plugin-no-explicit-undefined");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
});

const errorMessage =
  "Do not use 'undefined' as an explicit type. Use optional properties (?:) or 'null' instead.";

ruleTester.run("no-undefined-type", rule, {
  valid: [
        { code: `type Example = string | null;` },
        { code: `let example: string | null = 'hello';` },
        { code: `function example(param?: string) {}` },
  ],
  invalid: [
    {
        code: `export {}; type Example = string | undefined;`,
        errors: [{ message: errorMessage }],
    },
    {
        code: `export {}; let example: string | undefined = 'hello';`,
        errors: [{ message: errorMessage }],
    },
    {
        code: `export {}; function example(param: string | undefined) {}`,
        errors: [{ message: errorMessage }],
    },
    {
        code: `export {}; function example(param: unknown | any | undefined) {}`,
        errors: [{ message: errorMessage }],
    },
  ],
});
