const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = function({ host, port } = {}) {
  return {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
    ],
    devServer: {
      historyApiFallback: true,
      hot: true,
      stats: 'errors-only',
      host, // Defaults to `localhost`
      port, // Defaults to 8080
      overlay: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };
};

exports.loadCSS = function({ include, exclude } = {}) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
  };
};

exports.extractCSS = function({ include, exclude, use }) {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin("styles.css");

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: plugin.extract({
            use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [
      plugin
    ],
  };
};
