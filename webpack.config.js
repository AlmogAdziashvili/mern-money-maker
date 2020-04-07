const path = require('path');

module.exports = {
  watch: true,
  entry: {
    authenticate: './src/client/applications/authenticate/authenticate.jsx',
    reset: './src/client/applications/reset/reset.jsx',
    index: './src/client/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|woff(2)?|ttf|eot|svg)$/i,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
