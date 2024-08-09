/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/default",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest"],
  },
  transformIgnorePatterns: ["/node_modules/", "__tests__", "dist", "build"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__mocks__/",
    "/__utils__/",
    "/__data__/",
    "/build/",
    "/dist/",
  ],
  roots: ["<rootDir>"],
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: [
    "<rootDir>/index.ts",
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/types/**/*.ts",
    "!<rootDir>/src/interfaces/**/*.ts",
  ],
};
