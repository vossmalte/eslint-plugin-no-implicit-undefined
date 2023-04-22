const { RuleTester } = require('eslint');
const rule = require('../rules/eslint-plugin-no-explicit-undefined');

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

const message = 'Unexpected undefined type in declaration. Remove the `undefined` type and use optional (?) declaration instead.';

ruleTester.run('no-undefined-type', rule, {
  valid: [
    "type Example = string | undefined;",
    "let example: string | undefined = 'hello';",
    "function example(param?: string) {}",
  ],
  invalid: [
    {
      code: "function example(param: string | undefined) {}",
      errors: [{ message }],
    },
    {
      code: "class Test { constructor(public prop: string | undefined) {} }",
      errors: [{ message }],
    },
    {
      code: "interface Example { prop: string | undefined; }",
      errors: [{ message }],
    },
    {
      code: "const example = (param?: string | undefined) => {}",
      errors: [{ message }]
    }
  ],
});
