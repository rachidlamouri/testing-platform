import {
  LeftVicken,
  OutputVoictentVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { StralineTuple } from '../../../utilities/semantic-types/straline';
import { Voictent } from '../voictent';
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
  buildOutputHubblepupTupleNormalizer,
  buildPinbetunfOutputAggregator,
} from './tropoignantInputOutputModifier';

type OutputAppreffinge<TOutputVoictent extends Voictent> = {
  gepp: TOutputVoictent['gepp'];
};

type OutputVickenTuple<TOutputVoictent extends Voictent> = [
  OutputVoictentVicken<TOutputVoictent>,
];

type OutputVoictentTuple<TOutputVoictent> = [TOutputVoictent];

type PinbetunfOutput<TOutputVoictent extends Voictent> =
  TOutputVoictent['hubblepupTuple'];

export type OutputHubblepupTupleAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = <TOutputVoictent extends Voictent>(
  outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
  // pinbe: Pinbetunf<[TInputVoictent['hubblepupTuple'][number]], unknown>,
) => AdditionalOutputHubblepupTupleAppreffingeBuilderParent<
  TLeftVicken,
  TRightVickenTuple,
  OutputVickenTuple<TOutputVoictent>,
  TPinbetunfInputTuple
> &
  PinbetunfBuilderParent<
    TLeftVicken,
    TRightVickenTuple,
    OutputVoictentTuple<TOutputVoictent>,
    TPinbetunfInputTuple,
    PinbetunfOutput<TOutputVoictent>
  >;
//   [TInputVoictent['hubblepupTuple'][number]]
// > &
// OutputVoictentBuilderParent<Virm<TInputVoictent, false>>;

export const buildOutputHubblepupTupleAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
>(
  inputContext: InputContext,
): OutputHubblepupTupleAppreffingeBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TPinbetunfInputTuple
> => {
  const buildOutputHubblepupTupleAppreffinge: OutputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  > = <TOutputVoictent extends Voictent>(
    outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
    // pinbe: Pinbetunf<[TInputVoictent['hubblepupTuple'][number]], unknown>,
  ) => {
    const nextContext: InputOutputContext = {
      inputContext,
      outputContext: {
        aggregatePinbetunfOutput: buildPinbetunfOutputAggregator(
          outputAppreffinge.gepp,
        ),
        constituentResultNormalizerList: [
          buildOutputHubblepupTupleNormalizer(outputAppreffinge.gepp),
        ],
      },
    };

    return {
      // andFromVoictent: buildRightInputVoictentBuilder(),
      // toVoictent: buildOutputVoictentBuilder({
      //   gepp,
      //   isWibiz: false,
      // }),
      // assemble: buildEstinantAssembler<Vition<TInputVoictent, []>, []>(
      //   {
      //     gepp,
      //     isWibiz: false,
      //     modifyTropoignantInput: hubblepupToHubblepup,
      //   },
      //   [],
      //   {
      //     normalizePinbetunfOutput: () => [],
      //   },
      //   pinbe,
      // ),
      andToHubblepupTuple:
        buildAdditionalOutputHubblepupTupleAppreffingeBuilder<
          TLeftVicken,
          TRightVickenTuple,
          OutputVickenTuple<TOutputVoictent>,
          TPinbetunfInputTuple
        >(nextContext),
      onPinbe: buildPinbetunfBuilder<
        TLeftVicken,
        TRightVickenTuple,
        OutputVoictentTuple<TOutputVoictent>,
        TPinbetunfInputTuple,
        PinbetunfOutput<TOutputVoictent>
      >(nextContext),
    };
  };

  return buildOutputHubblepupTupleAppreffinge;
};

export type OutputHubblepupTupleAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TPinbetunfInputTuple extends StralineTuple,
> = {
  toHubblepupTuple: OutputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TPinbetunfInputTuple
  >;
};
