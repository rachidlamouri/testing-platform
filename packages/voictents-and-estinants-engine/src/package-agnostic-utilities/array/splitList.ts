type ListSplitterParameter<TElementA, TElementB> = {
  list: (TElementA | TElementB)[];
  isElementA: (element: TElementA | TElementB) => element is TElementA;
  accumulatorA: TElementA[];
  accumulatorB: TElementB[];
};

export const splitList = <TElementA, TElementB>({
  list,
  isElementA,
  accumulatorA,
  accumulatorB,
}: ListSplitterParameter<TElementA, TElementB>): void => {
  list.forEach((element) => {
    if (isElementA(element)) {
      accumulatorA.push(element);
    } else {
      accumulatorB.push(element);
    }
  });
};
