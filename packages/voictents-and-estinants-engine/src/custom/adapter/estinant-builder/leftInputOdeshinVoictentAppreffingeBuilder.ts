import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import { odeshinTupleToGritionTuple } from './tropoignantInputOutputModifier';
import { LeftOdeshinVoictentVicken } from '../../../type-script-adapter/vicken';
import { buildInputOutputContextFromLeftInputContext } from './estinantBuilderContext';
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
        const nextContext = buildInputOutputContextFromLeftInputContext({
          gepp: leftAppreffinge.gepp,
          isWibiz: true,
          modifyTropoignantInput: odeshinTupleToGritionTuple,
        });

        return {
          andFromOdeshinVoictent:
            buildRightInputOdeshinVoictentAppreffingeBuilder<
              LeftVicken<TInputVoictent>,
              RightVickenTuple
            >(nextContext),
          andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightVickenTuple
          >(nextContext),

          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightVickenTuple,
            OutputVickenTuple
          >(nextContext),
        };
      };

    return buildLeftInputOdeshinVoictentAppreffinge;
  };

export type LeftInputOdeshinVoictentAppreffingeBuilderParent = {
  fromOdeshinVoictent: LeftInputOdeshinVoictentAppreffingeBuilder;
};
