import {
  buildOutputHubblepupAppreffingeBuilder,
  OutputHubblepupAppreffingeBuilderParent,
} from './outputHubblepupAppreffingeBuilder';
import { odeshinTupleToGritionTuple } from './tropoignantInputOutputModifier';
import { LeftOdeshinVoictentVicken } from '../../../type-script-adapter/vicken';
import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
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
import {
  buildOutputHubblepupTupleAppreffingeBuilder,
  OutputHubblepupTupleAppreffingeBuilderParent,
} from './outputHubblepupTupleAppreffingeBuilder';
import {
  buildOutputGritionAppreffingeBuilder,
  OutputGritionAppreffingeBuilderParent,
} from './outputGritionAppreffingeBuilder';
import {
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';
import {
  buildRightInputGritionTupleAppreffingeBuilder,
  RightInputGritionTupleAppreffingeBuilderParent,
} from './rightInputGritionTupleAppreffingeBuilder';

type LeftVicken<TInputVoictent extends OdeshinVoictent> =
  LeftOdeshinVoictentVicken<TInputVoictent>;

type RightVickenTuple = [];

type OutputVickenTuple = [];

export type LeftInputOdeshinVoictentAppreffingeBuilder = <
  TInputVoictent extends OdeshinVoictent,
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
  OutputGritionAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightVickenTuple,
    OutputVickenTuple
  > &
  OutputHubblepupAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightVickenTuple,
    OutputVickenTuple
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightVickenTuple,
    OutputVickenTuple
  >;

export const buildLeftInputOdeshinVoictentAppreffingeBuilder = (
  instantiationContext: InstantiationContext,
): LeftInputOdeshinVoictentAppreffingeBuilder => {
  const buildLeftInputOdeshinVoictentAppreffinge: LeftInputOdeshinVoictentAppreffingeBuilder =
    <TInputVoictent extends OdeshinVoictent>(
      leftAppreffinge: LeftAppreffinge<TInputVoictent>,
    ) => {
      const nextContext = buildInputOutputContextFromLeftInputContext({
        instantiationContext,
        leftInputContext: {
          gepp: leftAppreffinge.gepp,
          isWibiz: true,
          modifyTropoignantInput: odeshinTupleToGritionTuple,
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

        toGrition: buildOutputGritionAppreffingeBuilder<
          LeftVicken<TInputVoictent>,
          RightVickenTuple,
          OutputVickenTuple
        >(nextContext),
        toHubblepup: buildOutputHubblepupAppreffingeBuilder<
          LeftVicken<TInputVoictent>,
          RightVickenTuple,
          OutputVickenTuple
        >(nextContext),
        toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
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
