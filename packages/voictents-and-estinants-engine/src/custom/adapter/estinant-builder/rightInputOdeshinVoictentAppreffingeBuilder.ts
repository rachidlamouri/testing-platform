import {
  AppendRightVickenToTuple,
  LeftVicken,
  RightOdeshinVoictentVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import {
  AggregatedOutput,
  extendInputContext,
  InputContext,
  InputOutputContext,
  RightInputVoictentContext,
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
  inputContext: InputContext,
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
    const nextInputContext = extendInputContext<RightInputVoictentContext>({
      inputContext,
      nextRightInputContext: {
        gepp: rightAppreffinge.gepp,
        isWibiz: true,
        modifyTropoignantInput: odeshinTupleToGritionTuple,
      },
    });

    const nextInputOutputContext: InputOutputContext = {
      inputContext: nextInputContext,
      outputContext: {
        aggregatePinbetunfOutput: () => {
          const aggregatedOutput: AggregatedOutput = {};
          return aggregatedOutput;
        },
        constituentResultNormalizerList: [],
      },
    };

    return {
      andFromOdeshinVoictent: buildRightInputOdeshinVoictentAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>
      >(nextInputContext),
      andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>
      >(nextInputContext),

      toHubblepup: buildOutputHubblepupAppreffingeBuilder<
        TLeftVicken,
        NextVickenTuple<TRightVickenTuple, TRightInputVoictent>,
        OutputVickenTuple
      >(nextInputOutputContext),
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
