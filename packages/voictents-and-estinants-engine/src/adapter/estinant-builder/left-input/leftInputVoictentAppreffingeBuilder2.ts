import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from '../shared/estinantBuilderContext';
import {
  buildOutputHubblepupAppreffingeBuilder2,
  OutputHubblepupAppreffingeBuilderParent2,
} from '../output/outputHubblepupAppreffingeBuilder2';
import { GenericVoque } from '../../../core/engine/voque';
import { AdaptedLeftInputVoictentVicken } from '../shared/vicken';
import { PartialLeftInputAppreffinge } from '../shared/partialAppreffinge';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildRightInputVoictentAppreffingeBuilder2,
  RightInputVoictentAppreffingeBuilderParent2,
} from '../right-input/rightInputVoictentAppreffingeBuilder2';
import {
  buildOutputHubblepupTupleAppreffingeBuilder2,
  OutputHubblepupTupleAppreffingeBuilderParent2,
} from '../output/outputHubblepupTupleAppreffingeBuilder2';
import {
  buildRightInputHubblepupTupleAppreffingeBuilder2,
  RightInputHubblepupTupleAppreffingeBuilderParent2,
} from '../right-input/rightInputHubblepupTupleAppreffingeBuilder2';
import {
  buildPinbetunfBuilder2,
  PinbetunfBuilderParent2,
} from '../pinbetunf/pinbetunfBuilder2';

type EmptyAdaptedRightInputVickenTuple = [];

type EmptyAdaptedOutputVickenTuple = [];

type LeftInputVoictentAppreffingeBuilder2 = <TInputVoque extends GenericVoque>(
  partialLeftAppreffinge: PartialLeftInputAppreffinge<TInputVoque>,
) => SpreadN<
  [
    RightInputVoictentAppreffingeBuilderParent2<
      AdaptedLeftInputVoictentVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,
    RightInputHubblepupTupleAppreffingeBuilderParent2<
      AdaptedLeftInputVoictentVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,

    PinbetunfBuilderParent2<
      AdaptedLeftInputVoictentVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,

    OutputHubblepupAppreffingeBuilderParent2<
      AdaptedLeftInputVoictentVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputHubblepupTupleAppreffingeBuilderParent2<
      AdaptedLeftInputVoictentVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,
  ]
>;

export const buildLeftInputVoictentAppreffingeBuilder2 = (
  instantiationContext: InstantiationContext,
): LeftInputVoictentAppreffingeBuilder2 => {
  const buildLeftInputVoictentAppreffinge: LeftInputVoictentAppreffingeBuilder2 =
    <TInputVoque extends GenericVoque>(
      partialLeftAppreffinge: PartialLeftInputAppreffinge<TInputVoque>,
    ) => {
      const nextContext = buildInputOutputContextFromLeftInputContext({
        instantiationContext,
        leftInputContext: {
          gepp: partialLeftAppreffinge.gepp,
          isWibiz: true,
          modifyTropoignantInput: (leftInput) => leftInput as unknown,
        },
      });

      return {
        andFromVoictent2: buildRightInputVoictentAppreffingeBuilder2<
          AdaptedLeftInputVoictentVicken<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple
        >(nextContext),
        andFromHubblepupTuple2:
          buildRightInputHubblepupTupleAppreffingeBuilder2<
            AdaptedLeftInputVoictentVicken<TInputVoque>,
            EmptyAdaptedRightInputVickenTuple
          >(nextContext),

        onPinbe: buildPinbetunfBuilder2<
          AdaptedLeftInputVoictentVicken<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),

        toHubblepup2: buildOutputHubblepupAppreffingeBuilder2<
          AdaptedLeftInputVoictentVicken<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),
        toHubblepupTuple2: buildOutputHubblepupTupleAppreffingeBuilder2<
          AdaptedLeftInputVoictentVicken<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),
      };
    };

  return buildLeftInputVoictentAppreffinge;
};

export type LeftInputVoictentAppreffingeBuilderParent2 = {
  fromVoictent2: LeftInputVoictentAppreffingeBuilder2;
};
