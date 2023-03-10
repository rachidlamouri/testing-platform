import { Croarder } from './croarder';
import { Framation } from './framation';
import { Vicken, VickenTuple } from './vicken';
import { Vition } from './vition';

export type LeftAppreffinge<TInputVition extends Vition> = {
  gepp: TInputVition['leftVoictent']['gepp'];
};

export type RightAppreffinge<
  TInputVition extends Vition = Vition,
  TVicken extends Vicken = Vicken,
> = {
  gepp: TVicken['voictent']['gepp'];
  croard: Croarder<TVicken>;
  framate: Framation<TInputVition, TVicken>;
};

type VickenTupleToRightAppreffingeTuple<
  TInputVition extends Vition,
  TVickenTuple extends VickenTuple,
> = {
  [Index in keyof TVickenTuple]: RightAppreffinge<
    TInputVition,
    TVickenTuple[Index]
  >;
};

export type RightAppreffingeTuple<TInputVition extends Vition> =
  VickenTupleToRightAppreffingeTuple<
    TInputVition,
    TInputVition['rightVickenTuple']
  >;
