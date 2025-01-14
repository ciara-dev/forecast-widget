import path from "path";

export const webpack = {
  configure: (webpackConfig) => {
    webpackConfig.output = {
      ...webpackConfig.output,
      filename: "widget.js", // Output your widget.js file
      library: "WeatherWidget", // Export the widget as a global variable
      libraryTarget: "umd", // UMD format ensures compatibility
      publicPath: "/", // Public path for assets
    };

    // Ensure only the necessary code is included in the bundle
    webpackConfig.optimization.splitChunks = false;
    webpackConfig.optimization.runtimeChunk = false;

    return webpackConfig;
  },
};
