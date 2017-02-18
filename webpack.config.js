var path = require('path');
var webpack = require('webpack');

var config = {
  production: {},
  development: {}
}

var entry = [
  'react-hot-loader/patch',
  // activate HMR for React

  'webpack-dev-server/client?http://localhost:3000',
  // bundle the client for webpack-dev-server
  // and connect to the provided endpoint

  'webpack/hot/only-dev-server',
  // bundle the client for hot reloading
  // only- means to only hot reload for successful updates

  './src/index.js'
];
var plugins = [
  new webpack.HotModuleReplacementPlugin(),
  // enable HMR globally

  new webpack.NamedModulesPlugin(),
  // prints more readable module names in the browser console on HMR updates

  new webpack.NoEmitOnErrorsPlugin(),
  // do not emit compiled assets that include errors
];
var devServer = {
  host: 'localhost',
  port: 3000,

  historyApiFallback: true,
  // respond to 404s with index.html

  hot: true,
  // enable HMR on the server
};

var devtool = 'inline-source-map';

if(process.env.NODE_ENV == 'production'){
  entry = ['./src/index.js'];
  plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
    compress: {
        screw_ie8: true,
        warnings: false
    }
})
  ];
  devServer = {};
  devtool = '';

}
module.exports = {
  entry: entry,

  output: {
    filename: 'bundle.js',
    // the output bundle

    path: path.resolve(__dirname, 'dist'),

    publicPath: '/static/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: devtool,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: plugins,

  devServer: devServer
};
