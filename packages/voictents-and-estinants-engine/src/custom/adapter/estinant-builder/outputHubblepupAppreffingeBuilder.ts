import {
  LeftVicken,
  OutputHubblepupVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
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

type OutputVicken<TOutputVoictent extends Voictent> =
  OutputHubblepupVicken<TOutputVoictent>;

type OutputVickenTuple<TOutputVoictent extends Voictent> = [
  OutputVicken<TOutputVoictent>,
];

export type OutputHubblepupAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = <TOutputVoictent extends Voictent>(
  outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
) => AdditionalOutputHubblepupAppreffingeBuilderParent<
  TLeftVicken,
  TRightVickenTuple,
  OutputVickenTuple<TOutputVoictent>
> &
  AdditionalOutputHubblepupTupleAppreffingeBuilderParent<
    TLeftVicken,
    TRightVickenTuple,
    OutputVickenTuple<TOutputVoictent>
  > &
  PinbetunfBuilderParent<
    TLeftVicken,
    TRightVickenTuple,
    OutputVickenTuple<TOutputVoictent>
  >;

export const buildOutputHubblepupAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
>(
  inputContext: InputContext,
): OutputHubblepupAppreffingeBuilder<TLeftVicken, TRightVickenTuple> => {
  const buildOutputHubblepupAppreffinge: OutputHubblepupAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
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
        OutputVickenTuple<TOutputVoictent>
      >(nextContext),
      andToHubblepupTuple:
        buildAdditionalOutputHubblepupTupleAppreffingeBuilder<
          TLeftVicken,
          TRightVickenTuple,
          OutputVickenTuple<TOutputVoictent>
        >(nextContext),
      onPinbe: buildPinbetunfBuilder<
        TLeftVicken,
        TRightVickenTuple,
        OutputVickenTuple<TOutputVoictent>
      >(nextContext),
    };
  };

  return buildOutputHubblepupAppreffinge;
};

export type OutputHubblepupAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = {
  toHubblepup: OutputHubblepupAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
  >;
};
