import { ESLintUtils } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`)

export const defineEmitSuggestion = createRule({
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee
        if (callee.type === 'Identifier' && callee.name === 'defineEmits') {
          const args = node.arguments
          if (args.length === 1 && args[0].type === 'ArrayExpression') {
            context.report({
              node,
              message:
                'defineEmits should be used with generic types, e.g., defineEmits<{ eventName: [paramType] }>()',
            })
          }
        }
      },
    }
  },
  name: 'define-emit-suggestion',
  meta: {
    docs: {
      description: 'enforce defineEmits to be used with generic types',
    },
    messages: {
      explicitUndefinedCheck: 'yo',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
})
