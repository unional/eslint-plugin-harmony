declare type Delimiter = 'comma' | 'none' | 'semi';
declare type BaseOptions = {
    multiline?: {
        delimiter?: Delimiter;
        requireLast?: boolean;
    };
    singleline?: {
        delimiter?: 'comma' | 'semi';
        requireLast?: boolean;
    };
};
declare type Config = BaseOptions & {
    overrides?: {
        typeLiteral?: BaseOptions;
        interface?: BaseOptions;
    };
};
declare type MessageIds = 'unexpectedComma' | 'unexpectedSemi' | 'expectedComma' | 'expectedSemi';
declare const _default: import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleModule<MessageIds, [Config], import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleListener>;
export default _default;
//# sourceMappingURL=member-delimiter-style.d.ts.map