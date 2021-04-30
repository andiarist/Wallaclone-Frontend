module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'plugin:react-redux/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'react-redux', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/state-in-constructor': 'off',
    'no-unused-vars': 'warn',
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'import/no-unresolved': 'off',
  },
};
