import {
  LeftContext,
  OutputContext,
  RightContextTuple,
} from '../../custom/adapter/estinant-builder/estinantBuilderContext';
import {
  LeftAppreffinge,
  RightAppreffingeTuple,
  RightAppreffingeTuple2,
} from '../appreffinge';
import { Tropoignant } from '../tropoignant';
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

type RightContextTupleToTropoignantInputTuple<
  TRightContextTuple extends RightContextTuple,
> = {
  [Index in keyof TRightContextTuple]: Parameters<
    TRightContextTuple[Index]['modifyTropoignantInput']
  >[0];
};

export type Estinant2<
  TLeftContext extends LeftContext,
  TRightContextTuple extends RightContextTuple,
  TOutputContext extends OutputContext,
> = {
  leftAppreffinge: {
    gepp: TLeftContext['gepp'];
    isWibiz: TLeftContext['isWibiz'];
  };
  rightAppreffingeTuple: RightAppreffingeTuple2<TRightContextTuple>;
  tropoig: (
    ...inputTuple: [
      Parameters<TLeftContext['modifyTropoignantInput']>[0],
      ...RightContextTupleToTropoignantInputTuple<TRightContextTuple>,
    ]
  ) => ReturnType<TOutputContext['normalizePinbetunfOutput']>;
};
