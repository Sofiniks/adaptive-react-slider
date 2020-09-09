var path = require('path');

module.exports = {
    mode: 'production',
    devtool: false,
    entry: './src/AdaptiveSlider.jsx',
    output: {
        path: path.resolve('lib'),
        filename: 'AdaptiveSlider.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx?$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'react': path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom')
        }
    },
    externals: [
        // nodeExternals(),
        {
          react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
          },
          'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
          }
        }]

};