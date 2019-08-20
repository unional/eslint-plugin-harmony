"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const es5_strict_json_1 = __importDefault(require("./es5-strict.json"));
const es5_json_1 = __importDefault(require("./es5.json"));
const latest_json_1 = __importDefault(require("./latest.json"));
const ts_prettier_json_1 = __importDefault(require("./ts-prettier.json"));
const ts_recommended_requiring_type_checking_json_1 = __importDefault(require("./ts-recommended-requiring-type-checking.json"));
const ts_recommended_json_1 = __importDefault(require("./ts-recommended.json"));
const member_delimiter_style_js_1 = __importDefault(require("./rules/typescript/member-delimiter-style.js"));
module.exports = {
    configs: {
        es5: es5_json_1.default,
        'es5-strict': es5_strict_json_1.default,
        latest: latest_json_1.default,
        'ts-prettier': ts_prettier_json_1.default,
        'ts-recommended-requiring-type-checking': ts_recommended_requiring_type_checking_json_1.default,
        'ts-recommended': ts_recommended_json_1.default,
    },
    rules: {
        'member-delimiter-style2': member_delimiter_style_js_1.default
    }
};
//# sourceMappingURL=index.js.map