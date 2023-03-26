import { LeftHubblepupVicken } from '../../../type-script-adapter/vicken';
import { Voictent } from '../voictent';
import { buildInputOutputContextFromLeftInputContext } from './estinantBuilderContext';
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
  buildPinbetunfBuilder,
  PinbetunfBuilderParent,
} from './pinbetunfBuilder';
import {
  buildRightInputGritionTupleAppreffingeBuilder,
  RightInputGritionTupleAppreffingeBuilderParent,
} from './rightInputGritionTupleAppreffingeBuilder';
import {
  buildRightInputHubblepupTupleAppreffingeBuilder,
  RightInputHubblepupTupleAppreffingeBuilderParent,
} from './rightInputHubblepupTupleAppreffingeBuilder';
import {
  buildRightInputVoictentAppreffingeBuilder,
  RightInputVoictentAppreffingeBuilderParent,
} from './rightInputVoictentAppreffingeBuilder';
import { hubblepupToHubblepup } from './tropoignantInputOutputModifier';

type LeftVicken<TInputVoictent extends Voictent> =
  LeftHubblepupVicken<TInputVoictent>;

type RightInputVickenTuple = [];

type OutputVickenTuple = [];

export type LeftAppreffinge<TInputVoictent extends Voictent> = {
  gepp: TInputVoictent['gepp'];
};

export type LeftInputHubblepupAppreffingeBuilder = <
  TInputVoictent extends Voictent,
>(
  leftAppreffinge: LeftAppreffinge<TInputVoictent>,
) => RightInputGritionTupleAppreffingeBuilderParent<
  LeftHubblepupVicken<TInputVoictent>,
  RightInputVickenTuple
> &
  RightInputHubblepupTupleAppreffingeBuilderParent<
    LeftHubblepupVicken<TInputVoictent>,
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
  OutputGritionAppreffingeBuilderParent<
    LeftHubblepupVicken<TInputVoictent>,
    RightInputVickenTuple
  > &
  OutputHubblepupAppreffingeBuilderParent<
    LeftHubblepupVicken<TInputVoictent>,
    RightInputVickenTuple,
    OutputVickenTuple
  > &
  OutputHubblepupTupleAppreffingeBuilderParent<
    LeftHubblepupVicken<TInputVoictent>,
    RightInputVickenTuple,
    OutputVickenTuple
  >;

export const buildLeftInputHubblepupAppreffingeBuilder =
  (): LeftInputHubblepupAppreffingeBuilder => {
    const buildLeftInputHubblepupAppreffinge: LeftInputHubblepupAppreffingeBuilder =
      <TInputVoictent extends Voictent>(
        leftAppreffinge: LeftAppreffinge<TInputVoictent>,
      ) => {
        const nextContext = buildInputOutputContextFromLeftInputContext({
          gepp: leftAppreffinge.gepp,
          isWibiz: false,
          modifyTropoignantInput: hubblepupToHubblepup,
        });

        return {
          andFromGritionTuple: buildRightInputGritionTupleAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextContext),
          andFromHubblepupTuple:
            buildRightInputHubblepupTupleAppreffingeBuilder<
              LeftHubblepupVicken<TInputVoictent>,
              RightInputVickenTuple
            >(nextContext),
          andFromVoictent: buildRightInputVoictentAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextContext),

          onPinbe: buildPinbetunfBuilder<
            LeftVicken<TInputVoictent>,
            RightInputVickenTuple,
            OutputVickenTuple
          >(nextContext),

          toGrition: buildOutputGritionAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple
          >(nextContext),
          toHubblepup: buildOutputHubblepupAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple,
            OutputVickenTuple
          >(nextContext),
          toHubblepupTuple: buildOutputHubblepupTupleAppreffingeBuilder<
            LeftHubblepupVicken<TInputVoictent>,
            RightInputVickenTuple,
            OutputVickenTuple
          >(nextContext),
        };
      };

    return buildLeftInputHubblepupAppreffinge;
  };

export type LeftInputHubblepupAppreffingeBuilderParent = {
  fromHubblepup: LeftInputHubblepupAppreffingeBuilder;
};
