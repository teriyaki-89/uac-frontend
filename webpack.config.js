const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');


let path = require("path");

module.exports = (env, options) => {
    const port = process.env.WEBPACK_DEV_SERVER_PORT || 8080;

    const cssModules = ["style-loader", "css-loader", "sass-loader"];

    if (options.mode == "production") {
        cssModules.splice(1, 0, MiniCssExtractPlugin.loader);
    }

    const assetFolder = "dist/";
    const assetFolderRelative = "./dist";

    let conf = {
        entry: ["./src/index.tsx"],
        output: {
            path: path.resolve(__dirname, assetFolderRelative),
            filename: "main.js",
            publicPath: assetFolder,
        },
        devServer: {
            overlay: true,
            port,
            watchContentBase: true,
            //writeToDisk: true,
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css",
                publicPath: assetFolder,
            }),
            new Dotenv({
                path: options.mode == "production"?'./.env.production':'.env.development'
            })
        ],

        module: {
            rules: [
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                { test: /\.(ts|tsx)$/, loader: "awesome-typescript-loader" },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: "file-loader",
                        },
                    ],
                },
                {
                    test: /\.(css|scss|sass)$/i,
                    use: cssModules,
                },
            ],
        },
        resolve: {
            extensions: [".js", ".jsx", ".tsx", ".ts", ".scss", ".css"],
        },
        node: {
            fs: "empty"
         }
        
    };

    conf.devtool = options.mode === "production" ? false : "cheap-module-eval-source-map";

    return conf;
};
