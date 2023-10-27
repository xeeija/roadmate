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
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: true,
    ecmaFeatures: {
      jsx: true,
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
  },
  ignorePatterns: ["src/services/*"],
};
