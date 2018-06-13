let path = require('path');

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [{
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader'

            },
            {
                exclude: /node_modules/, // don't transpile node_modules
                test: /\.jsx$/, // do transpile any files ending in .jsx
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ["transform-react-jsx"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    // devtool: 'eval-sourcemap'
};

module.exports = (env, options) => {
    // let production = options.mode === 'production';
    //  conf.devtool = production ? false : 'eval-sourcemap';
    return conf;
}