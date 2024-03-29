module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript",
        [
            "@babel/preset-react",
            {
                runtime: "automatic",
            },
        ],
    ],
    plugins: [
        ["babel-plugin-root-import"],
        {
            paths: [
                {
                    rootPathSuffix: "./src/components/",
                    rootPathPrefix: "~/",
                },
                {
                    rootPathSuffix: "./src/utils",
                    rootPathPrefix: "!/",
                },
            ],
        },
    ],
};
