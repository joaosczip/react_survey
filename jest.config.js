module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/@types/**/*',
    '!<rootDir>/src/domain/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/main/test/cypress',
  ],
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.ts',
  },
};
