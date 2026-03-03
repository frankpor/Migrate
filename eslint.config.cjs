// eslint.config.cjs
const globals = require("globals");

module.exports = [
  // 1) Ignore big third-party libraries (we don't want to lint those)
  {
    ignores: [
      "js/echarts.js",
      "js/jquery.min.js",
      "js/jszip.min.js",
    ],
  },

  // 2) Config specifically for the ES module file
  {
    files: ["js/data-viewer.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module", // import/export allowed here
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },

  // 3) Default config for all other JS files
  {
    files: ["js/**/*.js"],
    ignores: ["js/data-viewer.js"], // don't override the module config
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script", // classic scripts
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
