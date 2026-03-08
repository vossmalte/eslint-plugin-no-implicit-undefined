import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../rules/eslint-plugin-no-implicit-undefined';

const ruleTester = new RuleTester();

ruleTester.run('no-undefined-type', rule, {
  valid: [
    // Already explicit: string | undefined without optional operator
    'type Example = { prop: string | undefined; }',
    'interface Example { prop: string | undefined; }',
    // No optionality at all
    'type Example = { prop: string }',
    'interface Example { prop: string }',
    // Multi-property, neither optional
    'type Example = { a: string; b: number }',
  ],
  invalid: [
    // Basic type alias
    {
      code: 'type Example = { prop?: string; }',
      output: 'type Example = { prop: string | undefined; }',
      errors: [{ messageId: 'message' }],
    },
    // Basic interface
    {
      code: 'interface Example { prop?: string; }',
      output: 'interface Example { prop: string | undefined; }',
      errors: [{ messageId: 'message' }],
    },
    // Multi-property: both fixed independently
    {
      code: 'type Example = { a?: string; b?: number }',
      output: 'type Example = { a: string | undefined; b: number | undefined }',
      errors: [{ messageId: 'message' }, { messageId: 'message' }],
    },
    // Complex union — should append | undefined
    {
      code: 'type Example = { prop?: string | null }',
      output: 'type Example = { prop: string | null | undefined }',
      errors: [{ messageId: 'message' }],
    },
    // Nested object type — outer property fixed
    {
      code: 'type Example = { outer?: { inner: string } }',
      output: 'type Example = { outer: { inner: string } | undefined }',
      errors: [{ messageId: 'message' }],
    },
    // Whitespace between key and ? — fixer removes only the ? token
    {
      code: 'type Example = { prop  ?: string }',
      output: 'type Example = { prop  : string | undefined }',
      errors: [{ messageId: 'message' }],
    },
    // Quoted key — report but no fix (non-Identifier key)
    {
      code: 'type Example = { "prop"?: string }',
      output: null,
      errors: [{ messageId: 'message' }],
    },
    // Missing type annotation — report but no fix
    {
      code: 'type Example = { prop? }',
      output: null,
      errors: [{ messageId: 'message' }],
    },
    // Already has | undefined in union — report but no fix (would duplicate)
    {
      code: 'type Example = { prop?: string | undefined }',
      output: null,
      errors: [{ messageId: 'message' }],
    },
  ],
});

// eslint tests
// eslint-disable-next-line no-implicit-undefined/no-implicit-undefined
type Example1 = { prop?: string };

// eslint-disable-next-line no-implicit-undefined/no-implicit-undefined
interface Example2 {prop?: string;}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseTypes = Example1 | Example2;
