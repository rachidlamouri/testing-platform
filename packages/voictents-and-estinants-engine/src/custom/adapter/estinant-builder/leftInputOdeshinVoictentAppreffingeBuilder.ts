import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import { odeshinTupleToGritionTuple } from './tropoignantInputOutputModifier';
import { LeftVoictentVicken } from '../../../type-script-adapter/vicken';
import { InputContext } from './estinantBuilderContext';
import {
  buildRightInputVoictentAppreffingeBuilder,
  RightInputVoictentAppreffingeBuilderParent,
} from './rightInputVoictentAppreffingeBuilder';
import { LeftAppreffinge } from './leftInputHubblepupAppreffingeBuilder';
import { OdeshinVoictent } from '../odeshinVoictent';
import { Tuple } from '../../../utilities/semantic-types/tuple';
import {
  buildRightInputOdeshinVoictentAppreffingeBuilder,
  RightInputOdeshinVoictentAppreffingeBuilderParent,
} from './rightInputOdeshinVoictentAppreffingeBuilder';

type LeftVicken<TInputVoictent extends OdeshinVoictent> =
  LeftVoictentVicken<TInputVoictent>;

type RightVickenTuple = [];

type PinbetunfInputTuple<TInputVoictent extends OdeshinVoictent> = [
  // Note: don't use "OdeshinVoictentToGritionTuple" because it makes the final type harder to read :eyeroll:
  Tuple<TInputVoictent['hubblepupTuple'][number]['grition']>,
];

export type LeftInputOdeshinVoictentAppreffingeBuilder = <
  TInputVoictent extends OdeshinVoictent,
>(
  leftAppreffinge: LeftAppreffinge<TInputVoictent>,
) => RightInputOdeshinVoictentAppreffingeBuilderParent<
  LeftVicken<TInputVoictent>,
  RightVickenTuple,
  PinbetunfInputTuple<TInputVoictent>
> &
  RightInputVoictentAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightVickenTuple,
    PinbetunfInputTuple<TInputVoictent>
  > &
  OutputHubblepupAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightVickenTuple,
    PinbetunfInputTuple<TInputVoictent>
  >;

export const buildLeftInputOdeshinVoictentAppreffingeBuilder =
  (): LeftInputOdeshinVoictentAppreffingeBuilder => {
    const buildLeftInputOdeshinVoictentAppreffinge: LeftInputOdeshinVoictentAppreffingeBuilder =
      <TInputVoictent extends OdeshinVoictent>(
        leftAppreffinge: LeftAppreffinge<TInputVoictent>,
      ) => {
        const nextContext: InputContext = {
          leftInputContext: {
            gepp: leftAppreffinge.gepp,
            isWibiz: true,
            modifyTropoignantInput: odeshinTupleToGritionTuple,
          },
          rightInputContextTuple: [],
        };

        return {
          andFromOdeshinVoictent:
            buildRightInputOdeshinVoictentAppreffingeBuilder<
              LeftVicken<TInputVoictent>,
              RightVickenTuple,
              PinbetunfInputTuple<TInputVoictent>
            >(nextContext),
          andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightVickenTuple,
            PinbetunfInputTuple<TInputVoictent>
          >(nextContext),

          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightVickenTuple,
            PinbetunfInputTuple<TInputVoictent>
          >(nextContext),
        };
      };

    return buildLeftInputOdeshinVoictentAppreffinge;
  };

export type LeftInputOdeshinVoictentAppreffingeBuilderParent = {
  fromOdeshinVoictent: LeftInputOdeshinVoictentAppreffingeBuilder;
};
