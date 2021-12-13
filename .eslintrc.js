module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-native', 'module-resolver', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'react-native/no-unused-styles': 1,
    'react-native/no-color-literals': 0,
    'react/no-array-index-key': 1,
    'react/no-unused-prop-types': 0,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 1,
    'react-native/no-single-element-style-arrays': 2,
    camelcase: 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'react/no-unescaped-entities': 0,
    'no-nested-ternary': 0,
    'default-param-last': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, {extensions: ['.jsx', '.js', '.tsx']}],
    'no-use-before-define': 'off',
    'no-param-reassign': 0,
    'react/prop-types': 0,
    'no-shadow': 'off',
    'react/function-component-definition': 0,
    'linebreak-style': 0,
    'no-unused-vars': 1,
    'import/no-unresolved': [2, {commonjs: true, amd: true}],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'prettier/prettier': ['warn', {endOfLine: 'auto'}],
    'prefer-const': ['warn', {destructuring: 'all'}],
  },
  settings: {
    'import/ignore': ['node_modules'],
    'import/resolver': {
      'babel-module': {},
    },
  },
};
