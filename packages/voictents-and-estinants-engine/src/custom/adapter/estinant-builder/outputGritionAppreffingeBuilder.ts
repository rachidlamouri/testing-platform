import {
  LeftVicken,
  OutputGritionVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { OdeshinVoictent } from '../odeshinVoictent';
import { InputContext, InputOutputContext } from './estinantBuilderContext';
import {
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';
import {
  buildOutputGritionNormalizer,
  buildPinbetunfOutputAggregator,
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

type OutputVickenTuple<TOutputVoictent extends OdeshinVoictent> = [
  OutputVicken<TOutputVoictent>,
];

export type OutputGritionAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = <TOutputVoictent extends OdeshinVoictent>(
  outputAppreffinge: OutputAppreffinge<TLeftVicken, TOutputVoictent>,
) => PinbetunfBuilderParent<
  TLeftVicken,
  TRightVickenTuple,
  OutputVickenTuple<TOutputVoictent>
>;

export const buildOutputGritionAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
>(
  inputContext: InputContext,
): OutputGritionAppreffingeBuilder<TLeftVicken, TRightVickenTuple> => {
  const buildoutputGritionAppreffinge: OutputGritionAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
  > = <TOutputVoictent extends OdeshinVoictent>(
    outputAppreffinge: OutputAppreffinge<TLeftVicken, TOutputVoictent>,
  ) => {
    const nextContext: InputOutputContext = {
      inputContext,
      outputContext: {
        aggregatePinbetunfOutput: buildPinbetunfOutputAggregator(
          outputAppreffinge.gepp,
        ),
        constituentResultNormalizerList: [
          buildOutputGritionNormalizer(
            outputAppreffinge.gepp,
            outputAppreffinge.getZorn,
          ),
        ],
      },
    };

    return {
      onPinbe: buildPinbetunfBuilder<
        TLeftVicken,
        TRightVickenTuple,
        OutputVickenTuple<TOutputVoictent>
      >(nextContext),
    };
  };

  return buildoutputGritionAppreffinge;
};

export type OutputGritionAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = {
  toGrition: OutputGritionAppreffingeBuilder<TLeftVicken, TRightVickenTuple>;
};
