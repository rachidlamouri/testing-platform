type ListSplitterParameter<TList extends unknown[]> = {
  list: TList;
  predicate: (element: TList[number]) => boolean;
};

/**
 * Segments a list into two sublists via an untyped predicate. That is, it does
 * not narrow down the type of either list.
 */
export const splitList3 = <TList extends unknown[]>({
  list,
  predicate,
}: ListSplitterParameter<TList>): [
  passList: TList[number][],
  failList: TList[number][],
] => {
  const accumulatorA: TList[number][] = [];
  const accumulatorB: TList[number][] = [];

  list.forEach((element) => {
    if (predicate(element)) {
      accumulatorA.push(element);
    } else {
      accumulatorB.push(element);
    }
  });

  return [accumulatorA, accumulatorB];
};
