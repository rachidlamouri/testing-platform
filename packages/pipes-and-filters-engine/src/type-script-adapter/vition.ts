import { HubblepupTupleTuple } from './hubblepup';
import {
  VickenTuple,
  VickenTupleToHubblepupTuple as VickenTupleToHubblepupTupleTuple,
} from './vicken';
import { Voictent, VoictentToHubblepup } from './voictent';

export type Vition<
  TLeftVoictent extends Voictent = Voictent,
  TRightVickenTuple extends VickenTuple = VickenTuple,
> = {
  leftVoictent: TLeftVoictent;
  rightVickenTuple: TRightVickenTuple;
};

type SeeminglyUnnecessaryTypeCheck<T> = T extends HubblepupTupleTuple ? T : [];

export type VitionToHubblepupInputList<TVition extends Vition> = [
  VoictentToHubblepup<TVition['leftVoictent']>,
  ...SeeminglyUnnecessaryTypeCheck<
    VickenTupleToHubblepupTupleTuple<TVition['rightVickenTuple']>
  >,
];
