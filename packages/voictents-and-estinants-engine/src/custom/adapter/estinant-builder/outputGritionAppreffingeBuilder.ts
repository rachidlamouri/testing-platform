import {
  AppendOutputVickenToTuple,
  LeftVicken,
  OutputGritionVicken,
  OutputVickenTuple,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { OdeshinVoictent } from '../odeshinVoictent';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  InputOutputContext,
} from './estinantBuilderContext';
import {
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';
import {
  buildOutputGritionNormalizer,
  ZornAccessor,
} from './tropoignantInputOutputModifier';

type OutputAppreffinge<
  TLeftVicken extends LeftVicken,
  TOutputVoictent extends OdeshinVoictent,
> = {
  gepp: TOutputVoictent['gepp'];
  getZorn: ZornAccessor<TLeftVicken['tropoignantInput']>;
};

type OutputVicken<TOutputVoictent extends OdeshinVoictent> =
  OutputGritionVicken<TOutputVoictent>;

type NextOutputVickenTuple<
  TOutputVickenTuple extends OutputVickenTuple,
  TOutputVoictent extends OdeshinVoictent,
> = AppendOutputVickenToTuple<
  TOutputVickenTuple,
  OutputVicken<TOutputVoictent>
>;

export type OutputGritionAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = <TOutputVoictent extends OdeshinVoictent>(
  outputAppreffinge: OutputAppreffinge<TLeftVicken, TOutputVoictent>,
) => PinbetunfBuilderParent<
  TLeftVicken,
  TRightVickenTuple,
  NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
>;

export const buildOutputGritionAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): OutputGritionAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TOutputVickenTuple
> => {
  const buildoutputGritionAppreffinge: OutputGritionAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  > = <TOutputVoictent extends OdeshinVoictent>(
    outputAppreffinge: OutputAppreffinge<TLeftVicken, TOutputVoictent>,
  ) => {
    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult: buildOutputGritionNormalizer(
        outputAppreffinge.gepp,
        outputAppreffinge.getZorn,
      ),
      outputGepp: outputAppreffinge.gepp,
    });

    return {
      onPinbe: buildPinbetunfBuilder<
        TLeftVicken,
        TRightVickenTuple,
        NextOutputVickenTuple<TOutputVickenTuple, TOutputVoictent>
      >(nextContext),
    };
  };

  return buildoutputGritionAppreffinge;
};

export type OutputGritionAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = {
  toGrition: OutputGritionAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  >;
};
