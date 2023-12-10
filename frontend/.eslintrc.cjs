module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    // "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    quotes: ["warn", "double", { allowTemplateLiterals: true }],
    "jsx-quotes": ["warn", "prefer-double"],
    // "prettier/prettier": "warn",
    "@typescript-eslint/ban-types": [
      "warn",
      {
        extendDefaults: true,
        types: {
          "React.FC": {
            message:
              "Use `FC` instead. Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177",
            // fixWith: "FC",
            suggest: ["FC"],
          },
          "React.FunctionComponent": {
            message:
              "Use `FC` instead. Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177",
            // fixWith: "FC",
            suggest: ["FC"],
          },
          "React.FunctionalComponent": {
            message:
              "Preact specific, Use `FC` instead. useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177",
            // fixWith: "FC",
            suggest: ["FC"],
          },
        },
      },
    ],
  },
  ignorePatterns: ["src/services/*"],
}
