module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2,
      {
        'FunctionDeclaration': {
          'parameters': 'first',
        },
      }
    ],
    'function-paren-newline': ['error', { 'minItems': 3 }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': [
      'error',
      'unix'
    ],
    'function-call-argument-newline': ['error', 'always'],
    'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': false }],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    '@typescript-eslint/no-explicit-any': 1,
  }
}
