import { Voictent } from '../voictent';
import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import { hubblepupTupleToHubblepupTuple } from './tropoignantInputOutputModifier';
import { LeftVoictentVicken } from '../../../type-script-adapter/vicken';
import { buildInputOutputContextFromLeftInputContext } from './estinantBuilderContext';
import {
  buildRightInputVoictentAppreffingeBuilder,
  RightInputVoictentAppreffingeBuilderParent,
} from './rightInputVoictentAppreffingeBuilder';
import { LeftAppreffinge } from './leftInputHubblepupAppreffingeBuilder';
import {
  buildRightInputOdeshinVoictentAppreffingeBuilder,
  RightInputOdeshinVoictentAppreffingeBuilderParent,
} from './rightInputOdeshinVoictentAppreffingeBuilder';

type LeftVicken<TInputVoictent extends Voictent> =
  LeftVoictentVicken<TInputVoictent>;

type RightVickenTuple = [];

type OutputVickenTuple = [];

export type LeftInputVoictentAppreffingeBuilder = <
  TInputVoictent extends Voictent,
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

export const buildLeftInputVoictentAppreffingeBuilder = (
  estinantName: string,
): LeftInputVoictentAppreffingeBuilder => {
  const buildLeftInputVoictentAppreffinge: LeftInputVoictentAppreffingeBuilder =
    <TInputVoictent extends Voictent>(
      leftAppreffinge: LeftAppreffinge<TInputVoictent>,
    ) => {
      const nextContext = buildInputOutputContextFromLeftInputContext(
        estinantName,
        {
          gepp: leftAppreffinge.gepp,
          isWibiz: true,
          modifyTropoignantInput: hubblepupTupleToHubblepupTuple,
        },
      );

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

  return buildLeftInputVoictentAppreffinge;
};

export type LeftInputVoictentAppreffingeBuilderParent = {
  fromVoictent: LeftInputVoictentAppreffingeBuilder;
};
