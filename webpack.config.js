const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
};

const commonConfig = merge([
  {
    entry: [
      path.join(PATHS.app, 'index.js')
    ],
    output: {
      filename: 'bundle.js',
      path: PATHS.build,
      publicPath: '/static/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            'babel-loader',
          ],
          exclude: /node_modules/,
        }
      ],
    },
  }
]);

const productionConfig = merge([
  parts.extractCSS({
    use: [
          {
              loader: 'css-loader',
              query: {
                  sourceMaps: false,
                  minimize: true,
              }
          },
          'postcss-loader'
      ],
    include: PATHS.app
  }),
  {
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
            screw_ie8: true,
            warnings: false
        }
      })
    ]
  }
]);

const developmentConfig = merge([
  {
    devtool: 'inline-source-map'
  },
  parts.loadCSS(),
  parts.devServer({host: 'localhost', port: 3000})
]);

// var entry = [
//   'react-hot-loader/patch',
//   'webpack-dev-server/client?http://localhost:3000',
//   'webpack/hot/only-dev-server',
//   './src/index.js'
// ];

// var plugins = [
//   // new ExtractTextPlugin("styles.css"),
//   new webpack.HotModuleReplacementPlugin(),
//   new webpack.NamedModulesPlugin(),
//   new webpack.NoEmitOnErrorsPlugin(),
// ];

// var devServer = {
//   host: 'localhost',
//   port: 3000,
//   historyApiFallback: true,
//   hot: true,
// };
//
// var devtool = 'inline-source-map';

// if(process.env.NODE_ENV == 'production'){
//   entry = ['./src/index.js'];
//   plugins = [
//     new ExtractTextPlugin("styles.css"),
//     new webpack.NoEmitOnErrorsPlugin(),
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//           screw_ie8: true,
//           warnings: false
//       }
//     })
//   ];
//   devServer = {};
//   devtool = '';
//
// }
module.exports = process.env.NODE_ENV == 'production'
  ? merge(commonConfig, productionConfig)
  : merge.strategy({entry:'prepend'})(commonConfig, developmentConfig);
// module.exports = {
//   entry: entry,
//
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: '/static/'
//   },
//
//   devtool: devtool,
//
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         use: [
//           'babel-loader',
//         ],
//         exclude: /node_modules/,
//       },
//       {
//         // DEV config
//         test: /\.css$/,
//         use: [
//             'style-loader',
//             {
//                 loader: 'css-loader',
//                 query: {
//                     sourceMaps: true,
//                     minimize: false,
//                 }
//             },
//             'postcss-loader'
//         ],
//         // PROD config
//         // loader: ExtractTextPlugin.extract({
//         //     fallback: 'style-loader',
//         //     use: [
//         //         {
//         //             loader: 'css-loader',
//         //             query: {
//         //                 sourceMaps: false,
//         //                 minimize: true,
//         //                 // modules: true,
//         //                 // importLoaders: 1,
//         //                 // localIdentName: '[hash:base64:5]'
//         //             }
//         //         },
//         //         {
//         //             loader: 'postcss-loader',
//         //             // query: {
//         //             //     config: postcssConfigPath
//         //             // }
//         //         }
//         //     ]
//         // }),
//         include: path.resolve(__dirname, 'src')
//       }
//     ],
//   },
//   plugins: plugins,
//   devServer: devServer
// };
