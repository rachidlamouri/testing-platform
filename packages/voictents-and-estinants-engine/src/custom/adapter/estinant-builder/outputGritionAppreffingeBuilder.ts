import {
  LeftVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { StralineTuple } from '../../../utilities/semantic-types/straline';
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

type OutputVoictentTuple<TOutputVoictent extends OdeshinVoictent> = [
  TOutputVoictent,
];

type PinbetunfOutput<TOutputVoictent extends OdeshinVoictent> =
  TOutputVoictent['hubblepupTuple'][number]['grition'];

export type OutputGritionAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = <TOutputVoictent extends OdeshinVoictent>(
  outputAppreffinge: OutputAppreffinge<TLeftVicken, TOutputVoictent>,
) => PinbetunfBuilderParent<
  TLeftVicken,
  TRightVickenTuple,
  OutputVoictentTuple<TOutputVoictent>,
  TPinbetunfInputTuple,
  PinbetunfOutput<TOutputVoictent>
>;

export const buildOutputGritionAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
>(
  inputContext: InputContext,
): OutputGritionAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TPinbetunfInputTuple
> => {
  const buildoutputGritionAppreffinge: OutputGritionAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
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
        OutputVoictentTuple<TOutputVoictent>,
        TPinbetunfInputTuple,
        PinbetunfOutput<TOutputVoictent>
      >(nextContext),
    };
  };

  return buildoutputGritionAppreffinge;
};

export type OutputGritionAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = {
  toGrition: OutputGritionAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  >;
};
