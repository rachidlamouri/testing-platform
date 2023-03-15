export type TypeScriptPrimitiveOptionTuple = readonly [
  bigint,
  boolean,
  null,
  number,
  string,
  symbol,
  undefined,
];

export type TypeScriptPrimitive = TypeScriptPrimitiveOptionTuple[number];
