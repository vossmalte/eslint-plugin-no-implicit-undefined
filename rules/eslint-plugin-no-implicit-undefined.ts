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
              if (node.key.type !== 'Identifier') return [];
              if (!node.typeAnnotation) return [];
              // Check if union already contains undefined — report but don't fix
              const sourceCode = context.getSourceCode();
              const typeAnnotationText = sourceCode.getText(node.typeAnnotation);
              if (typeAnnotationText.includes('undefined')) return [];
              const questionToken = sourceCode.getFirstTokenBetween(
                node.key,
                node.typeAnnotation,
                { filter: (token) => token.value === '?' }
              );
              if (!questionToken) return [];
              return [
                fixer.remove(questionToken),
                fixer.insertTextAfter(node.typeAnnotation, ' | undefined'),
              ];
            },
          });
        }
      },
    };
  },
});

export default rule;
