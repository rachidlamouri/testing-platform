import {
  AppendOutputVickenToTuple,
  LeftVicken,
  OutputVickenTuple,
  OutputVoictentVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { Voictent } from '../voictent';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  InputOutputContext,
} from './estinantBuilderContext';
import {
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';
import { buildOutputHubblepupTupleNormalizer } from './tropoignantInputOutputModifier';

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

export type OutputHubblepupTupleAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = <TOutputVoictent extends Voictent>(
  outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
) => OutputHubblepupTupleAppreffingeBuilderParent<
  TLeftVicken,
  TRightVickenTuple,
  NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
> &
  PinbetunfBuilderParent<
    TLeftVicken,
    TRightVickenTuple,
    NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
  >;

export const buildOutputHubblepupTupleAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): OutputHubblepupTupleAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TOutputVickenTuple
> => {
  const buildOutputHubblepupTupleAppreffinge: OutputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  > = <TOutputVoictent extends Voictent>(
    outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
  ) => {
    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult: buildOutputHubblepupTupleNormalizer(
        outputAppreffinge.gepp,
      ),
      outputGepp: outputAppreffinge.gepp,
    });

    return {
      toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
        TLeftVicken,
        TRightVickenTuple,
        NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
      >(nextContext),
      onPinbe: buildPinbetunfBuilder<
        TLeftVicken,
        TRightVickenTuple,
        NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
      >(nextContext),
    };
  };

  return buildOutputHubblepupTupleAppreffinge;
};

export type OutputHubblepupTupleAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = {
  toHubblepupTuple: OutputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  >;
};
