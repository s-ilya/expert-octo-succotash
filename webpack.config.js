module.exports = ({ mode } = {}) => ({
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  output: {
    filename: "bundle.js",
  },
  mode,
  target: "node"
});
