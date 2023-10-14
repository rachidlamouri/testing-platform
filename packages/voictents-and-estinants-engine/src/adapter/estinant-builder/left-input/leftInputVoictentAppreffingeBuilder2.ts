import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from '../shared/programmedTransformBuilderContext';
import {
  buildOutputItemStreamConfigurationBuilder2,
  OutputItemStreamConfigurationBuilderParent2,
} from '../output/outputHubblepupAppreffingeBuilder2';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { AdaptedLeftInputCollectionStreamConnectionMetatype } from '../shared/streamConnectionMetatype';
import { PartialLeftInputStreamConfiguration } from '../shared/partialStreamConfiguration';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildRightInputCollectionStreamConfigurationBuilder2,
  RightInputCollectionStreamConfigurationBuilderParent2,
} from '../right-input/rightInputCollectionStreamConfigurationBuilder2';
import {
  buildOutputItemTupleStreamConfigurationBuilder2,
  OutputItemTupleStreamConfigurationBuilderParent2,
} from '../output/outputHubblepupTupleAppreffingeBuilder2';
import {
  buildRightInputItemTupleStreamConfigurationBuilder2,
  RightInputItemTupleStreamConfigurationBuilderParent2,
} from '../right-input/rightInputItemTupleStreamConfigurationBuilder2';
import {
  buildAdaptedTransformBuilder2,
  AdaptedTransformBuilderParent2,
} from '../pinbetunf/pinbetunfBuilder2';

type EmptyAdaptedRightInputVickenTuple = [];

type EmptyAdaptedOutputVickenTuple = [];

/**
 * Builds the left input context for an estinant that consumes the entire left
 * collection
 *
 * @readableName LeftInputCollectionStreamConfigurationBuilder
 */
type LeftInputVoictentAppreffingeBuilder2 = <
  TInputVoque extends GenericStreamMetatype,
>(
  partialLeftAppreffinge: PartialLeftInputStreamConfiguration<TInputVoque>,
) => SpreadN<
  [
    RightInputCollectionStreamConfigurationBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,
    RightInputItemTupleStreamConfigurationBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,

    AdaptedTransformBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,

    OutputItemStreamConfigurationBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputItemTupleStreamConfigurationBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,
  ]
>;

export const buildLeftInputVoictentAppreffingeBuilder2 = (
  instantiationContext: InstantiationContext,
): LeftInputVoictentAppreffingeBuilder2 => {
  const buildLeftInputVoictentAppreffinge: LeftInputVoictentAppreffingeBuilder2 =
    <TInputVoque extends GenericStreamMetatype>(
      partialLeftAppreffinge: PartialLeftInputStreamConfiguration<TInputVoque>,
    ) => {
      const nextContext = buildInputOutputContextFromLeftInputContext({
        instantiationContext,
        leftInputContext: {
          collectionId: partialLeftAppreffinge.collectionId,
          isCollectionStream: true,
          modifyCoreTransformInput: (leftInput) => leftInput as unknown,
        },
      });

      return {
        andFromCollection2:
          buildRightInputCollectionStreamConfigurationBuilder2<
            AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
            EmptyAdaptedRightInputVickenTuple
          >(nextContext),
        andFromItemTuple2: buildRightInputItemTupleStreamConfigurationBuilder2<
          AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple
        >(nextContext),

        onTransform: buildAdaptedTransformBuilder2<
          AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),

        toItem2: buildOutputItemStreamConfigurationBuilder2<
          AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),
        toItemTuple2: buildOutputItemTupleStreamConfigurationBuilder2<
          AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
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
