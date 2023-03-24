import {
  LeftVicken,
  OutputHubblepupVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { StralineTuple } from '../../../utilities/semantic-types/straline';
import { Voictent } from '../voictent';
import {
  AdditionalOutputHubblepupAppreffingeBuilderParent,
  buildAdditionalOutputHubblepupAppreffingeBuilder,
} from './additionalOutputHubblepupAppreffingeBuilder';
import {
  AdditionalOutputHubblepupTupleAppreffingeBuilderParent,
  buildAdditionalOutputHubblepupTupleAppreffingeBuilder,
} from './additionalOutputHubblepupTupleAppreffingeBuilder';
import { InputContext, InputOutputContext } from './estinantBuilderContext';
import {
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';
import {
  buildOutputHubblepupNormalizer,
  buildPinbetunfOutputAggregator,
} from './tropoignantInputOutputModifier';

type OutputAppreffinge<TOutputVoictent extends Voictent> = {
  gepp: TOutputVoictent['gepp'];
};

type OutputVoictentTuple<TOutputVoictent> = [TOutputVoictent];

type OutputVickenTuple<TOutputVoictent extends Voictent> = [
  OutputHubblepupVicken<TOutputVoictent>,
];

type PinbetunfOutput<TOutputVoictent extends Voictent> =
  TOutputVoictent['hubblepupTuple'][number];

export type OutputHubblepupAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = <TOutputVoictent extends Voictent>(
  outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
) => AdditionalOutputHubblepupAppreffingeBuilderParent<
  TLeftVicken,
  TRightVickenTuple,
  OutputVickenTuple<TOutputVoictent>,
  TPinbetunfInputTuple
> &
  AdditionalOutputHubblepupTupleAppreffingeBuilderParent<
    TLeftVicken,
    TRightVickenTuple,
    OutputVickenTuple<TOutputVoictent>,
    TPinbetunfInputTuple
  > &
  PinbetunfBuilderParent<
    TLeftVicken,
    TRightVickenTuple,
    OutputVoictentTuple<TOutputVoictent>,
    TPinbetunfInputTuple,
    PinbetunfOutput<TOutputVoictent>
  >;

export const buildOutputHubblepupAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
>(
  inputContext: InputContext,
): OutputHubblepupAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TPinbetunfInputTuple
> => {
  const buildOutputHubblepupAppreffinge: OutputHubblepupAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  > = <TOutputVoictent extends Voictent>(
    outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
  ) => {
    const nextContext: InputOutputContext = {
      inputContext,
      outputContext: {
        aggregatePinbetunfOutput: buildPinbetunfOutputAggregator(
          outputAppreffinge.gepp,
        ),
        constituentResultNormalizerList: [
          buildOutputHubblepupNormalizer(outputAppreffinge.gepp),
        ],
      },
    };

    return {
      toHubblepup: buildAdditionalOutputHubblepupAppreffingeBuilder<
        TLeftVicken,
        TRightVickenTuple,
        OutputVickenTuple<TOutputVoictent>,
        TPinbetunfInputTuple
      >(nextContext),
      andToHubblepupTuple:
        buildAdditionalOutputHubblepupTupleAppreffingeBuilder<
          TLeftVicken,
          TRightVickenTuple,
          OutputVickenTuple<TOutputVoictent>,
          TPinbetunfInputTuple
        >(nextContext),
      onPinbe: buildPinbetunfBuilder<
        TLeftVicken,
        TRightVickenTuple,
        OutputVoictentTuple<TOutputVoictent>,
        TPinbetunfInputTuple,
        PinbetunfOutput<TOutputVoictent>
      >(nextContext),
    };
  };

  return buildOutputHubblepupAppreffinge;
};

export type OutputHubblepupAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = {
  toHubblepup: OutputHubblepupAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  >;
};
