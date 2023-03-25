import {
  AppendOutputVickenToTuple,
  LeftVicken,
  OutputHubblepupVicken,
  OutputVickenTuple,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { Voictent } from '../voictent';
import { InputOutputContext } from './estinantBuilderContext';
import {
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';
import {
  buildOutputHubblepupNormalizer,
  extendInputOutputContext,
} from './tropoignantInputOutputModifier';

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

export type AdditionalOutputHubblepupAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = <TOutputVoictent extends Voictent>(
  outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
) => PinbetunfBuilderParent<
  TLeftVicken,
  TRightVickenTuple,
  NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
>;

export const buildAdditionalOutputHubblepupAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): AdditionalOutputHubblepupAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TOutputVickenTuple
> => {
  const buildAdditionalOutputVoictentAppreffinge: AdditionalOutputHubblepupAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  > = <TOutputVoictent extends Voictent>(
    outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
  ) => {
    const nextContext = extendInputOutputContext(
      inputOutputContext,
      buildOutputHubblepupNormalizer(outputAppreffinge.gepp),
    );

    return {
      onPinbe: buildPinbetunfBuilder<
        TLeftVicken,
        TRightVickenTuple,
        NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
      >(nextContext),
    };
  };

  return buildAdditionalOutputVoictentAppreffinge;
};

export type AdditionalOutputHubblepupAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = {
  toHubblepup: AdditionalOutputHubblepupAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  >;
};
