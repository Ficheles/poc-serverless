module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Inclui extensões .ts e .js
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)$', // Para capturar .ts e .js
};
