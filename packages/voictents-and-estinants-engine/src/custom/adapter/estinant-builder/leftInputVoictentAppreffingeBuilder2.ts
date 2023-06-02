import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from './estinantBuilderContext';
import {
  buildOutputHubblepupAppreffingeBuilder2,
  OutputHubblepupAppreffingeBuilderParent2,
} from './outputHubblepupAppreffingeBuilder2';
import { GenericVoque } from '../../../core/engine/voque';
import { AdaptedLeftInputVoictentVicken } from './vicken';
import { PartialLeftInputAppreffinge } from './partialAppreffinge';
import { SpreadN } from '../../../utilities/spreadN';
import {
  buildRightInputVoictentAppreffingeBuilder2,
  RightInputVoictentAppreffingeBuilderParent2,
} from './rightInputVoictentAppreffingeBuilder2';
import {
  buildOutputHubblepupTupleAppreffingeBuilder2,
  OutputHubblepupTupleAppreffingeBuilderParent2,
} from './outputHubblepupTupleAppreffingeBuilder2';
import {
  buildRightInputHubblepupTupleAppreffingeBuilder2,
  RightInputHubblepupTupleAppreffingeBuilderParent2,
} from './rightInputHubblepupTupleAppreffingeBuilder2';

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
