import checkFile from "eslint-plugin-check-file";
import _import from "eslint-plugin-import";
import { fixupPluginRules, fixupConfigRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["node_modules/*", "**/dist/", "public/*", "generators/*"],
}, ...compat.extends("eslint:recommended"), {
    plugins: {
        "check-file": checkFile,
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
)).map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
})), {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
    },

    settings: {
        react: {
            version: "detect",
        },

        "import/resolver": {
            alias: {
                map: [["@", "./src"]],
                extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
            },
        },
    },

    rules: {
        "import/no-restricted-paths": ["error", {
            zones: [{
                target: "./src/features/auth",
                from: "./src/features",
                except: ["./auth"],
            }, {
                target: "./src/features/home",
                from: "./src/features",
                except: ["./home"],
            }, {
                target: "./src/features",
                from: "./src/app",
            }, {
                target: ["./src/shared/"],
                from: ["./src/features", "./src/app"],
            }],
        }],

        "import/no-cycle": "error",
        "linebreak-style": ["error", "unix"],
        "react/prop-types": "off",

        "import/order": ["error", {
            groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
            "newlines-between": "always",

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],

        "import/default": "off",
        "import/no-named-as-default-member": "off",
        "import/no-named-as-default": "off",
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
        "@typescript-eslint/no-empty-function": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],

        "prettier/prettier": ["error", {}, {
            usePrettierrc: true,
        }],

        "check-file/filename-naming-convention": ["error", {
            "**/*.{ts,tsx}": "KEBAB_CASE",
        }, {
            ignoreMiddleExtensions: true,
        }],
    },
}, {
    files: ["src/**/!(__tests__)/*"],

    rules: {
        "check-file/filename-naming-convention": ["error", {
            "**/*.{ts,tsx}": "KEBAB_CASE",
        }, {
            ignoreMiddleExtensions: true,
        }],

        "check-file/folder-naming-convention": ["error", {
            "src/**/!(__tests__)": "KEBAB_CASE",
        }],
    },
}];