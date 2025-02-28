import type { Config } from 'jest';

export const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.app.json',
        useESM: true,
      },
    ],
  },
  testPathIgnorePatterns: ['/node_modules/', '/package-lock.json'],
  testMatch: ['**/tests/**/*.test.(ts|tsx)', '**/src/**/*.test.(ts|tsx)'],
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
