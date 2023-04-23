import { Voictent } from '../voictent';
import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import { hubblepupTupleToHubblepupTuple } from './tropoignantInputOutputModifier';
import { LeftVoictentVicken } from '../../../type-script-adapter/vicken';
import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from './estinantBuilderContext';
import {
  buildRightInputVoictentAppreffingeBuilder,
  RightInputVoictentAppreffingeBuilderParent,
} from './rightInputVoictentAppreffingeBuilder';
import { LeftAppreffinge } from './leftInputHubblepupAppreffingeBuilder';
import {
  buildRightInputOdeshinVoictentAppreffingeBuilder,
  RightInputOdeshinVoictentAppreffingeBuilderParent,
} from './rightInputOdeshinVoictentAppreffingeBuilder';
import {
  buildRightInputGritionTupleAppreffingeBuilder,
  RightInputGritionTupleAppreffingeBuilderParent,
} from './rightInputGritionTupleAppreffingeBuilder';
import {
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';

type LeftVicken<TInputVoictent extends Voictent> =
  LeftVoictentVicken<TInputVoictent>;

type RightVickenTuple = [];

type OutputVickenTuple = [];

export type LeftInputVoictentAppreffingeBuilder = <
  TInputVoictent extends Voictent,
>(
  leftAppreffinge: LeftAppreffinge<TInputVoictent>,
) => RightInputGritionTupleAppreffingeBuilderParent<
  LeftVicken<TInputVoictent>,
  RightVickenTuple
> &
  RightInputOdeshinVoictentAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightVickenTuple
  > &
  RightInputVoictentAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightVickenTuple
  > &
  PinbetunfBuilderParent<
    LeftVicken<TInputVoictent>,
    RightVickenTuple,
    OutputVickenTuple
  > &
  OutputHubblepupAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightVickenTuple,
    OutputVickenTuple
  >;

export const buildLeftInputVoictentAppreffingeBuilder = (
  instantiationContext: InstantiationContext,
): LeftInputVoictentAppreffingeBuilder => {
  const buildLeftInputVoictentAppreffinge: LeftInputVoictentAppreffingeBuilder =
    <TInputVoictent extends Voictent>(
      leftAppreffinge: LeftAppreffinge<TInputVoictent>,
    ) => {
      const nextContext = buildInputOutputContextFromLeftInputContext({
        instantiationContext,
        leftInputContext: {
          gepp: leftAppreffinge.gepp,
          isWibiz: true,
          modifyTropoignantInput: hubblepupTupleToHubblepupTuple,
        },
      });

      return {
        andFromGritionTuple: buildRightInputGritionTupleAppreffingeBuilder<
          LeftVicken<TInputVoictent>,
          RightVickenTuple
        >(nextContext),
        andFromOdeshinVoictent:
          buildRightInputOdeshinVoictentAppreffingeBuilder<
            LeftVicken<TInputVoictent>,
            RightVickenTuple
          >(nextContext),
        andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
          LeftVicken<TInputVoictent>,
          RightVickenTuple
        >(nextContext),

        onPinbe: buildPinbetunfBuilder<
          LeftVicken<TInputVoictent>,
          RightVickenTuple,
          OutputVickenTuple
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
