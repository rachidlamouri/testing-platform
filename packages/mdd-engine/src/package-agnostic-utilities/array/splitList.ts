type ListSplitterParameter<TElementA, TElementB> = {
  list: (TElementA | TElementB)[];
  isElementA: (element: TElementA | TElementB) => element is TElementA;
  accumulatorA: TElementA[];
  accumulatorB: TElementB[];
};

/**
 * Segments a list into two sublists based on the result of a predicate
 *
 * @todo there are several variations of this function that would probably be
 * better: a version that takes 2+ predicates and stops on the first matching
 * predicate, a version that takes 2+ predicates and allows an element to be in
 * more than one accumulator, and a version that takes 2+ predicates and and
 * throws if an element would be in two accumulators. These variants should also
 * throw if an element cannot be placed in one of the 2+ accumulators
 *
 * @deprecated use splitList2
 */
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
