module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow explicit undefined type',
      category: 'Best Practices',
      recommended: true,
      ruleId: 'no-explicit-undefined'
    },
    schema: [],
  },

  create: function (context) {
    function checkTypeAnnotation(node) {
      if (node.typeAnnotation && node.typeAnnotation.typeAnnotation.type === 'TSUnionType') {
        const { types } = node.typeAnnotation.typeAnnotation;
        const undefinedType = types.find(
          (type) => type.type === 'TSUndefinedKeyword'
        );

        if (undefinedType) {
          context.report({
            node: undefinedType,
            message: 'Unexpected undefined type in declaration. Remove the `undefined` type and use optional (?) declaration instead.',
          });
        }
      }
    }

    return {
      'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression'(node) {
        node.params.forEach(checkTypeAnnotation);
      },
      TSParameterProperty(node) {
        checkTypeAnnotation(node.parameter);
      },
      TSPropertySignature(node) {
        checkTypeAnnotation(node);
      },
    };
  },
};
