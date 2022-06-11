// .storybook/main.js
const path = require("path");
module.exports = {
  stories: [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // ERR_INVALID_ARG_TYPE
    // "@storybook/addon-storysource",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/preset-create-react-app",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css&/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: [require("tailwindcss"), require("autoprefixer")],
          },
        },
      ],
      include: path.resolve(__dirname, "../"),
    });
    config.resolve = {
      ...config.resolve,
      extensions: [
        ".js",
        ".jsx",
        ".mdx",
        ".ts",
        ".tsx",
        ".json",
        ".css",
        ".scss",
      ],
      modules: ["src", "node_modules"], // Assuming that your files are inside the src dir
    };
    return config;
  },

  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: {
        skipNodeModules: true,
      },
    },
  },
};
