import { ESLintUtils } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`)

// Type: RuleModule<"explicit-undefined-check", ...>
export const explicitUndefinedCheck = createRule({
  create(context) {
    return {
      IfStatement(node) {
        const testExpression = node.test

        // Check for non-boolean values
        if (testExpression.type === 'UnaryExpression' && testExpression.operator === '!') {
          context.report({
            messageId: 'explicitUndefinedCheck',
            node: testExpression,
          })
        }

        // Check for boolean values
        if (testExpression.type === 'Identifier') {
          context.report({
            messageId: 'explicitBooleanCheck',
            node: testExpression,
          })
        }
      },
    }
  },
  name: 'explicit-if-conditions',
  meta: {
    docs: {
      description: 'Enforce explicit conditions in if statements.',
    },
    messages: {
      explicitUndefinedCheck: 'Use explicit check for undefined: if (someValue !== undefined) {}',
      explicitBooleanCheck: 'Use explicit check for boolean: if (someBool === true) {}',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
})
