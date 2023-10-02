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

/**
 * A custom utility for taking n object types and combining them into one
 * object. This provides better intellisense than the "&" operator and it can
 * handle n types whereas typefest can only handle two at a time. This may have
 * poor performance when given a lot of objects (tens or hundredd? idk benchmark it)
 */
export type SpreadN<TObjectList extends Spreadable[]> = TObjectList extends [
  infer TFirstObject extends Spreadable,
  ...infer TRestObjectList extends Spreadable[],
]
  ? InnerSpreadN<TFirstObject, TRestObjectList>
  : never;
