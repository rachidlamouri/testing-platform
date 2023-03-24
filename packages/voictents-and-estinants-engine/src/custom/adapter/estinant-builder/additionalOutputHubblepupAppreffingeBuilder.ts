import { Simplify, UnionToIntersection } from 'type-fest';
import {
  AppendOutputVickenToTuple,
  LeftVicken,
  OutputHubblepupVicken,
  OutputVickenTuple,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { StralineTuple } from '../../../utilities/semantic-types/straline';
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

type OutputVoictentTuple<TOutputVoictent> = [TOutputVoictent];

type OutputVicken<TOutputVoictent extends Voictent> =
  OutputHubblepupVicken<TOutputVoictent>;

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

export type AdditionalOutputHubblepupAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = <TOutputVoictent extends Voictent>(
  outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
) => PinbetunfBuilderParent<
  TLeftVicken,
  TRightVickenTuple,
  OutputVoictentTuple<TOutputVoictent>,
  TPinbetunfInputTuple,
  PinbetunfOutput1<TOutputVickenTuple, TOutputVoictent>
>;

export const buildAdditionalOutputHubblepupAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
>(
  inputOutputContext: InputOutputContext,
): AdditionalOutputHubblepupAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TOutputVickenTuple,
  TPinbetunfInputTuple
> => {
  const buildAdditionalOutputVoictentAppreffinge: AdditionalOutputHubblepupAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple,
    TPinbetunfInputTuple
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
        OutputVoictentTuple<TOutputVoictent>,
        TPinbetunfInputTuple,
        PinbetunfOutput1<TOutputVickenTuple, TOutputVoictent>
      >(nextContext),
    };
  };

  return buildAdditionalOutputVoictentAppreffinge;
};

export type AdditionalOutputHubblepupAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = {
  toHubblepup: AdditionalOutputHubblepupAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple,
    TPinbetunfInputTuple
  >;
};
