const path = require('path');

module.exports = {
    entry: './client/app.js',
    output: {
        path: path.join(__dirname, 'client/public'),
        filename:'bundle.js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};