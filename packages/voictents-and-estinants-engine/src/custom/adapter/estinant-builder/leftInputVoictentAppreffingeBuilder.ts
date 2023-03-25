import { Voictent } from '../voictent';
import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import { hubblepupTupleToHubblepupTuple } from './tropoignantInputOutputModifier';
import { LeftVoictentVicken } from '../../../type-script-adapter/vicken';
import { InputContext } from './estinantBuilderContext';
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
    RightVickenTuple
  >;

export const buildLeftInputVoictentAppreffingeBuilder =
  (): LeftInputVoictentAppreffingeBuilder => {
    const buildLeftInputVoictentAppreffinge: LeftInputVoictentAppreffingeBuilder =
      <TInputVoictent extends Voictent>(
        leftAppreffinge: LeftAppreffinge<TInputVoictent>,
      ) => {
        const nextContext: InputContext = {
          leftInputContext: {
            gepp: leftAppreffinge.gepp,
            isWibiz: true,
            modifyTropoignantInput: hubblepupTupleToHubblepupTuple,
          },
          rightInputContextTuple: [],
        };

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
            RightVickenTuple
          >(nextContext),
        };
      };

    return buildLeftInputVoictentAppreffinge;
  };

export type LeftInputVoictentAppreffingeBuilderParent = {
  fromVoictent: LeftInputVoictentAppreffingeBuilder;
};
