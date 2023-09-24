import { ZornTuple } from '../../../../../utilities/semantic-types/zorn';
import { GenericIndexedHubblepup } from '../../../hubblepup/hubblepup';
import { GenericLeftInputVicken } from '../../../vicken/leftInputVicken';
import { GenericRightInputHubblepupTupleVicken } from '../../../vicken/rightInputVicken';

/**
 * A function that takes the leftmost Hubblepup of a Cology and outputs a Zorn tuple for each of the other members of the Cology
 */
export type Framation = (
  leftIndexedHubblepup: GenericIndexedHubblepup,
) => ZornTuple;

export type Framation3<
  TLeftInputVicken extends GenericLeftInputVicken,
  TRightInputVicken extends GenericRightInputHubblepupTupleVicken,
> = (
  leftTropoignantInput: TLeftInputVicken['tropoignantInput'],
) => TRightInputVicken['zornTuple'];

export type GenericFramation3 = Framation3<
  GenericLeftInputVicken,
  GenericRightInputHubblepupTupleVicken
>;