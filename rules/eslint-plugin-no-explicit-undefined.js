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
      'TSUnionType > TSUndefinedKeyword'(node) {
        context.report({
          node,
          message:
            "Do not use 'undefined' as an explicit type. Use optional properties (?:) or 'null' instead.",
        });
      },
    };
  },
};
