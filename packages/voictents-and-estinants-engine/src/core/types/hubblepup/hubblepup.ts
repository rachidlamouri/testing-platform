import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { TypeScriptObject } from '../../../package-agnostic-utilities/object/typeScriptObject';

/**
 * A thing that a Concrete Programmer wants to operate on
 */
export type Hubblepup = unknown;

type Hubblepup2<THubblepup> = THubblepup;

export type GenericHubbleup = Hubblepup2<unknown>;

export type HubblepupTuple = readonly Hubblepup[];

export type HubblepupIndexByName = TypeScriptObject;

export type IndexedHubblepup<
  THubblepup extends Hubblepup,
  TIndexByName extends HubblepupIndexByName,
> = {
  indexByName: TIndexByName;
  hubblepup: THubblepup;
};

export type GenericIndexedHubblepup = IndexedHubblepup<
  Hubblepup,
  HubblepupIndexByName
>;

export type GenericIndexedHubblepupTuple = Tuple<GenericIndexedHubblepup>;
