import { LeftHubblepupVicken } from '../../../type-script-adapter/vicken';
import { OdeshinVoictent, OdeshinVoictentToGrition } from '../odeshinVoictent';
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
  LeftHubblepupVicken<TInputVoictent>;

type RightInputVickenTuple = [];

type PinbetunfInputTuple<TInputVoictent extends OdeshinVoictent> = [
  OdeshinVoictentToGrition<TInputVoictent>,
];

export type LeftInputGritionAppreffingeBuilder = <
  TInputVoictent extends OdeshinVoictent,
>(
  leftAppreffinge: LeftAppreffinge<TInputVoictent>,
) => RightInputHubblepupTupleAppreffingeBuilderParent<
  LeftVicken<TInputVoictent>,
  RightInputVickenTuple,
  PinbetunfInputTuple<TInputVoictent>
> &
  RightInputOdeshinVoictentAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple,
    PinbetunfInputTuple<TInputVoictent>
  > &
  RightInputVoictentAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple,
    PinbetunfInputTuple<TInputVoictent>
  > &
  OutputGritionAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple,
    PinbetunfInputTuple<TInputVoictent>
  > &
  OutputHubblepupAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple,
    PinbetunfInputTuple<TInputVoictent>
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple,
    PinbetunfInputTuple<TInputVoictent>
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
              RightInputVickenTuple,
              PinbetunfInputTuple<TInputVoictent>
            >(nextContext),
          andFromOdeshinVoictent:
            buildRightInputOdeshinVoictentAppreffingeBuilder<
              LeftVicken<TInputVoictent>,
              RightInputVickenTuple,
              PinbetunfInputTuple<TInputVoictent>
            >(nextContext),
          andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple,
            PinbetunfInputTuple<TInputVoictent>
          >(nextContext),

          toGrition: buildOutputGritionAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple,
            PinbetunfInputTuple<TInputVoictent>
          >(nextContext),
          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple,
            PinbetunfInputTuple<TInputVoictent>
          >(nextContext),
          toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple,
            PinbetunfInputTuple<TInputVoictent>
          >(nextContext),
        };
      };

    return buildLeftInputGritionAppreffinge;
  };

export type LeftInputGritionBuilderParent = {
  fromGrition: LeftInputGritionAppreffingeBuilder;
};
