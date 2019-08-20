declare const _default: {
    configs: {
        es5: {
            "extends": string[];
        };
        'es5-strict': {
            "extends": string[];
            "rules": {
                "comma-dangle": string[];
                "semi": string[];
            };
        };
        latest: {
            "extends": string[];
        };
        'ts-prettier': {
            "extends": string[];
        };
        'ts-recommended-requiring-type-checking': {
            "extends": string[];
        };
        'ts-recommended': {
            "extends": string[];
        };
    };
    rules: {
        'member-delimiter-style2': import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleModule<"unexpectedComma" | "unexpectedSemi" | "expectedComma" | "expectedSemi", [{
            multiline?: {
                delimiter?: "comma" | "none" | "semi" | undefined;
                requireLast?: boolean | undefined;
            } | undefined;
            singleline?: {
                delimiter?: "comma" | "semi" | undefined;
                requireLast?: boolean | undefined;
            } | undefined;
        } & {
            overrides?: {
                typeLiteral?: {
                    multiline?: {
                        delimiter?: "comma" | "none" | "semi" | undefined;
                        requireLast?: boolean | undefined;
                    } | undefined;
                    singleline?: {
                        delimiter?: "comma" | "semi" | undefined;
                        requireLast?: boolean | undefined;
                    } | undefined;
                } | undefined;
                interface?: {
                    multiline?: {
                        delimiter?: "comma" | "none" | "semi" | undefined;
                        requireLast?: boolean | undefined;
                    } | undefined;
                    singleline?: {
                        delimiter?: "comma" | "semi" | undefined;
                        requireLast?: boolean | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        }], import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleListener>;
    };
};
export = _default;
//# sourceMappingURL=index.d.ts.map