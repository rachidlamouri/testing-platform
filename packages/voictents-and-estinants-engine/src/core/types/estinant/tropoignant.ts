import { GenericLeftInputVicken } from '../vicken/leftInputVicken';
import { GenericOutputVicken } from '../vicken/outputVicken';
import {
  GenericRightInputVickenTuple,
  RightInputVickenTupleTropoignantInputTuple,
} from '../vicken/rightInputVicken';

/**
 * A tranform with specific input and output datastructures that make it easy
 * for the engine to stream data.
 *
 * @todo define Transform
 *
 * @readableName CoreTransform
 */
export type Tropoignant2<
  TLeftVicken extends GenericLeftInputVicken,
  TRightVickenTuple extends GenericRightInputVickenTuple,
  TOutputVicken extends GenericOutputVicken,
> = (
  leftInput: TLeftVicken['tropoignantInput'],
  ...rightInputTuple: RightInputVickenTupleTropoignantInputTuple<TRightVickenTuple>
) => TOutputVicken['tropoignantOutput'];

export type GenericTropoignant2 = Tropoignant2<
  GenericLeftInputVicken,
  GenericRightInputVickenTuple,
  GenericOutputVicken
>;
