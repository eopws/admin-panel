module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': ['error', { overrides: { constructors: 'off' } }],
  },
  overrides: [
    {
      files: ['*.entity.ts', '*.dto.ts', '*.model.ts'],
      rules: {
        "@typescript-eslint/explicit-member-accessibility": ['off']
      }
    },
    {
      files: ['*.controller.ts', '*.gateway.ts'],
      rules: {
        "@typescript-eslint/explicit-member-accessibility": ['error', { overrides: { methods: 'off', constructors: 'off' } }]
      }
    },
  ]
};
