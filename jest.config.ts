// jest.config.ts
import type { Config } from "jest"

const config: Config = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["/node_modules/"],
  globals: {
    "ts-jest": {
      useESM: false, // or true if you're using ESM (your setup looks like CJS)
      tsconfig: "tsconfig.json",
      babelConfig: true,
    },
  },
}

export default config
