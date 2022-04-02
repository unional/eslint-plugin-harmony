/**
 * Disable @typescript-eslint/no-empty-interface.
 * It is useful to have empty interfaces.
 * They provides a contextual meaning to the interface,
 * and allow extensibility in the future without breaking changes.
 *
 * It is needed for open/closed principles
 */


export interface Bar {}

export interface Foo extends Bar {}
