import { explicitUndefinedCheck } from './no-unspecific-if-statement.js'
import { defineEmitSuggestion } from './define-emit-structure.js'

const rules = {
  'explicit-if-conditions': explicitUndefinedCheck,
  'define-emit-suggestion': defineEmitSuggestion,
}

export default rules
