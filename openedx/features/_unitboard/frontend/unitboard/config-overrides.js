const BundleTracker = require("webpack-bundle-tracker");

module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }

  // Do not re-generate stats file when devServer starts:
  if (env === 'production') {
    config.plugins.push(new BundleTracker({
      path: __dirname,
      filename: "./build/static/unitboard-webpack-stats.json"
    }));
  }

  config.optimization.splitChunks = {
    chunks: 'all',
    name: 'vendor',
  }

  return config;
};
