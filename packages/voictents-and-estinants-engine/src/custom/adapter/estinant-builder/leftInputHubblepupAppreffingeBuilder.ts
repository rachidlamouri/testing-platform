import { LeftHubblepupVicken } from '../../../type-script-adapter/vicken';
import { VoictentToHubblepup } from '../../../type-script-adapter/voictent';
import { Voictent } from '../voictent';
import {
  AggregatedOutput,
  InputContext,
  InputOutputContext,
} from './estinantBuilderContext';
import {
  buildOutputGritionAppreffingeBuilder,
  OutputGritionAppreffingeBuilderParent,
} from './outputGritionAppreffingeBuilder';
import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import {
  buildOutputHubblepupTupleAppreffingeBuilder,
  OutputHubblepupTupleAppreffingeBuilderParent,
} from './outputHubblepupTupleAppreffingeBuilder';
import {
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';
import {
  buildRightInputGritionTupleAppreffingeBuilder,
  RightInputGritionTupleAppreffingeBuilderParent,
} from './rightInputGritionTupleAppreffingeBuilder';
import {
  buildRightInputHubblepupTupleAppreffingeBuilder,
  RightInputHubblepupTupleAppreffingeBuilderParent,
} from './rightInputHubblepupTupleAppreffingeBuilder';
import {
  buildRightInputVoictentAppreffingeBuilder,
  RightInputVoictentAppreffingeBuilderParent,
} from './rightInputVoictentAppreffingeBuilder';
import { hubblepupToHubblepup } from './tropoignantInputOutputModifier';

type LeftVicken<TInputVoictent extends Voictent> =
  LeftHubblepupVicken<TInputVoictent>;

type RightInputVickenTuple = [];

type PinbetunfInputTuple<TInputVoictent extends Voictent> = [
  VoictentToHubblepup<TInputVoictent>,
];

type OutputVoictentTuple = [];

type PinbetunfOutput = void;

export type LeftAppreffinge<TInputVoictent extends Voictent> = {
  gepp: TInputVoictent['gepp'];
};

export type LeftInputHubblepupAppreffingeBuilder = <
  TInputVoictent extends Voictent,
>(
  leftAppreffinge: LeftAppreffinge<TInputVoictent>,
) => RightInputGritionTupleAppreffingeBuilderParent<
  LeftHubblepupVicken<TInputVoictent>,
  RightInputVickenTuple,
  PinbetunfInputTuple<TInputVoictent>
> &
  RightInputHubblepupTupleAppreffingeBuilderParent<
    LeftHubblepupVicken<TInputVoictent>,
    RightInputVickenTuple,
    PinbetunfInputTuple<TInputVoictent>
  > &
  RightInputVoictentAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple,
    PinbetunfInputTuple<TInputVoictent>
  > &
  PinbetunfBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple,
    OutputVoictentTuple,
    PinbetunfInputTuple<TInputVoictent>,
    PinbetunfOutput
  > &
  OutputGritionAppreffingeBuilderParent<
    LeftHubblepupVicken<TInputVoictent>,
    RightInputVickenTuple,
    PinbetunfInputTuple<TInputVoictent>
  > &
  OutputHubblepupAppreffingeBuilderParent<
    LeftHubblepupVicken<TInputVoictent>,
    RightInputVickenTuple,
    PinbetunfInputTuple<TInputVoictent>
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    LeftHubblepupVicken<TInputVoictent>,
    RightInputVickenTuple,
    PinbetunfInputTuple<TInputVoictent>
  >;

export const buildLeftInputHubblepupAppreffingeBuilder =
  (): LeftInputHubblepupAppreffingeBuilder => {
    const buildLeftInputHubblepupAppreffinge: LeftInputHubblepupAppreffingeBuilder =
      <TInputVoictent extends Voictent>(
        leftAppreffinge: LeftAppreffinge<TInputVoictent>,
      ) => {
        const nextInputContext: InputContext = {
          leftInputContext: {
            gepp: leftAppreffinge.gepp,
            isWibiz: false,
            modifyTropoignantInput: hubblepupToHubblepup,
          },
          rightInputContextTuple: [],
        };

        const nextInputOutputContext: InputOutputContext = {
          inputContext: nextInputContext,
          outputContext: {
            aggregatePinbetunfOutput: () => {
              const aggregatedOutput: AggregatedOutput = {};
              return aggregatedOutput;
            },
            constituentResultNormalizerList: [],
          },
        };

        return {
          andFromGritionTuple: buildRightInputGritionTupleAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple,
            PinbetunfInputTuple<TInputVoictent>
          >(nextInputContext),
          andFromHubblepupTuple:
            buildRightInputHubblepupTupleAppreffingeBuilder<
              LeftHubblepupVicken<TInputVoictent>,
              RightInputVickenTuple,
              PinbetunfInputTuple<TInputVoictent>
            >(nextInputContext),
          andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple,
            PinbetunfInputTuple<TInputVoictent>
          >(nextInputContext),

          onPinbe: buildPinbetunfBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple,
            OutputVoictentTuple,
            PinbetunfInputTuple<TInputVoictent>,
            PinbetunfOutput
          >(nextInputOutputContext),

          toGrition: buildOutputGritionAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple,
            PinbetunfInputTuple<TInputVoictent>
          >(nextInputContext),
          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple,
            PinbetunfInputTuple<TInputVoictent>
          >(nextInputContext),
          toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple,
            PinbetunfInputTuple<TInputVoictent>
          >(nextInputContext),
        };
      };

    return buildLeftInputHubblepupAppreffinge;
  };

export type LeftInputHubblepupAppreffingeBuilderParent = {
  fromHubblepup: LeftInputHubblepupAppreffingeBuilder;
};
