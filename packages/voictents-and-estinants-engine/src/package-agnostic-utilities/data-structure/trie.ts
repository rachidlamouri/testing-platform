/**
 * See https://en.wikipedia.org/wiki/Trie
 */
export class Trie<T> {
  value: T;

  subtrieByKey: Record<string, Trie<T>> = {};

  constructor(value: T) {
    this.value = value;
  }

  getSubtrie(key: string): Trie<T> | null {
    return this.subtrieByKey[key] ?? null;
  }

  get hasSubtries(): boolean {
    return Object.keys(this.subtrieByKey).length > 0;
  }

  setSubtrie(key: string, subtrie: Trie<T>): void {
    this.subtrieByKey[key] = subtrie;
  }

  // TODO: make the parameter an object
  addSubtrie(
    pathList: string[],
    createSubtrie: () => Trie<T>,
    setValue: (currentValue: T) => T = (currentValue): T => currentValue,
  ): void {
    // note: reversing so that we can use Array.prototype.pop which is O(c) instead of Array.prototype.shift which is O(n)
    const reversePathList = pathList.slice().reverse();

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let previousTrie: Trie<T> = this;
    let nextTrie: Trie<T> = previousTrie;
    while (reversePathList.length > 0) {
      const pathSegment = reversePathList.pop() as string;
      nextTrie = previousTrie.getSubtrie(pathSegment) ?? createSubtrie();
      previousTrie.setSubtrie(pathSegment, nextTrie);

      previousTrie = nextTrie;
    }

    nextTrie.value = setValue(nextTrie.value);
  }

  private flattenSubtrie(
    trieAccumulator: Trie<T>[],
    nextSubtrie: Trie<T>,
  ): void {
    trieAccumulator.push(nextSubtrie);

    Object.values(nextSubtrie.subtrieByKey).forEach((subtrieSubtrie) => {
      this.flattenSubtrie(trieAccumulator, subtrieSubtrie);
    });
  }

  flatten(): Trie<T>[] {
    const trieAccumulator: Trie<T>[] = [];
    this.flattenSubtrie(trieAccumulator, this);
    return trieAccumulator;
  }

  find(pathList: string[], predicate: (value: T) => boolean): T {
    // note: reversing so that we can use Array.prototype.pop which is O(c) instead of Array.prototype.shift which is O(n)
    const reversePathList = pathList.slice().reverse();

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let subtrie: Trie<T> = this;
    let key: string;
    while (
      !predicate(subtrie.value) &&
      reversePathList.length > 0 &&
      reversePathList[reversePathList.length - 1] in subtrie.subtrieByKey
    ) {
      key = reversePathList.pop() as string;
      subtrie = subtrie.subtrieByKey[key];
    }

    return subtrie.value;
  }
}
