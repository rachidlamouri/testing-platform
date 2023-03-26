import { LeftGritionVicken } from '../../../type-script-adapter/vicken';
import { OdeshinVoictent } from '../odeshinVoictent';
import {
  AggregatedOutput,
  InputContext,
  InputOutputContext,
} from './estinantBuilderContext';
import { LeftAppreffinge } from './leftInputHubblepupAppreffingeBuilder';
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
  RightInputHubblepupTupleAppreffingeBuilderParent,
  buildRightInputHubblepupTupleAppreffingeBuilder,
} from './rightInputHubblepupTupleAppreffingeBuilder';
import {
  buildRightInputOdeshinVoictentAppreffingeBuilder,
  RightInputOdeshinVoictentAppreffingeBuilderParent,
} from './rightInputOdeshinVoictentAppreffingeBuilder';
import {
  buildRightInputVoictentAppreffingeBuilder,
  RightInputVoictentAppreffingeBuilderParent,
} from './rightInputVoictentAppreffingeBuilder';
import { odeshinToGrition } from './tropoignantInputOutputModifier';

type LeftVicken<TInputVoictent extends OdeshinVoictent> =
  LeftGritionVicken<TInputVoictent>;

type RightInputVickenTuple = [];

type OutputVickenTuple = [];

export type LeftInputGritionAppreffingeBuilder = <
  TInputVoictent extends OdeshinVoictent,
>(
  leftAppreffinge: LeftAppreffinge<TInputVoictent>,
) => RightInputHubblepupTupleAppreffingeBuilderParent<
  LeftVicken<TInputVoictent>,
  RightInputVickenTuple
> &
  RightInputOdeshinVoictentAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple
  > &
  RightInputVoictentAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple
  > &
  OutputGritionAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple
  > &
  OutputHubblepupAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple,
    OutputVickenTuple
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple,
    OutputVickenTuple
  >;

export const buildLeftInputGritionAppreffingeBuilder =
  (): LeftInputGritionAppreffingeBuilder => {
    const buildLeftInputGritionAppreffinge: LeftInputGritionAppreffingeBuilder =
      <TInputVoictent extends OdeshinVoictent>(
        leftAppreffinge: LeftAppreffinge<TInputVoictent>,
      ) => {
        const nextInputContext: InputContext = {
          leftInputContext: {
            gepp: leftAppreffinge.gepp,
            isWibiz: false,
            modifyTropoignantInput: odeshinToGrition,
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
          andFromHubblepupTuple:
            buildRightInputHubblepupTupleAppreffingeBuilder<
              LeftVicken<TInputVoictent>,
              RightInputVickenTuple
            >(nextInputContext),
          andFromOdeshinVoictent:
            buildRightInputOdeshinVoictentAppreffingeBuilder<
              LeftVicken<TInputVoictent>,
              RightInputVickenTuple
            >(nextInputContext),
          andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextInputContext),

          toGrition: buildOutputGritionAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextInputContext),
          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple,
            OutputVickenTuple
          >(nextInputOutputContext),
          toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple,
            OutputVickenTuple
          >(nextInputOutputContext),
        };
      };

    return buildLeftInputGritionAppreffinge;
  };

export type LeftInputGritionBuilderParent = {
  fromGrition: LeftInputGritionAppreffingeBuilder;
};
