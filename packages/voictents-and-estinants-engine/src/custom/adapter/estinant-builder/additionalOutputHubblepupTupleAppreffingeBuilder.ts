import { UnionToIntersection, Simplify } from 'type-fest';
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

type OutputVoictentTuple<TOutputVoictent extends Voictent> = [TOutputVoictent];

type OutputVicken<TOutputVoictent extends Voictent> =
  OutputVoictentVicken<TOutputVoictent>;

type PinbetunfOutput2<TOutputVickenTuple extends OutputVickenTuple> = {
  [Index in keyof TOutputVickenTuple]: {
    [Key in TOutputVickenTuple[Index]['voictent']['gepp']]: TOutputVickenTuple[Index]['pinbeOutput'];
  };
}[number];

type PinbetunfOutput1<
  TOutputVickenTuple extends OutputVickenTuple,
  TOutputVoictent extends Voictent,
> = Simplify<
  UnionToIntersection<
    PinbetunfOutput2<
      AppendOutputVickenToTuple<
        TOutputVickenTuple,
        OutputVicken<TOutputVoictent>
      >
    >
  >
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
    OutputVoictentTuple<TOutputVoictent>,
    PinbetunfOutput1<TOutputVickenTuple, TOutputVoictent>
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
        OutputVoictentTuple<TOutputVoictent>,
        PinbetunfOutput1<TOutputVickenTuple, TOutputVoictent>
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
