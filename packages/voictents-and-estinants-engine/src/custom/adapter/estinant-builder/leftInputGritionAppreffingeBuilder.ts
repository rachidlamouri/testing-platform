import { LeftGritionVicken } from '../../../type-script-adapter/vicken';
import { OdeshinVoictent } from '../odeshinVoictent';
import { InputContext } from './estinantBuilderContext';
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
    RightInputVickenTuple
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple
  >;

export const buildLeftInputGritionAppreffingeBuilder =
  (): LeftInputGritionAppreffingeBuilder => {
    const buildLeftInputGritionAppreffinge: LeftInputGritionAppreffingeBuilder =
      <TInputVoictent extends OdeshinVoictent>(
        leftAppreffinge: LeftAppreffinge<TInputVoictent>,
      ) => {
        const nextContext: InputContext = {
          leftInputContext: {
            gepp: leftAppreffinge.gepp,
            isWibiz: false,
            modifyTropoignantInput: odeshinToGrition,
          },
          rightInputContextTuple: [],
        };

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

          toGrition: buildOutputGritionAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextContext),
          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextContext),
          toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextContext),
        };
      };

    return buildLeftInputGritionAppreffinge;
  };

export type LeftInputGritionBuilderParent = {
  fromGrition: LeftInputGritionAppreffingeBuilder;
};
