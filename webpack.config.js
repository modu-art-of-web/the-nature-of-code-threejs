const webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');

module.exports = {

  entry: [
    __dirname + '/js/index.js',
    __dirname + '/style/style.scss'
  ],

  output: {
    path: __dirname,
    filename: 'dist/bundle.js',
    chunkFilename: 'chunks/[name].chunk.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: __dirname,
      query: {
        presets: ['es2015']
      }
    },{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract([
        'css-loader',
        'sass-loader'
      ])
    }]
  },

  devtool: 'source-map',

  plugins: getPlugins()
};

function getPlugins() {
  let plugins = [];

  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': process.env.NODE_ENV
    }
  }));

  plugins.push(new ExtractTextPlugin({
    filename: './dist/style.bundle.css',
    disable: false,
    allChunks: true
  }));

  if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      minimize: true
    }));
  }

  else {
    //dev mode
  }

  return plugins;
}