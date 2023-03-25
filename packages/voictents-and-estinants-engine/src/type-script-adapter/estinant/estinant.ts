import { Tuple } from '../../utilities/semantic-types/tuple';
import { LeftAppreffinge, RightAppreffingeTuple } from '../appreffinge';
import { Tropoignant, Tropoignant2 } from '../tropoignant';
import {
  LeftVicken,
  OutputVickenTuple,
  RightHubblepupVicken,
  RightVicken,
  RightVickenTuple,
} from '../vicken';
import { Vition } from '../vition';
import { VoictentTuple } from '../voictent';

export type Estinant<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = {
  leftAppreffinge: LeftAppreffinge<TInputVition>;
  rightAppreffingeTuple: RightAppreffingeTuple<TInputVition>;
  tropoig: Tropoignant<TInputVition, TOutputVoictentTuple>;
};

// TODO: a voictent right appreffinge does not nead a framation or croarder anymore
type RightVickenToAppreffinge<
  TLeftVicken extends LeftVicken,
  TRightVicken extends RightVicken,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = TRightVicken extends RightHubblepupVicken<any, any, any>
  ? {
      gepp: TRightVicken['voictent']['gepp'];
      isWibiz: boolean;
      framate: (
        leftInput: TLeftVicken['tropoignantInput'],
      ) => Tuple<TRightVicken['zorn']>;
      croard: (
        rightInput: TRightVicken['tropoignantInput'],
      ) => TRightVicken['zorn'];
    }
  : {
      gepp: TRightVicken['voictent']['gepp'];
      isWibiz: boolean;
      // TODO: remove these as they are not used
      framate: (leftInput: TLeftVicken['tropoignantInput']) => [''];
      croard: (rightInput: TRightVicken['tropoignantInput']) => '';
    };

export type RightVickenTupleToAppreffingeTuple<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = {
  [Index in keyof TRightVickenTuple]: RightVickenToAppreffinge<
    TLeftVicken,
    TRightVickenTuple[Index]
  >;
};

export type Estinant2<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = {
  leftAppreffinge: {
    gepp: TLeftVicken['voictent']['gepp'];
    isWibiz: boolean;
  };
  rightAppreffingeTuple: RightVickenTupleToAppreffingeTuple<
    TLeftVicken,
    TRightVickenTuple
  >;
  tropoig: Tropoignant2<TLeftVicken, TRightVickenTuple, TOutputVickenTuple>;
};
