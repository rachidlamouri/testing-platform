import { StringKeys } from './types/stringKeys';

export type CustomMapTypeParameter = {
  Key: unknown;
  InputValue: unknown;
  StoredValue: unknown;
};

export type DefaultStoredValueInstantiator<T extends CustomMapTypeParameter> = (
  key: T['Key'],
) => T['StoredValue'];

export type StoredValueMutator<T extends CustomMapTypeParameter> = (parameter: {
  [TKey in StringKeys<
    Pick<T, 'InputValue' | 'StoredValue'>
  > as Uncapitalize<TKey>]: T[TKey];
}) => void;

export type CustomMapConstructorParameter<
  TCustomMapTypeParameter extends CustomMapTypeParameter,
> = {
  createDefaultStoredValue: DefaultStoredValueInstantiator<TCustomMapTypeParameter>;
  mutateStoredValue: StoredValueMutator<TCustomMapTypeParameter>;
  initialKeys?: readonly TCustomMapTypeParameter['Key'][];
};

export class CustomMap<T extends CustomMapTypeParameter> extends Map<
  T['Key'],
  T['StoredValue']
> {
  public readonly createDefaultStoredValue: DefaultStoredValueInstantiator<T>;

  public readonly mutateStoredValue: StoredValueMutator<T>;

  constructor({
    createDefaultStoredValue,
    mutateStoredValue,
    initialKeys = [],
  }: CustomMapConstructorParameter<T>) {
    super();

    this.createDefaultStoredValue = createDefaultStoredValue;
    this.mutateStoredValue = mutateStoredValue;

    initialKeys.forEach((key) => {
      const initialValue = this.get(key);
      this.setInputValue(key, initialValue);
    });
  }

  get(key: T['Key']): T['StoredValue'] {
    return super.get(key) ?? this.createDefaultStoredValue(key);
  }

  setInputValue(key: T['Key'], inputValue: T['InputValue']): void {
    const storedValue = this.get(key);
    this.mutateStoredValue({ inputValue, storedValue });
    this.set(key, storedValue);
  }

  asEntries(): [T['Key'], T['StoredValue']][] {
    return [...super.entries()];
  }
}
