module.exports = {
    root: true,
    env: { es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/strict",
        "plugin:drizzle/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["drizzle", "simple-import-sort", "import"],
    rules: {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
    },
};
