module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            "jsx": true
        },
        ecmaVersion: 2018,
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    settings: {
        react: {
            version: "detect"
        }
    },
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        "indent": [
            "error",
            2,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single", { avoidEscape: true }
        ],
        "semi": [
            "error",
            "never"
        ],
        "@typescript-eslint/semi": [
            "error",
            "never",
        ],
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "none"
                },
                "singleline": {
                    "delimiter": "semi"
                }
            }
        ],
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        "no-trailing-spaces": "error",
        "no-case-declarations": "off",
        "eol-last": "error",
        "react/prop-types": "off",
        "react/display-name": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "jsx-a11y/media-has-caption": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "react/no-unescaped-entities": "off",
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        "jsx-a11y/anchor-is-valid": "off"
    },
};
