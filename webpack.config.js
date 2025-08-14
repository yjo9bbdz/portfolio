const path = require('path')

module.exports = {
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js',
  },

  mode: 'production',

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
}
