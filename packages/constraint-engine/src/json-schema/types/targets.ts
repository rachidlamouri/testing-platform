export type JsonStringTarget = string;

export type JsonNumberTarget = number;

export type JsonBooleanTarget = boolean;

export type JsonNullTarget = null;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type JsonArrayTarget = JsonTarget[];

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type JsonObjectTarget = { [key: string]: JsonTarget };

export type JsonTarget =
  | JsonStringTarget
  | JsonNumberTarget
  | JsonBooleanTarget
  | JsonNullTarget
  | JsonArrayTarget
  | JsonObjectTarget;

// TODO: figure out what to do so we don't have to make an extraneous export
export type Targets = symbol;
