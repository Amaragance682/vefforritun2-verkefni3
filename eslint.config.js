import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"], 
    ignores: ["node_modules/", "dist/", "build/"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
