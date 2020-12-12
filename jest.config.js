/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '\\.(png|jpe?g|svg|gif|webp)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(sass|scss|css)$': '<rootDir>/__mocks__/styleMock.js',

    '^Components(.*)$': '<rootDir>/source/components$1',
    '^Styles(.*)$': '<rootDir>/source/sass$1',
    '^Hooks(.*)$': '<rootDir>/source/hooks$1'
  }
};
