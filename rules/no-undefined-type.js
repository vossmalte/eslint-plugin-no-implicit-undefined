module.exports = {
    meta: {
      type: "problem",
      docs: {
        description: "Disallow undefined as an explicit type",
        category: "Best Practices",
        recommended: true,
      },
      schema: [],
    },
    create: function (context) {
      return {
        TSTypeAnnotation(node) {
          if (node.typeAnnotation.type === 'TSUndefinedKeyword') {
            context.report({
              node: node.typeAnnotation,
              message: "Do not use 'undefined' as an explicit type. Use optional properties or 'null' instead.",
            });
          }
        },
      };
    },
  };
  