import { DeprecatedId } from '../../../../../package-agnostic-utilities/data-structure/id';
import { GenericIndexedItem } from '../../../item/item';
import { GenericRightInputItemTupleStreamConnectionMetatype } from '../../../stream-connection-metatype/rightInputStreamConnectionMetatype';

/**
 * A function that gets the key for an item. The engine does not assume the
 * shape of any item, so this information has to be supplied by the
 * programmer. This is used by the engine to associate items from different
 * collections when a transform has multiple inputs.
 *
 * @readableName KeyAccessor
 */
export type Croarder = (
  rightIndexedHubblepup: GenericIndexedItem,
) => DeprecatedId;

export type Croarder3<
  TRightVicken extends GenericRightInputItemTupleStreamConnectionMetatype,
> = (
  rightTropoignantInputElement: TRightVicken['coreTransformInput'][number],
) => TRightVicken['idTupleOption'];

export type GenericCroarder3 =
  Croarder3<GenericRightInputItemTupleStreamConnectionMetatype>;
