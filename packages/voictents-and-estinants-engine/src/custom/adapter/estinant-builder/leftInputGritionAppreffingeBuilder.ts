import { LeftGritionVicken } from '../../../type-script-adapter/vicken';
import { OdeshinVoictent } from '../odeshinVoictent';
import { buildInputOutputContextFromLeftInputContext } from './estinantBuilderContext';
import { LeftAppreffinge } from './leftInputHubblepupAppreffingeBuilder';
import {
  buildOutputGritionAppreffingeBuilder,
  OutputGritionAppreffingeBuilderParent,
} from './outputGritionAppreffingeBuilder';
import {
  buildOutputGritionConditionalAppreffingeBuilder,
  OutputGritionConditionalAppreffingeBuilderParent,
} from './outputGritionConditionalAppreffingeBuilder';
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
  OutputGritionConditionalAppreffingeBuilderParent<LeftVicken<TInputVoictent>> &
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
        const nextContext = buildInputOutputContextFromLeftInputContext({
          gepp: leftAppreffinge.gepp,
          isWibiz: false,
          modifyTropoignantInput: odeshinToGrition,
        });

        return {
          andFromHubblepupTuple:
            buildRightInputHubblepupTupleAppreffingeBuilder<
              LeftVicken<TInputVoictent>,
              RightInputVickenTuple
            >(nextContext),
          andFromOdeshinVoictent:
            buildRightInputOdeshinVoictentAppreffingeBuilder<
              LeftVicken<TInputVoictent>,
              RightInputVickenTuple
            >(nextContext),
          andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextContext),

          toGritionOnCondition:
            buildOutputGritionConditionalAppreffingeBuilder<
              LeftVicken<TInputVoictent>
            >(nextContext),
          toGrition: buildOutputGritionAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextContext),
          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple,
            OutputVickenTuple
          >(nextContext),
          toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple,
            OutputVickenTuple
          >(nextContext),
        };
      };

    return buildLeftInputGritionAppreffinge;
  };

export type LeftInputGritionBuilderParent = {
  fromGrition: LeftInputGritionAppreffingeBuilder;
};
