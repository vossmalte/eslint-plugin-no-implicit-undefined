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
    "type Example = string | null;",
    "let example: string | null = 'hello';",
    "function example(param?: string) {}",
  ],
  invalid: [
    {
      code: "type Example = string | undefined;",
      errors: [{ message: 'Unexpected undefined type in declaration' }],
      output: "type Example = string;",
    },
    {
      code: "let example: string | undefined = 'hello';",
      errors: [{ message: 'Unexpected undefined type in declaration' }],
      output: "let example: string = 'hello';",
    },
    {
      code: "function example(param: string | undefined) {}",
      errors: [{ message: 'Unexpected undefined type in declaration' }],
      output: "function example(param: string) {}",
    },
    // this doesn't work. Need to debug
    // {
    //   code: "interface Foo { bar: string | undefined; }",
    //   errors: [{ message: 'Unexpected undefined type in declaration' }],
    //   output: "interface Foo { bar?: string; }",
    // },
  ],
});
