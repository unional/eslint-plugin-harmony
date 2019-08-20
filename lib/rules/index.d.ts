export declare const rules: {
    'member-delimiter-style': import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleModule<"unexpectedComma" | "unexpectedSemi" | "expectedComma" | "expectedSemi", [{
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
//# sourceMappingURL=index.d.ts.map