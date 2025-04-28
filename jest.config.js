/**
 * @type {import('jest').Config}
 */
export default {
  transform: {
    "^.+\\.js$": "babel-jest", // Transforms JS files with babel-jest
  },
  collectCoverage: true, // Collect test coverage
  coverageDirectory: "coverage", // Where coverage data will be saved
  testEnvironment: "node", // Node environment for server-side testing
  transformIgnorePatterns: [
    "/node_modules/" // Don't transform node_modules
  ],
  moduleFileExtensions: ["js", "json"], // Supported file extensions
  // Add any other configurations you need
};
