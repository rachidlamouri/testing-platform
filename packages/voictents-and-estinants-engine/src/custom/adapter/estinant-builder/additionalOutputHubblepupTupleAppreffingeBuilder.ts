import {
  AppendOutputVickenToTuple,
  LeftVicken,
  OutputVickenTuple,
  OutputVoictentVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { Voictent } from '../voictent';
import { InputOutputContext } from './estinantBuilderContext';
import {
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';
import {
  buildOutputHubblepupTupleNormalizer,
  extendInputOutputContext,
} from './tropoignantInputOutputModifier';

type OutputAppreffinge<TOutputVoictent extends Voictent> = {
  gepp: TOutputVoictent['gepp'];
};

type OutputVicken<TOutputVoictent extends Voictent> =
  OutputVoictentVicken<TOutputVoictent>;

type NextOutputVickenTuple<
  TOutputVickenTuple extends OutputVickenTuple,
  TOutputVoictent extends Voictent,
> = AppendOutputVickenToTuple<
  TOutputVickenTuple,
  OutputVicken<TOutputVoictent>
>;

export type AdditionalOutputHubblepupTupleAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = <TOutputVoictent extends Voictent>(
  outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
) => AdditionalOutputHubblepupTupleAppreffingeBuilderParent<
  TLeftVicken,
  TRightVickenTuple,
  AppendOutputVickenToTuple<TOutputVickenTuple, OutputVicken<TOutputVoictent>>
> &
  PinbetunfBuilderParent<
    TLeftVicken,
    TRightVickenTuple,
    NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
  >;

export const buildAdditionalOutputHubblepupTupleAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): AdditionalOutputHubblepupTupleAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TOutputVickenTuple
> => {
  const buildAdditionalOutputHubblepupTupleAppreffinge: AdditionalOutputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  > = <TOutputVoictent extends Voictent>(
    outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
  ) => {
    const nextContext = extendInputOutputContext(
      inputOutputContext,
      buildOutputHubblepupTupleNormalizer(outputAppreffinge.gepp),
    );

    return {
      andToHubblepupTuple:
        buildAdditionalOutputHubblepupTupleAppreffingeBuilder<
          TLeftVicken,
          TRightVickenTuple,
          AppendOutputVickenToTuple<
            TOutputVickenTuple,
            OutputVicken<TOutputVoictent>
          >
        >(nextContext),
      onPinbe: buildPinbetunfBuilder<
        TLeftVicken,
        TRightVickenTuple,
        NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
      >(nextContext),
    };
  };

  return buildAdditionalOutputHubblepupTupleAppreffinge;
};

export type AdditionalOutputHubblepupTupleAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = {
  andToHubblepupTuple: AdditionalOutputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  >;
};
