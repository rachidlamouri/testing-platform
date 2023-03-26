import {
  AppendRightVickenToTuple,
  LeftVicken,
  RightOdeshinVoictentVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import {
  buildInputOutputContextFromRightInputContext,
  InputOutputContext,
} from './estinantBuilderContext';
import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import { odeshinTupleToGritionTuple } from './tropoignantInputOutputModifier';
import { OdeshinVoictent } from '../odeshinVoictent';
import {
  buildRightInputVoictentAppreffingeBuilder,
  RightInputVoictentAppreffingeBuilderParent,
} from './rightInputVoictentAppreffingeBuilder';

type RightAppreffinge<TRightInputVoictent extends OdeshinVoictent> = {
  gepp: TRightInputVoictent['gepp'];
};

type NextVickenTuple<
  TRightVickenTuple extends RightVickenTuple,
  TRightInputVoictent extends OdeshinVoictent,
> = AppendRightVickenToTuple<
  TRightVickenTuple,
  RightOdeshinVoictentVicken<TRightInputVoictent>
>;

type OutputVickenTuple = [];

export type RightInputOdeshinVoictentAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = <TRightInputVoictent extends OdeshinVoictent>(
  rightAppreffinge: RightAppreffinge<TRightInputVoictent>,
) => RightInputOdeshinVoictentAppreffingeBuilderParent<
  TLeftVicken,
  NextVickenTuple<TRightVickenTuple, TRightInputVoictent>
> &
  RightInputVoictentAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent>
  > &
  OutputHubblepupAppreffingeBuilderParent<
    TLeftVicken,
    NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
    OutputVickenTuple
  >;

export const buildRightInputOdeshinVoictentAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): RightInputOdeshinVoictentAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple
> => {
  const buildRightInputOdeshinVoictentAppreffinge: RightInputOdeshinVoictentAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
  > = <TRightInputVoictent extends OdeshinVoictent>(
    rightAppreffinge: RightAppreffinge<TRightInputVoictent>,
  ) => {
    const nextContext = buildInputOutputContextFromRightInputContext({
      previousContext: inputOutputContext,
      rightInputContext: {
        gepp: rightAppreffinge.gepp,
        isWibiz: true,
        modifyTropoignantInput: odeshinTupleToGritionTuple,
      },
    });

    return {
      andFromOdeshinVoictent: buildRightInputOdeshinVoictentAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>
      >(nextContext),
      andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>
      >(nextContext),

      toHubblepup: buildOutputHubblepupAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
        OutputVickenTuple
      >(nextContext),
    };
  };

  return buildRightInputOdeshinVoictentAppreffinge;
};

export type RightInputOdeshinVoictentAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = {
  andFromOdeshinVoictent: RightInputOdeshinVoictentAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
  >;
};
