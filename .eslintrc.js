module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'google',
    'plugin:vue/essential',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': 'off',
    'require-jsdoc': 'off',
    'new-cap': 'off',
    'vue/valid-v-slot': 'off',
  },
};
