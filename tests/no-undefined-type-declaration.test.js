const { RuleTester } = require('eslint');
const rule = require('../rules/eslint-plugin-no-explicit-undefined');

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

ruleTester.run('no-undefined-type', rule, {
  valid: [
    "type Example = string | undefined;",
    "let example: string | undefined = 'hello';",
    "function example(param?: string) {}",
  ],
  invalid: [
    {
      code: "function example(param: string | undefined) {}",
      errors: [{ message: 'Unexpected undefined type in declaration' }],
    },
    {
      code: "class Test { constructor(public prop: string | undefined) {} }",
      errors: [{ message: 'Unexpected undefined type in declaration' }],
    },
    {
      code: "interface Example { prop: string | undefined; }",
      errors: [{ message: 'Unexpected undefined type in declaration' }],
    },
  ],
});
