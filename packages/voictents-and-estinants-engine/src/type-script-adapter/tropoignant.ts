import { LeftVicken, OutputVickenTuple, RightVickenTuple } from './vicken';
import { Vition, VitionToHubblepupInputList } from './vition';
import {
  VoictentToQuirm,
  VoictentTuple,
  VoictentTupleToQuirmList,
} from './voictent';

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

type VickenTupleToQuirmList<TOutputVickenTuple extends OutputVickenTuple> = {
  [Index in keyof TOutputVickenTuple]: VoictentToQuirm<
    TOutputVickenTuple[Index]['voictent']
  >;
}[number][];

export type Tropoignant2<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = (
  ...inputTuple: LeftVickenAndRightVickenTupleToTropoignantInputTuple<
    TLeftVicken,
    TRightVickenTuple
  >
) => VickenTupleToQuirmList<TOutputVickenTuple>;
