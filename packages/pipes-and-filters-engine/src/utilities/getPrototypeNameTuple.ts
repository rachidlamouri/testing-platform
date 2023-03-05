const accumulatePrototypeNameTuple = (
  datum: object,
  prototypeNameTuple: string[],
): void => {
  const prototypeName = datum.constructor.name;
  prototypeNameTuple.push(prototypeName);

  const prototype = Object.getPrototypeOf(datum) as object | null;
  if (prototype !== null) {
    accumulatePrototypeNameTuple(prototype, prototypeNameTuple);
  }
};

export const getPrototypeNameTuple = (datum: object): string[] => {
  const prototypeNameTuple: string[] = [];
  accumulatePrototypeNameTuple(
    Object.getPrototypeOf(datum) as object,
    prototypeNameTuple,
  );

  return prototypeNameTuple;
};
