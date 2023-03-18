import {
  LeftContext,
  RightContext,
  RightContextTuple,
  TropoignantInput,
} from '../custom/adapter/estinant-builder/estinantBuilderContext';
import { Croarder } from './croarder';
import { Framation } from './framation';
import { Vicken, VickenTuple } from './vicken';
import { Vition } from './vition';

export type LeftAppreffinge<TInputVition extends Vition> = {
  gepp: TInputVition['leftVoictent']['gepp'];
  isWibiz?: boolean;
};

export type RightAppreffinge<
  TInputVition extends Vition = Vition,
  TVicken extends Vicken = Vicken,
> = {
  gepp: TVicken['voictent']['gepp'];
  isWibiz?: boolean;
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

// export type LeftAppreffinge2<TLeftContext extends LeftContext> = {
//   gepp: TLeftContext['gepp'];
//   isWibiz: TLeftContext['isWibiz'];
// };

// export type RightAppreffinge2<TRightContext extends RightContext> = {
//   gepp: TRightContext['gepp'];
//   isWibiz: TRightContext['isWibiz'];
//   framate: TRightContext['tropoigFramate'];
//   croard: TRightContext['tropoigCroard'];
// };

// export type RightAppreffingeTuple2<
//   TRightContextTuple extends RightContextTuple,
// > = {
//   [Index in keyof TRightContextTuple]: RightAppreffinge2<
//     TRightContextTuple[Index]
//   >;
// };
