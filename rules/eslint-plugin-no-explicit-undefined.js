module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow explicit undefined type',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code', // Indicate that this rule supports autofixes
    schema: [],
  },

  create: function (context) {
    return {
      TSUnionType(node) {
        const { types } = node;
        const undefinedType = types.find(
          (type) => type.type === 'TSUndefinedKeyword'
        );

        if (!undefinedType) {
          return;
        }

        context.report({
          node: undefinedType,
          message: 'Unexpected undefined type in declaration',
          fix: function (fixer) {
            if (node.parent.type === 'TSPropertySignature') {
              // If it's a property signature, add '?' to make the property optional
              const questionToken = node.parent.optional ? '' : '?';
              return fixer.replaceTextRange([node.typeAnnotation.range[0], undefinedType.range[1]], questionToken);
            } else {
              // If it's a variable declaration or a function parameter, remove the '| undefined' part
              const index = types.indexOf(undefinedType);
              const previousType = types[index - 1];
              const rangeStart = previousType.range[1];
              const rangeEnd = undefinedType.range[1];
              return fixer.removeRange([rangeStart, rangeEnd]);
            }
          },
          
        });
      },
    };
  },
};
