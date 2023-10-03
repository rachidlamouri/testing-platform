import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { TypeScriptObject } from '../../../package-agnostic-utilities/object/typeScriptObject';

/**
 * The thing that a programmer operates on by streaming it between collections
 * and transforms.
 *
 * It is of type "unknown" because it can be anything!
 *
 * @readableName Streamable
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
