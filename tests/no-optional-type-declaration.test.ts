import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../rules/eslint-plugin-no-implicit-undefined'

const ruleTester = new RuleTester();

ruleTester.run('no-undefined-type', rule, {
  valid: [
    "type Example = { prop: string | undefined; }",
    "interface Example { prop: string | undefined; }",
  ],
  invalid: [
    {
      code: "type Example = { prop?: string; }",
      output: "type Example = { prop: string | undefined; }",
      errors: [{ messageId: 'message' }],
    },
    {
      code: "interface Example { prop?: string; }",
      output: "interface Example { prop: string | undefined; }",
      errors: [{ messageId: 'message' }],
    },
  ],
});
