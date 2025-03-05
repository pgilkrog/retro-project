// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import customRules from './eslint-rules/index.js'

export default tseslint.config(
  {
    ignores: ['dist/**', 'src/phaser/**'],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  ...pluginVue.configs['flat/strongly-recommended'],
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      vue: pluginVue,
      custom: {
        rules: customRules,
      },
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      'vue/no-unused-vars': 'error',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'custom/explicit-if-conditions': 'error',
      'custom/define-emit-suggestion': 'error',
    },
  },
  ...vueTsEslintConfig(),
  prettierConfig
)
