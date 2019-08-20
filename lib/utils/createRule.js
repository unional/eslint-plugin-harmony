"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const pkg_1 = require("../pkg");
exports.createRule = experimental_utils_1.ESLintUtils.RuleCreator(name => `https://github.com/unional/eslint-plugin-harmony/blob/v${pkg_1.pkg.version}/docs/rules/${name}.md`);
//# sourceMappingURL=createRule.js.map