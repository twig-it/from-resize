process.env.TZ = "UTC"; // Tests should always run in UTC, no time zone dependencies

module.exports = {
  rootDir: ".",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
    },
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "test-results/traceable-ui",
      },
    ],
    [
      "jest-html-reporter",
      {
        outputPath: "test-results/traceable-ui/test-report.html",
      },
    ],
  ],
  watchPathIgnorePatterns: ["test-results"],
  collectCoverageFrom: ["src/**/*.ts", "projects/*/src/**/*.ts", "!**/*.d.ts"],
  coverageDirectory: "coverage/from-resize-demo-app",
  modulePathIgnorePatterns: ["<rootDir>/dist/"], // Need to reset from app project, but empty is merged
  testMatch: ["<rootDir>/(src|projects)/**/+(*.)+(spec|test).ts"],
  moduleNameMapper: {
    "@org/from-resize": "<rootDir>/dist/from-resize",
  },
};
