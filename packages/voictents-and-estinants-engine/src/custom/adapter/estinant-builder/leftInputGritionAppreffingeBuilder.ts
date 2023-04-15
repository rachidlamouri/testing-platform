import { LeftGritionVicken } from '../../../type-script-adapter/vicken';
import { OdeshinVoictent } from '../odeshinVoictent';
import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from './estinantBuilderContext';
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
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';
import {
  buildRightInputGritionTupleAppreffingeBuilder,
  RightInputGritionTupleAppreffingeBuilderParent,
} from './rightInputGritionTupleAppreffingeBuilder';
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
) => RightInputGritionTupleAppreffingeBuilderParent<
  LeftVicken<TInputVoictent>,
  RightInputVickenTuple
> &
  RightInputHubblepupTupleAppreffingeBuilderParent<
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
  PinbetunfBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple,
    OutputVickenTuple
  > &
  OutputGritionConditionalAppreffingeBuilderParent<LeftVicken<TInputVoictent>> &
  OutputGritionAppreffingeBuilderParent<
    LeftVicken<TInputVoictent>,
    RightInputVickenTuple,
    OutputVickenTuple
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

export const buildLeftInputGritionAppreffingeBuilder = (
  instantiationContext: InstantiationContext,
): LeftInputGritionAppreffingeBuilder => {
  const buildLeftInputGritionAppreffinge: LeftInputGritionAppreffingeBuilder = <
    TInputVoictent extends OdeshinVoictent,
  >(
    leftAppreffinge: LeftAppreffinge<TInputVoictent>,
  ) => {
    const nextContext = buildInputOutputContextFromLeftInputContext({
      instantiationContext,
      leftInputContext: {
        gepp: leftAppreffinge.gepp,
        isWibiz: false,
        modifyTropoignantInput: odeshinToGrition,
      },
    });

    return {
      andFromGritionTuple: buildRightInputGritionTupleAppreffingeBuilder<
        LeftVicken<TInputVoictent>,
        RightInputVickenTuple
      >(nextContext),
      andFromHubblepupTuple: buildRightInputHubblepupTupleAppreffingeBuilder<
        LeftVicken<TInputVoictent>,
        RightInputVickenTuple
      >(nextContext),
      andFromOdeshinVoictent: buildRightInputOdeshinVoictentAppreffingeBuilder<
        LeftVicken<TInputVoictent>,
        RightInputVickenTuple
      >(nextContext),
      andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
        LeftVicken<TInputVoictent>,
        RightInputVickenTuple
      >(nextContext),

      onPinbe: buildPinbetunfBuilder<
        LeftVicken<TInputVoictent>,
        RightInputVickenTuple,
        OutputVickenTuple
      >(nextContext),

      toGritionOnCondition:
        buildOutputGritionConditionalAppreffingeBuilder<
          LeftVicken<TInputVoictent>
        >(nextContext),
      toGrition: buildOutputGritionAppreffingeBuilder<
        LeftVicken<TInputVoictent>,
        RightInputVickenTuple,
        OutputVickenTuple
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
