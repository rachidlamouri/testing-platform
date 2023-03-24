import { LeftVicken, RightVickenTuple } from './vicken';
import { Vition, VitionToHubblepupInputList } from './vition';
import { VoictentTuple, VoictentTupleToQuirmList } from './voictent';

export type Tropoignant<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = (
  ...inputTuple: VitionToHubblepupInputList<TInputVition>
) => VoictentTupleToQuirmList<TOutputVoictentTuple>;

type RightVickenTupleToRightTropoignantInputTuple<
  TRightVickenTuple extends RightVickenTuple,
> = {
  [Index in keyof TRightVickenTuple]: TRightVickenTuple[Index]['tropoignantInput'];
};

type LeftVickenAndRightVickenTupleToTropoignantInputTuple<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = [
  TLeftVicken['tropoignantInput'],
  ...RightVickenTupleToRightTropoignantInputTuple<TRightVickenTuple>,
];

export type Tropoignant2<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVoictentTuple extends VoictentTuple,
> = (
  ...inputTuple: LeftVickenAndRightVickenTupleToTropoignantInputTuple<
    TLeftVicken,
    TRightVickenTuple
  >
) => VoictentTupleToQuirmList<TOutputVoictentTuple>;
