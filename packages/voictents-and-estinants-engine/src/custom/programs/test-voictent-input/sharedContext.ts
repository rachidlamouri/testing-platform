// Note: we haven't had a use case for injecting context into a transform yet so this is definitely an anti-pattern
export const sharedContext = {
  itemCallCount: 0,
  collectionCallCount: 0,

  reset(): void {
    this.itemCallCount = 0;
    this.collectionCallCount = 0;
  },
};
