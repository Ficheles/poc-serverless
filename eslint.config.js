const config = [
  {
    languageOptions: {
      globals: {
        browser: true,
        node: true,
        es2021: true,
      },
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    rules: {
      // Adicione suas regras personalizadas aqui
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      // outras regras
    },
    ignores: [
      'dist/**', // Ignora todos os arquivos dentro do diretório dist
      '.esbuild/**', // Ignora todos os arquivos dentro do diretório dist
      'eslint.config.js', // Ignora o arquivo eslint.config.js
      'jest.config.js', // Ignora o arquivo jest.config.js
      'tsconfig.js', // Ignora o arquivo
    ],
  },
];

module.exports = config;
