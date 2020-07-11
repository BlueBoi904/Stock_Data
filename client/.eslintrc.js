module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-native'],
    root: true,
    extends: ['plugin:@typescript-eslint/recommended', '@react-native-community'],
    rules: {
      '@typescript-eslint/no-explicit-any': 2,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-use-before-define': 0,
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-empty-pattern": "off",
      "react-native/no-unused-styles": 2,
      "react-native/no-inline-styles": 2,
      "react-native/no-color-literals": 2,
      "no-shadow-restricted-names": "error",
      "dot-notation": 0,
      eqeqeq: ["warn", "always", {null: "ignore"}],
      "react-hooks/exhaustive-deps": 0,
      "no-async-promise-executor": "warn",
      "no-misleading-character-class": "warn",
      "no-template-curly-in-string": "warn",
      "no-octal-escape": "warn",
      "react/jsx-key": "warn",
      "react/prop-types": "off",
      "react/display-name": "off",
      "no-inner-declarations": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
  
      "react-native/no-unused-styles": "warn"
    },
    overrides: [
      {
        files: ["*.ts", "*.tsx"],
        rules: {
          // NOTE: TypeScript will warn about this. TypeScript also does it better
          // since it can understand reads/writes.
          "no-undef": "off",
          "no-unused-vars": "off",
  
          "consistent-return": "off",
  
          "no-dupe-class-members": "off", // TypeScript allows overloaded class methods.
        },
      },
    ],
  };
  