import { Deprecatedzorn } from '../../../../../package-agnostic-utilities/data-structure/zorn';
import { GenericIndexedHubblepup } from '../../../hubblepup/hubblepup';
import { GenericRightInputHubblepupTupleVicken } from '../../../vicken/rightInputVicken';

/**
 * A function that gets the key for an item. The engine does not assume the
 * shape of any item, so this information has to be supplied by the
 * programmer. This is used by the engine to associate items from different
 * collections when a transform has multiple inputs.
 *
 * @readableName KeyAccessor
 */
export type Croarder = (
  rightIndexedHubblepup: GenericIndexedHubblepup,
) => Deprecatedzorn;

export type Croarder3<
  TRightVicken extends GenericRightInputHubblepupTupleVicken,
> = (
  rightTropoignantInputElement: TRightVicken['tropoignantInput'][number],
) => TRightVicken['zornTupleOption'];

export type GenericCroarder3 = Croarder3<GenericRightInputHubblepupTupleVicken>;
