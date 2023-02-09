/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watchAll: false,
  testPathIgnorePatterns: [
    "tests/online/"
  ]
};