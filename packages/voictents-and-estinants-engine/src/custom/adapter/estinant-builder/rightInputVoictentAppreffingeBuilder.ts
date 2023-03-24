import {
  AppendRightVickenToTuple,
  LeftVicken,
  RightHubblepupVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { StralineTuple } from '../../../utilities/semantic-types/straline';
import { Voictent } from '../voictent';
import {
  AppendInputToPinbetunfInputTuple,
  extendInputContext,
  InputContext,
  RightInputVoictentContext,
} from './estinantBuilderContext';
import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import {
  buildOutputHubblepupTupleAppreffingeBuilder,
  OutputHubblepupTupleAppreffingeBuilderParent,
} from './outputHubblepupTupleAppreffingeBuilder';
import { hubblepupTupleToHubblepupTuple } from './tropoignantInputOutputModifier';

type RightAppreffinge<TRightInputVoictent extends Voictent> = {
  gepp: TRightInputVoictent['gepp'];
};

type NextVickenTuple<
  TRightVickenTuple extends RightVickenTuple,
  TRightInputVoictent extends Voictent,
> = AppendRightVickenToTuple<
  TRightVickenTuple,
  RightHubblepupVicken<TRightInputVoictent>
>;

type NextPinbetunfInputTuple<
  TPinbetunfInputTuple extends StralineTuple,
  TRightInputVoictent extends Voictent,
> = AppendInputToPinbetunfInputTuple<
  TPinbetunfInputTuple,
  TRightInputVoictent['hubblepupTuple']
>;

export type RightInputVoictentAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = <TRightInputVoictent extends Voictent>(
  rightAppreffinge: RightAppreffinge<TRightInputVoictent>,
) => RightInputVoictentAppreffingeBuilderParent<
  TLeftVicken,
  NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
  NextPinbetunfInputTuple<TPinbetunfInputTuple, TRightInputVoictent>
> &
  OutputHubblepupAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
    NextPinbetunfInputTuple<TPinbetunfInputTuple, TRightInputVoictent>
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
    NextPinbetunfInputTuple<TPinbetunfInputTuple, TRightInputVoictent>
  >;

export const buildRightInputVoictentAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
>(
  inputContext: InputContext,
): RightInputVoictentAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TPinbetunfInputTuple
> => {
  const buildRightInputHubblepupAppreffinge: RightInputVoictentAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  > = <TRightInputVoictent extends Voictent>(
    rightAppreffinge: RightAppreffinge<TRightInputVoictent>,
  ) => {
    const nextContext = extendInputContext<RightInputVoictentContext>({
      inputContext,
      nextRightInputContext: {
        gepp: rightAppreffinge.gepp,
        isWibiz: true,
        modifyTropoignantInput: hubblepupTupleToHubblepupTuple,
      },
    });

    return {
      andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
        NextPinbetunfInputTuple<TPinbetunfInputTuple, TRightInputVoictent>
      >(nextContext),

      toHubblepup: buildOutputHubblepupAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
        NextPinbetunfInputTuple<TPinbetunfInputTuple, TRightInputVoictent>
      >(nextContext),
      toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
        NextPinbetunfInputTuple<TPinbetunfInputTuple, TRightInputVoictent>
      >(nextContext),
    };
  };

  return buildRightInputHubblepupAppreffinge;
};

export type RightInputVoictentAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = {
  andFromVoictent: RightInputVoictentAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  >;
};
