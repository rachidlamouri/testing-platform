export class CustomSet<T> extends Set<T> {
  asArray(): T[] {
    return [...this];
  }
}
