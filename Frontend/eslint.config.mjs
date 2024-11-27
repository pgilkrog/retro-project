// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default tseslint.config(
  {
    ignores: ['dist/**', 'src/phaser/**'],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      vue: pluginVue,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
      "@typescript-eslint/no-confusing-non-null-assertion": "error",
      "@typescript-eslint/no-empty-function": "error",  
      "@typescript-eslint/no-floating-promises": "off",
      'vue/no-unused-vars': 'error',
    },
  },
  prettierConfig,
  ...pluginVue.configs['flat/strongly-recommended'], 
  ...vueTsEslintConfig()
)
