import {
  LeftVicken,
  OutputVoictentVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
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

type OutputVicken<TOutputVoictent extends Voictent> =
  OutputVoictentVicken<TOutputVoictent>;

type OutputVickenTuple<TOutputVoictent extends Voictent> = [
  OutputVicken<TOutputVoictent>,
];

export type OutputHubblepupTupleAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = <TOutputVoictent extends Voictent>(
  outputAppreffinge: OutputAppreffinge<TOutputVoictent>,
  // pinbe: Pinbetunf<[TInputVoictent['hubblepupTuple'][number]], unknown>,
) => AdditionalOutputHubblepupTupleAppreffingeBuilderParent<
  TLeftVicken,
  TRightVickenTuple,
  OutputVickenTuple<TOutputVoictent>
> &
  PinbetunfBuilderParent<
    TLeftVicken,
    TRightVickenTuple,
    OutputVickenTuple<TOutputVoictent>
  >;
//   [TInputVoictent['hubblepupTuple'][number]]
// > &
// OutputVoictentBuilderParent<Virm<TInputVoictent, false>>;

export const buildOutputHubblepupTupleAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
>(
  inputContext: InputContext,
): OutputHubblepupTupleAppreffingeBuilder<TLeftVicken, TRightVickenTuple> => {
  const buildOutputHubblepupTupleAppreffinge: OutputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
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
          OutputVickenTuple<TOutputVoictent>
        >(nextContext),
      onPinbe: buildPinbetunfBuilder<
        TLeftVicken,
        TRightVickenTuple,
        OutputVickenTuple<TOutputVoictent>
      >(nextContext),
    };
  };

  return buildOutputHubblepupTupleAppreffinge;
};

export type OutputHubblepupTupleAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = {
  toHubblepupTuple: OutputHubblepupTupleAppreffingeBuilder<
    TLeftVicken,
    TRightVickenTuple
  >;
};
