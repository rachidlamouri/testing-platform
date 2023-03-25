import { LeftHubblepupVicken } from '../../../type-script-adapter/vicken';
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

type OutputVickenTuple = [];

export type LeftAppreffinge<TInputVoictent extends Voictent> = {
  gepp: TInputVoictent['gepp'];
};

export type LeftInputHubblepupAppreffingeBuilder = <
  TInputVoictent extends Voictent,
>(
  leftAppreffinge: LeftAppreffinge<TInputVoictent>,
) => RightInputGritionTupleAppreffingeBuilderParent<
  LeftHubblepupVicken<TInputVoictent>,
  RightInputVickenTuple
> &
  RightInputHubblepupTupleAppreffingeBuilderParent<
    LeftHubblepupVicken<TInputVoictent>,
    RightInputVickenTuple
  > &
  RightInputVoictentAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple
  > &
  PinbetunfBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple,
    OutputVickenTuple
  > &
  OutputGritionAppreffingeBuilderParent<
    LeftHubblepupVicken<TInputVoictent>,
    RightInputVickenTuple
  > &
  OutputHubblepupAppreffingeBuilderParent<
    LeftHubblepupVicken<TInputVoictent>,
    RightInputVickenTuple
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    LeftHubblepupVicken<TInputVoictent>,
    RightInputVickenTuple
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
            RightInputVickenTuple
          >(nextInputContext),
          andFromHubblepupTuple:
            buildRightInputHubblepupTupleAppreffingeBuilder<
              LeftHubblepupVicken<TInputVoictent>,
              RightInputVickenTuple
            >(nextInputContext),
          andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextInputContext),

          onPinbe: buildPinbetunfBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple,
            OutputVickenTuple
          >(nextInputOutputContext),

          toGrition: buildOutputGritionAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextInputContext),
          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextInputContext),
          toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextInputContext),
        };
      };

    return buildLeftInputHubblepupAppreffinge;
  };

export type LeftInputHubblepupAppreffingeBuilderParent = {
  fromHubblepup: LeftInputHubblepupAppreffingeBuilder;
};
