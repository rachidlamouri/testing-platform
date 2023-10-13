import { IdTuple } from '../../../../../package-agnostic-utilities/data-structure/id';
import { GenericIndexedItem } from '../../../item/item';
import { GenericLeftInputStreamConnectionMetatype } from '../../../stream-connection-metatype/leftInputStreamConnectionMetatype';
import { GenericRightInputItemTupleStreamConnectionMetatype } from '../../../stream-connection-metatype/rightInputStreamConnectionMetatype';

/**
 * A function that takes the leftmost input of a transform input group and
 * outputs a key tuple for the associated right inputs of a particular stream
 * connection. This allows the engine to look up the associated right inputs by key and
 * coordinate triggering a transform when an input group has all items.
 *
 * @readableName RightKeyTupleAccessor
 */
export type RightKeyTupleAccessor = (
  leftIndexedItem: GenericIndexedItem,
) => IdTuple;

export type RightKeyTupleAccessor3<
  TLeftInputStreamConnectionMetatype extends GenericLeftInputStreamConnectionMetatype,
  TRightInputStreamConnectionMetatype extends GenericRightInputItemTupleStreamConnectionMetatype,
> = (
  leftCoreTransformInput: TLeftInputStreamConnectionMetatype['coreTransformInput'],
) => TRightInputStreamConnectionMetatype['idTuple'];

export type GenericRightKeyTupleAccessor3 = RightKeyTupleAccessor3<
  GenericLeftInputStreamConnectionMetatype,
  GenericRightInputItemTupleStreamConnectionMetatype
>;
