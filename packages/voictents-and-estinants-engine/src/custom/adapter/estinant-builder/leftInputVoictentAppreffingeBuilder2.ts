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

type EmptyAdaptedRightInputVickenTuple = [];

type EmptyAdaptedOutputVickenTuple = [];

export type LeftInputVoictentAppreffingeBuilder2 = <
  TInputVoque extends GenericVoque,
>(
  partialLeftAppreffinge: PartialLeftInputAppreffinge<TInputVoque>,
) => OutputHubblepupAppreffingeBuilderParent2<
  AdaptedLeftInputVoictentVicken<TInputVoque>,
  EmptyAdaptedRightInputVickenTuple,
  EmptyAdaptedOutputVickenTuple
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
        toHubblepup2: buildOutputHubblepupAppreffingeBuilder2<
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
