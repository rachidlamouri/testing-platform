import {
  AppendOutputVickenToTuple,
  LeftVicken,
  OutputHubblepupVicken,
  OutputVickenTuple,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { Voictent } from '../voictent';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  InputOutputContext,
} from './estinantBuilderContext';
import {
  buildOutputHubblepupTupleAppreffingeBuilder,
  OutputHubblepupTupleAppreffingeBuilderParent,
} from './outputHubblepupTupleAppreffingeBuilder';
import {
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';
import { buildOutputHubblepupNormalizer } from './tropoignantInputOutputModifier';

type OutputAppreffinge<TOutputVoictent extends Voictent> = {
  gepp: TOutputVoictent['gepp'];
};

type OutputVicken<TOutputVoictent extends Voictent> =
  OutputHubblepupVicken<TOutputVoictent>;

type NextOutputVickenTuple<
  TOutputVickenTuple extends OutputVickenTuple,
  TOutputVoictent extends Voictent,
> = AppendOutputVickenToTuple<
  TOutputVickenTuple,
  OutputVicken<TOutputVoictent>
>;

export type OutputHubblepupAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = <TOutputVoictent extends Voictent>(
  outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
) => OutputHubblepupAppreffingeBuilderParent<
  TLeftVicken,
  TRightVickenTuple,
  NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
> &
  OutputHubblepupTupleAppreffingeBuilderParent<
    TLeftVicken,
    TRightVickenTuple,
    NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
  > &
  PinbetunfBuilderParent<
    TLeftVicken,
    TRightVickenTuple,
    NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
  >;

export const buildOutputHubblepupAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): OutputHubblepupAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TOutputVickenTuple
> => {
  const buildOutputHubblepupAppreffinge: OutputHubblepupAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  > = <TOutputVoictent extends Voictent>(
    outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
  ) => {
    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult: buildOutputHubblepupNormalizer(outputAppreffinge.gepp),
      outputGepp: outputAppreffinge.gepp,
    });

    return {
      toHubblepup: buildOutputHubblepupAppreffingeBuilder<
        TLeftVicken,
        TRightVickenTuple,
        NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
      >(nextContext),
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

  return buildOutputHubblepupAppreffinge;
};

export type OutputHubblepupAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = {
  toHubblepup: OutputHubblepupAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  >;
};
