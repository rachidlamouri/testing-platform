export type UnknownTargetInstance = unknown;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferableTargetInstance = any;

// TODO: figure out what to do so we don't have to make an extraneous export
export type TargetInstance = symbol;
