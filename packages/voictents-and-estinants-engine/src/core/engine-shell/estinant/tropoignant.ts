import {
  GenericIndexedHubblepup,
  GenericIndexedHubblepupTuple,
} from '../quirm/hubblepup';
import { QuirmList } from '../quirm/quirm';
import { GenericLeftInputVicken } from '../vicken/leftInputVicken';
import { GenericOutputVicken } from '../vicken/outputVicken';
import {
  GenericRightInputVickenTuple,
  RightInputVickenTupleTropoignantInputTuple,
} from '../vicken/rightInputVicken';

/**
 * The thing that a Programmer creates to process one or more Quirms. The engine manages them at runtime.
 */
export type Tropoignant = (
  leftInput: GenericIndexedHubblepup,
  ...rightInputTuple: GenericIndexedHubblepupTuple
) => QuirmList;

export type Tropoignant2<
  TLeftVicken extends GenericLeftInputVicken,
  TRightVickenTuple extends GenericRightInputVickenTuple,
  TOutputVicken extends GenericOutputVicken,
> = (
  leftInput: TLeftVicken['tropoignantInput'],
  ...rightInputTuple: RightInputVickenTupleTropoignantInputTuple<TRightVickenTuple>
) => TOutputVicken['tropoignantOutput'];
