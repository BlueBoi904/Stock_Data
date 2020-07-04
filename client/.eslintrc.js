module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-native'],
    root: true,
    extends: ['plugin:@typescript-eslint/recommended', '@react-native-community'],
    rules: {
      '@typescript-eslint/no-explicit-any': 2,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-use-before-define': 0,
      "react-native/no-unused-styles": 2,
      "react-native/no-inline-styles": 2,
      "react-native/no-color-literals": 2,
      "react-hooks/exhaustive-deps": 0,
    },
  };
  