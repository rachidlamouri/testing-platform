import { Zorn } from '../../../../../package-agnostic-utilities/datastructure/zorn';
import { GenericIndexedHubblepup } from '../../../hubblepup/hubblepup';
import { GenericRightInputHubblepupTupleVicken } from '../../../vicken/rightInputVicken';

/**
 * A function that converts a Hubblepup to an identifying Zorn.
 * This is used by the Engine to associate Hubblepups from different Voictents when processing Estinants with multiple inputs.
 */
export type Croarder = (rightIndexedHubblepup: GenericIndexedHubblepup) => Zorn;

export type Croader3<
  TRightVicken extends GenericRightInputHubblepupTupleVicken,
> = (
  rightTropoignantInputElement: TRightVicken['tropoignantInput'][number],
) => TRightVicken['zornTupleOption'];

export type GenericCroader3 = Croader3<GenericRightInputHubblepupTupleVicken>;
