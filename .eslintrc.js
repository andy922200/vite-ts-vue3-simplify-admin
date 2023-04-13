module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        '@vue/typescript/recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'vue',
        '@typescript-eslint'
    ],
    rules: {
        indent: ['error', 4],
        quotes: [2, 'single'],
        semi: [2, 'never'],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-use-before-define': [2, 'nofunc'],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/html-indent': ['error', 4],
        'vue/multi-word-component-names': 'off'
    }
}
