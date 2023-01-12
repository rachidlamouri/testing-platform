// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InferrableMapAttribute = any;

type InferMapAttribute<
  TMap extends Map<InferrableMapAttribute, InferrableMapAttribute>,
  TAttributeName extends 'key' | 'value',
> = TMap extends Map<infer TKey, infer TValue>
  ? { key: TKey; value: TValue }[TAttributeName]
  : never;

export class CustomMap<
  TMap extends Map<InferrableMapAttribute, InferrableMapAttribute>,
> extends Map<
  InferMapAttribute<TMap, 'key'>,
  InferMapAttribute<TMap, 'value'>
> {}
