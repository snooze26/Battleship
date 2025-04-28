module.exports = {
  presets: [
    [
      "@babel/preset-env", 
      {
        targets: {
          node: "current", // Target the current Node version
        },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-transform-modules-commonjs", // Converts ESM to CommonJS for Jest compatibility
  ],
};
