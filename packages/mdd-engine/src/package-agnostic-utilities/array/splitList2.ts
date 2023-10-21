type ElementB<
  TList extends unknown[],
  TElementA extends TList[number],
> = Exclude<TList[number], TElementA>;

type ListSplitterParameter<
  TList extends unknown[],
  TElementA extends TList[number],
> = {
  list: TList;
  isElementA: (element: TList[number]) => element is TElementA;
};

/**
 * Segments a list into two sublists via a predicate
 */
export const splitList2 = <
  TList extends unknown[],
  TElementA extends TList[number],
>({
  list,
  isElementA,
}: ListSplitterParameter<TList, TElementA>): [
  listA: TElementA[],
  listB: ElementB<TList, TElementA>[],
] => {
  const accumulatorA: TElementA[] = [];
  const accumulatorB: ElementB<TList, TElementA>[] = [];

  list.forEach((element) => {
    if (isElementA(element)) {
      accumulatorA.push(element);
    } else {
      accumulatorB.push(element as ElementB<TList, TElementA>);
    }
  });

  return [accumulatorA, accumulatorB];
};
