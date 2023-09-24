import { Spread } from 'type-fest';
import { Spreadable } from 'type-fest/source/spread';

type InnerSpreadN<
  TAccumulatedObject extends Spreadable,
  TObjectList extends Spreadable[],
> = TObjectList extends [
  infer TFirstObject extends Spreadable,
  ...infer TRestObjectList extends Spreadable[],
]
  ? InnerSpreadN<Spread<TAccumulatedObject, TFirstObject>, TRestObjectList>
  : TObjectList extends [infer TLastObject extends Spreadable]
  ? Spread<TAccumulatedObject, TLastObject>
  : TAccumulatedObject;

export type SpreadN<TObjectList extends Spreadable[]> = TObjectList extends [
  infer TFirstObject extends Spreadable,
  ...infer TRestObjectList extends Spreadable[],
]
  ? InnerSpreadN<TFirstObject, TRestObjectList>
  : never;
