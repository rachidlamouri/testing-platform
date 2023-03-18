import { HubblepupTupleTuple } from './hubblepup';
import {
  Vicken2Tuple,
  VickenTuple,
  VickenTupleToHubblepupTuple as VickenTupleToHubblepupTupleTuple,
} from './vicken';
import { Virm } from './virm';
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

export type Vition2<
  TLeftVirm extends Virm = Virm,
  TRightVickenTuple extends Vicken2Tuple = Vicken2Tuple,
> = {
  leftVirm: TLeftVirm;
  rightVickenTuple: TRightVickenTuple;
};
