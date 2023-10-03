import { Zorn } from '../../../../../package-agnostic-utilities/datastructure/zorn';
import { GenericIndexedHubblepup } from '../../../hubblepup/hubblepup';
import { GenericRightInputHubblepupTupleVicken } from '../../../vicken/rightInputVicken';

/**
 * A function that gets the id for a streamable. The engine does not assume the
 * shape of any streamable, so this information has to be supplied by the
 * programmer. This is used by the engine to associate streamables from different
 * collections when a transform has multiple inputs.
 *
 * @readableName IdAccessor
 */
export type Croarder = (rightIndexedHubblepup: GenericIndexedHubblepup) => Zorn;

export type Croader3<
  TRightVicken extends GenericRightInputHubblepupTupleVicken,
> = (
  rightTropoignantInputElement: TRightVicken['tropoignantInput'][number],
) => TRightVicken['zornTupleOption'];

export type GenericCroader3 = Croader3<GenericRightInputHubblepupTupleVicken>;
