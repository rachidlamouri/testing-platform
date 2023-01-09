export class CustomSet<T> extends Set<T> {
  toArray(): T[] {
    return [...this];
  }
}
