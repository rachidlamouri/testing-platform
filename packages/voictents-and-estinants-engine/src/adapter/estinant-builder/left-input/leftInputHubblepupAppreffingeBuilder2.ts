import { GenericIndexedItem } from '../../../core/types/item/item';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from '../shared/programmedTransformBuilderContext';
import {
  buildOutputItemTupleStreamConfigurationBuilder2,
  OutputItemTupleStreamConfigurationBuilderParent2,
} from '../output/outputHubblepupTupleAppreffingeBuilder2';
import { PartialLeftInputStreamConfiguration } from '../shared/partialStreamConfiguration';
import {
  buildAdaptedTransformBuilder2,
  AdaptedTransformBuilderParent2,
} from '../pinbetunf/pinbetunfBuilder2';
import { AdaptedLeftInputItemStreamConnectionMetatype } from '../shared/streamConnectionMetatype';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildOutputHubblepupConditionalAppreffingeBuilder,
  OutputHubblepupConditionalAppreffingeBuilderParent,
} from '../output/outputHubblepupConditionalAppreffingeBuilder';
import {
  buildOutputItemStreamConfigurationBuilder2,
  OutputItemStreamConfigurationBuilderParent2,
} from '../output/outputHubblepupAppreffingeBuilder2';
import {
  buildRightInputItemTupleStreamConfigurationBuilder2,
  RightInputItemTupleStreamConfigurationBuilderParent2,
} from '../right-input/rightInputItemTupleStreamConfigurationBuilder2';
import {
  buildRightInputCollectionStreamConfigurationBuilder2,
  RightInputCollectionStreamConfigurationBuilderParent2,
} from '../right-input/rightInputCollectionStreamConfigurationBuilder2';

type EmptyAdaptedRightInputVickenTuple = [];

type EmptyAdaptedOutputVickenTuple = [];

/**
 * Builds the left input context for an estinant that consumes each item
 * from the left collection
 *
 * @readableName LeftInputItemStreamConfigurationBuilder
 */
type LeftInputHubblepupAppreffingeBuilder2 = <
  TInputVoque extends GenericStreamMetatype,
>(
  partialLeftInputAppreffinge: PartialLeftInputStreamConfiguration<TInputVoque>,
) => SpreadN<
  [
    RightInputItemTupleStreamConfigurationBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,
    RightInputCollectionStreamConfigurationBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,

    AdaptedTransformBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,

    OutputHubblepupConditionalAppreffingeBuilderParent<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputItemStreamConfigurationBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputItemTupleStreamConfigurationBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,
  ]
>;

export const buildLeftInputHubblepupAppreffingeBuilder2 = (
  instantiationContext: InstantiationContext,
): LeftInputHubblepupAppreffingeBuilder2 => {
  const buildLeftInputHubblepupAppreffinge: LeftInputHubblepupAppreffingeBuilder2 =
    <TInputVoque extends GenericStreamMetatype>(
      partialLeftInputAppreffinge: PartialLeftInputStreamConfiguration<TInputVoque>,
    ) => {
      const nextContext = buildInputOutputContextFromLeftInputContext({
        instantiationContext,
        leftInputContext: {
          version: 2,
          collectionId: partialLeftInputAppreffinge.collectionId,
          isCollectionStream: false,
          modifyCoreTransformInput: (indexedHubblepup: GenericIndexedItem) => {
            return indexedHubblepup.item;
          },
        },
      });

      return {
        andFromItemTuple2: buildRightInputItemTupleStreamConfigurationBuilder2<
          AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple
        >(nextContext),
        andFromCollection2:
          buildRightInputCollectionStreamConfigurationBuilder2<
            AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
            EmptyAdaptedRightInputVickenTuple
          >(nextContext),

        onTransform: buildAdaptedTransformBuilder2<
          AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),

        toHubblepupOnCondition:
          buildOutputHubblepupConditionalAppreffingeBuilder<
            AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
            EmptyAdaptedOutputVickenTuple
          >(nextContext),

        toItem2: buildOutputItemStreamConfigurationBuilder2<
          AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),
        toItemTuple2: buildOutputItemTupleStreamConfigurationBuilder2<
          AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),
      };
    };

  return buildLeftInputHubblepupAppreffinge;
};

export type LeftInputHubblepupAppreffingeBuilderParent2 = {
  fromItem2: LeftInputHubblepupAppreffingeBuilder2;
};
