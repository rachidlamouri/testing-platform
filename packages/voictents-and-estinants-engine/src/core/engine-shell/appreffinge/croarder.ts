import { Zorn } from '../../../utilities/semantic-types/zorn';
import { GenericIndexedHubblepup, Hubblepup } from '../quirm/hubblepup';
import { GenericRightInputHubblepupVicken } from '../vicken/rightInputVicken';

/**
 * A function that converts a Hubblepup to an identifying Zorn.
 * This is used by the Engine to associate Hubblepups from different Voictents when processing Estinants with multiple inputs.
 */
export type Croarder = (hubblepup: Hubblepup) => Zorn;

export type Croader2 = (rightIndexedHubblepup: GenericIndexedHubblepup) => Zorn;

export type Croader3<TRightVicken extends GenericRightInputHubblepupVicken> = (
  rightTropoignantInput: TRightVicken['tropoignantInput'],
) => TRightVicken['zornTupleOption'];

export type GenericCroader3 = Croader3<GenericRightInputHubblepupVicken>;
