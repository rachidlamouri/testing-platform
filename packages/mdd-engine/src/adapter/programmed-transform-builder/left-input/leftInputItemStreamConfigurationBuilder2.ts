import { GenericIndexedItem } from '../../../core/types/item/item';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from '../shared/programmedTransformBuilderContext';
import {
  buildOutputItemTupleStreamConfigurationBuilder2,
  OutputItemTupleStreamConfigurationBuilderParent2,
} from '../output/outputItemTupleStreamConfigurationBuilder2';
import { PartialLeftInputStreamConfiguration } from '../shared/partialStreamConfiguration';
import {
  buildAdaptedTransformBuilder2,
  AdaptedTransformBuilderParent2,
} from '../adapted-transform/adaptedTransformBuilder2';
import { AdaptedLeftInputItemStreamConnectionMetatype } from '../shared/streamConnectionMetatype';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildOutputItemConditionalStreamConfigurationBuilder,
  OutputItemConditionalStreamConfigurationBuilderParent,
} from '../output/outputItemConditionalStreamConfigurationBuilder';
import {
  buildOutputItemStreamConfigurationBuilder2,
  OutputItemStreamConfigurationBuilderParent2,
} from '../output/outputItemStreamConfigurationBuilder2';
import {
  buildRightInputItemTupleStreamConfigurationBuilder2,
  RightInputItemTupleStreamConfigurationBuilderParent2,
} from '../right-input/rightInputItemTupleStreamConfigurationBuilder2';
import {
  buildRightInputCollectionStreamConfigurationBuilder2,
  RightInputCollectionStreamConfigurationBuilderParent2,
} from '../right-input/rightInputCollectionStreamConfigurationBuilder2';

type EmptyAdaptedRightInputStreamConnectionMetatypeTuple = [];

type EmptyAdaptedOutputStreamConnectionMetatypeTuple = [];

/**
 * Builds the left input context for a programmed transform that consumes each item
 * from the left collection
 *
 * @readableName LeftInputItemStreamConfigurationBuilder
 */
type LeftInputItemStreamConfigurationBuilder2 = <
  TInputStreamMetatype extends GenericStreamMetatype,
>(
  partialLeftInputStreamConfiguration: PartialLeftInputStreamConfiguration<TInputStreamMetatype>,
) => SpreadN<
  [
    RightInputItemTupleStreamConfigurationBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputStreamMetatype>,
      EmptyAdaptedRightInputStreamConnectionMetatypeTuple
    >,
    RightInputCollectionStreamConfigurationBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputStreamMetatype>,
      EmptyAdaptedRightInputStreamConnectionMetatypeTuple
    >,

    AdaptedTransformBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputStreamMetatype>,
      EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,

    OutputItemConditionalStreamConfigurationBuilderParent<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputStreamMetatype>,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,
    OutputItemStreamConfigurationBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputStreamMetatype>,
      EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,
    OutputItemTupleStreamConfigurationBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputStreamMetatype>,
      EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,
  ]
>;

export const buildLeftInputItemStreamConfigurationBuilder2 = (
  instantiationContext: InstantiationContext,
): LeftInputItemStreamConfigurationBuilder2 => {
  const buildLeftInputItemStreamConfiguration: LeftInputItemStreamConfigurationBuilder2 =
    <TInputStreamMetatype extends GenericStreamMetatype>(
      partialLeftInputStreamConfiguration: PartialLeftInputStreamConfiguration<TInputStreamMetatype>,
    ) => {
      const nextContext = buildInputOutputContextFromLeftInputContext({
        instantiationContext,
        leftInputContext: {
          version: 2,
          collectionId: partialLeftInputStreamConfiguration.collectionId,
          isCollectionStream: false,
          modifyCoreTransformInput: (indexedItem: GenericIndexedItem) => {
            return indexedItem.item;
          },
        },
      });

      return {
        andFromItemTuple2: buildRightInputItemTupleStreamConfigurationBuilder2<
          AdaptedLeftInputItemStreamConnectionMetatype<TInputStreamMetatype>,
          EmptyAdaptedRightInputStreamConnectionMetatypeTuple
        >(nextContext),
        andFromCollection2:
          buildRightInputCollectionStreamConfigurationBuilder2<
            AdaptedLeftInputItemStreamConnectionMetatype<TInputStreamMetatype>,
            EmptyAdaptedRightInputStreamConnectionMetatypeTuple
          >(nextContext),

        onTransform: buildAdaptedTransformBuilder2<
          AdaptedLeftInputItemStreamConnectionMetatype<TInputStreamMetatype>,
          EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
          EmptyAdaptedOutputStreamConnectionMetatypeTuple
        >(nextContext),

        toItemOnCondition: buildOutputItemConditionalStreamConfigurationBuilder<
          AdaptedLeftInputItemStreamConnectionMetatype<TInputStreamMetatype>,
          EmptyAdaptedOutputStreamConnectionMetatypeTuple
        >(nextContext),

        toItem2: buildOutputItemStreamConfigurationBuilder2<
          AdaptedLeftInputItemStreamConnectionMetatype<TInputStreamMetatype>,
          EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
          EmptyAdaptedOutputStreamConnectionMetatypeTuple
        >(nextContext),
        toItemTuple2: buildOutputItemTupleStreamConfigurationBuilder2<
          AdaptedLeftInputItemStreamConnectionMetatype<TInputStreamMetatype>,
          EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
          EmptyAdaptedOutputStreamConnectionMetatypeTuple
        >(nextContext),
      };
    };

  return buildLeftInputItemStreamConfiguration;
};

export type LeftInputItemStreamConfigurationBuilderParent2 = {
  fromItem2: LeftInputItemStreamConfigurationBuilder2;
};
