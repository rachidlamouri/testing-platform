import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { TypeScriptObject } from '../../../package-agnostic-utilities/object/typeScriptObject';

export type Item = unknown;

/**
 * The thing that a programmer operates on by streaming it between collections
 * and transforms.
 *
 * It is of type "unknown" because it can be anything!
 *
 * @readableName Item
 *
 * @canonicalDeclaration
 */
type Hubblepup2<THubblepup> = THubblepup;

export type GenericHubblepup = Hubblepup2<unknown>;

export type HubblepupTuple = readonly Item[];

export type HubblepupIndexByName = TypeScriptObject;

export type IndexedHubblepup<
  THubblepup extends Item,
  TIndexByName extends HubblepupIndexByName,
> = {
  indexByName: TIndexByName;
  hubblepup: THubblepup;
};

export type GenericIndexedHubblepup = IndexedHubblepup<
  Item,
  HubblepupIndexByName
>;

export type GenericIndexedHubblepupTuple = Tuple<GenericIndexedHubblepup>;
