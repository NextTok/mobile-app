const path = require("path");

const frameworkModules = {
  "@app": path.resolve(__dirname, "./src"),
  "@assets": path.resolve(__dirname, "./assets"),
};

const moduleResolverConfig = {
  root: path.resolve("./"),
  alias: {
    ...frameworkModules,
  },
  extensions: [".js", ".jsx", ".ts", ".tsx", ".ttf", ".png"],
};

const plugins = [
  ["module-resolver", moduleResolverConfig],
  [
    'babel-plugin-styled-components',
    {
      ssr: false, // Disable server-side rendering
      displayName: true, // Helpful in debugging
      preprocess: false, // Enables preprocessing
    },
  ],
  ['react-native-worklets-core/plugin']
]

const presets = ['babel-preset-expo'];

module.exports = function (api) {
  api.cache(true);
  return {
    presets,
    plugins
  };
};