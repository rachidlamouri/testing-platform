import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import { odeshinTupleToGritionTuple } from './tropoignantInputOutputModifier';
import { LeftOdeshinVoictentVicken } from '../../../type-script-adapter/vicken';
import {
  AggregatedOutput,
  InputContext,
  InputOutputContext,
} from './estinantBuilderContext';
import {
  buildRightInputVoictentAppreffingeBuilder,
  RightInputVoictentAppreffingeBuilderParent,
} from './rightInputVoictentAppreffingeBuilder';
import { LeftAppreffinge } from './leftInputHubblepupAppreffingeBuilder';
import { OdeshinVoictent } from '../odeshinVoictent';
import {
  buildRightInputOdeshinVoictentAppreffingeBuilder,
  RightInputOdeshinVoictentAppreffingeBuilderParent,
} from './rightInputOdeshinVoictentAppreffingeBuilder';

type LeftVicken<TInputVoictent extends OdeshinVoictent> =
  LeftOdeshinVoictentVicken<TInputVoictent>;

type RightVickenTuple = [];

type OutputVickenTuple = [];

export type LeftInputOdeshinVoictentAppreffingeBuilder = <
  TInputVoictent extends OdeshinVoictent,
>(
  leftAppreffinge: LeftAppreffinge<TInputVoictent>,
) => RightInputOdeshinVoictentAppreffingeBuilderParent<
  LeftVicken<TInputVoictent>,
  RightVickenTuple
> &
  RightInputVoictentAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightVickenTuple
  > &
  OutputHubblepupAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightVickenTuple,
    OutputVickenTuple
  >;

export const buildLeftInputOdeshinVoictentAppreffingeBuilder =
  (): LeftInputOdeshinVoictentAppreffingeBuilder => {
    const buildLeftInputOdeshinVoictentAppreffinge: LeftInputOdeshinVoictentAppreffingeBuilder =
      <TInputVoictent extends OdeshinVoictent>(
        leftAppreffinge: LeftAppreffinge<TInputVoictent>,
      ) => {
        const nextInputContext: InputContext = {
          leftInputContext: {
            gepp: leftAppreffinge.gepp,
            isWibiz: true,
            modifyTropoignantInput: odeshinTupleToGritionTuple,
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
          andFromOdeshinVoictent:
            buildRightInputOdeshinVoictentAppreffingeBuilder<
              LeftVicken<TInputVoictent>,
              RightVickenTuple
            >(nextInputContext),
          andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightVickenTuple
          >(nextInputContext),

          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightVickenTuple,
            OutputVickenTuple
          >(nextInputOutputContext),
        };
      };

    return buildLeftInputOdeshinVoictentAppreffinge;
  };

export type LeftInputOdeshinVoictentAppreffingeBuilderParent = {
  fromOdeshinVoictent: LeftInputOdeshinVoictentAppreffingeBuilder;
};
