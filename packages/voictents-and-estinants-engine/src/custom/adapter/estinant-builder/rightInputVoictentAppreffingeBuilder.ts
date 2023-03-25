import {
  AppendRightVickenToTuple,
  LeftVicken,
  RightHubblepupVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { Voictent } from '../voictent';
import {
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

export type RightInputVoictentAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = <TRightInputVoictent extends Voictent>(
  rightAppreffinge: RightAppreffinge<TRightInputVoictent>,
) => RightInputVoictentAppreffingeBuilderParent<
  TLeftVicken,
  NextVickenTuple<TRightVickenTuple, TRightInputVoictent>
> &
  OutputHubblepupAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent>
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent>
  >;

export const buildRightInputVoictentAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
>(
  inputContext: InputContext,
): RightInputVoictentAppreffingeBuilder<TLeftVicken, TRightVickenTuple> => {
  const buildRightInputHubblepupAppreffinge: RightInputVoictentAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
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
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>
      >(nextContext),

      toHubblepup: buildOutputHubblepupAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>
      >(nextContext),
      toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>
      >(nextContext),
    };
  };

  return buildRightInputHubblepupAppreffinge;
};

export type RightInputVoictentAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = {
  andFromVoictent: RightInputVoictentAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
  >;
};
