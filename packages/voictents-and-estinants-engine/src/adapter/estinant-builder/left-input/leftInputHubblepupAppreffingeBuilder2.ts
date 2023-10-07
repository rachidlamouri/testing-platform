import { GenericIndexedHubblepup } from '../../../core/types/hubblepup/hubblepup';
import { GenericVoque } from '../../../core/types/voque/voque';
import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from '../shared/estinantBuilderContext';
import {
  buildOutputHubblepupTupleAppreffingeBuilder2,
  OutputHubblepupTupleAppreffingeBuilderParent2,
} from '../output/outputHubblepupTupleAppreffingeBuilder2';
import { PartialLeftInputAppreffinge } from '../shared/partialAppreffinge';
import {
  buildPinbetunfBuilder2,
  PinbetunfBuilderParent2,
} from '../pinbetunf/pinbetunfBuilder2';
import { AdaptedLeftInputHubblepupVicken } from '../shared/vicken';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildOutputHubblepupConditionalAppreffingeBuilder,
  OutputHubblepupConditionalAppreffingeBuilderParent,
} from '../output/outputHubblepupConditionalAppreffingeBuilder';
import {
  buildOutputHubblepupAppreffingeBuilder2,
  OutputHubblepupAppreffingeBuilderParent2,
} from '../output/outputHubblepupAppreffingeBuilder2';
import {
  buildRightInputHubblepupTupleAppreffingeBuilder2,
  RightInputHubblepupTupleAppreffingeBuilderParent2,
} from '../right-input/rightInputHubblepupTupleAppreffingeBuilder2';
import {
  buildRightInputVoictentAppreffingeBuilder2,
  RightInputVoictentAppreffingeBuilderParent2,
} from '../right-input/rightInputVoictentAppreffingeBuilder2';

type EmptyAdaptedRightInputVickenTuple = [];

type EmptyAdaptedOutputVickenTuple = [];

/**
 * Builds the left input context for an estinant that consumes each item
 * from the left collection
 *
 * @readableName LeftInputItemStreamConfigurationBuilder
 */
type LeftInputHubblepupAppreffingeBuilder2 = <TInputVoque extends GenericVoque>(
  partialLeftInputAppreffinge: PartialLeftInputAppreffinge<TInputVoque>,
) => SpreadN<
  [
    RightInputHubblepupTupleAppreffingeBuilderParent2<
      AdaptedLeftInputHubblepupVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,
    RightInputVoictentAppreffingeBuilderParent2<
      AdaptedLeftInputHubblepupVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,

    PinbetunfBuilderParent2<
      AdaptedLeftInputHubblepupVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,

    OutputHubblepupConditionalAppreffingeBuilderParent<
      AdaptedLeftInputHubblepupVicken<TInputVoque>,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputHubblepupAppreffingeBuilderParent2<
      AdaptedLeftInputHubblepupVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputHubblepupTupleAppreffingeBuilderParent2<
      AdaptedLeftInputHubblepupVicken<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,
  ]
>;

export const buildLeftInputHubblepupAppreffingeBuilder2 = (
  instantiationContext: InstantiationContext,
): LeftInputHubblepupAppreffingeBuilder2 => {
  const buildLeftInputHubblepupAppreffinge: LeftInputHubblepupAppreffingeBuilder2 =
    <TInputVoque extends GenericVoque>(
      partialLeftInputAppreffinge: PartialLeftInputAppreffinge<TInputVoque>,
    ) => {
      const nextContext = buildInputOutputContextFromLeftInputContext({
        instantiationContext,
        leftInputContext: {
          version: 2,
          gepp: partialLeftInputAppreffinge.gepp,
          isWibiz: false,
          modifyTropoignantInput: (
            indexedHubblepup: GenericIndexedHubblepup,
          ) => {
            return indexedHubblepup.hubblepup;
          },
        },
      });

      return {
        andFromHubblepupTuple2:
          buildRightInputHubblepupTupleAppreffingeBuilder2<
            AdaptedLeftInputHubblepupVicken<TInputVoque>,
            EmptyAdaptedRightInputVickenTuple
          >(nextContext),
        andFromVoictent2: buildRightInputVoictentAppreffingeBuilder2<
          AdaptedLeftInputHubblepupVicken<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple
        >(nextContext),

        onPinbe: buildPinbetunfBuilder2<
          AdaptedLeftInputHubblepupVicken<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),

        toHubblepupOnCondition:
          buildOutputHubblepupConditionalAppreffingeBuilder<
            AdaptedLeftInputHubblepupVicken<TInputVoque>,
            EmptyAdaptedOutputVickenTuple
          >(nextContext),

        toHubblepup2: buildOutputHubblepupAppreffingeBuilder2<
          AdaptedLeftInputHubblepupVicken<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),
        toHubblepupTuple2: buildOutputHubblepupTupleAppreffingeBuilder2<
          AdaptedLeftInputHubblepupVicken<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),
      };
    };

  return buildLeftInputHubblepupAppreffinge;
};

export type LeftInputHubblepupAppreffingeBuilderParent2 = {
  fromHubblepup2: LeftInputHubblepupAppreffingeBuilder2;
};
