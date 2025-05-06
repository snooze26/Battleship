module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["js", "json"],
};
