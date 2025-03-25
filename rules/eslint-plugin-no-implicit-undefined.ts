import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  () => `https://github.com/vossmalte/eslint-plugin-no-implicit-undefined/README.md`,
);

const rule = createRule({
  name: 'no-implicit-undefined',
  defaultOptions: [],
  meta: {
    messages: {
      message:
        'Unexpected optional type in declaration. Remove the `?` type and use `undefined` instead.',
    },
    type: 'problem',
    docs: {
      description: 'Disallow implicit undefined type',
    },
    schema: [],
    fixable: 'code',
  },

  create: (context) => {
    return {
      TSPropertySignature(node) {
        if (node.optional) {
          context.report({
            node,
            messageId: 'message',
            fix: (fixer) => {
              if (node.key.type != 'Identifier') return [];
              if (!node.typeAnnotation) return [];
              const keyNameRangeEnd = node.key.range[1];
              const typeAnnotationRangeStart = node.typeAnnotation.range[0];
              return [
                fixer.removeRange([keyNameRangeEnd, typeAnnotationRangeStart]), // remove the ?
                fixer.insertTextAfterRange(node.typeAnnotation.range, ' | undefined'),
              ];
            },
          });
        }
      },
    };
  },
});

export default rule;
