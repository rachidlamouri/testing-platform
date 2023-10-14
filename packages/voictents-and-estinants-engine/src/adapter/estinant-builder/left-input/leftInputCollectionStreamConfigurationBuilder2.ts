import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from '../shared/programmedTransformBuilderContext';
import {
  buildOutputItemStreamConfigurationBuilder2,
  OutputItemStreamConfigurationBuilderParent2,
} from '../output/outputItemStreamConfigurationBuilder2';
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
} from '../output/outputItemTupleStreamConfigurationBuilder2';
import {
  buildRightInputItemTupleStreamConfigurationBuilder2,
  RightInputItemTupleStreamConfigurationBuilderParent2,
} from '../right-input/rightInputItemTupleStreamConfigurationBuilder2';
import {
  buildAdaptedTransformBuilder2,
  AdaptedTransformBuilderParent2,
} from '../adapted-transform/adaptedTransformBuilder2';

type EmptyAdaptedRightInputStreamConnectionMetatypeTuple = [];

type EmptyAdaptedOutputStreamConnectionMetatypeTuple = [];

/**
 * Builds the left input context for an estinant that consumes the entire left
 * collection
 *
 * @readableName LeftInputCollectionStreamConfigurationBuilder
 */
type LeftInputCollectionStreamConfigurationBuilder2 = <
  TInputStreamMetatype extends GenericStreamMetatype,
>(
  partialLeftStreamConfiguration: PartialLeftInputStreamConfiguration<TInputStreamMetatype>,
) => SpreadN<
  [
    RightInputCollectionStreamConfigurationBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputStreamMetatype>,
      EmptyAdaptedRightInputStreamConnectionMetatypeTuple
    >,
    RightInputItemTupleStreamConfigurationBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputStreamMetatype>,
      EmptyAdaptedRightInputStreamConnectionMetatypeTuple
    >,

    AdaptedTransformBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputStreamMetatype>,
      EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,

    OutputItemStreamConfigurationBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputStreamMetatype>,
      EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,
    OutputItemTupleStreamConfigurationBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputStreamMetatype>,
      EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,
  ]
>;

export const buildLeftInputCollectionStreamConfigurationBuilder2 = (
  instantiationContext: InstantiationContext,
): LeftInputCollectionStreamConfigurationBuilder2 => {
  const buildLeftInputCollectionStreamConfiguration: LeftInputCollectionStreamConfigurationBuilder2 =
    <TInputStreamMetatype extends GenericStreamMetatype>(
      partialLeftStreamConfiguration: PartialLeftInputStreamConfiguration<TInputStreamMetatype>,
    ) => {
      const nextContext = buildInputOutputContextFromLeftInputContext({
        instantiationContext,
        leftInputContext: {
          collectionId: partialLeftStreamConfiguration.collectionId,
          isCollectionStream: true,
          modifyCoreTransformInput: (leftInput) => leftInput as unknown,
        },
      });

      return {
        andFromCollection2:
          buildRightInputCollectionStreamConfigurationBuilder2<
            AdaptedLeftInputCollectionStreamConnectionMetatype<TInputStreamMetatype>,
            EmptyAdaptedRightInputStreamConnectionMetatypeTuple
          >(nextContext),
        andFromItemTuple2: buildRightInputItemTupleStreamConfigurationBuilder2<
          AdaptedLeftInputCollectionStreamConnectionMetatype<TInputStreamMetatype>,
          EmptyAdaptedRightInputStreamConnectionMetatypeTuple
        >(nextContext),

        onTransform: buildAdaptedTransformBuilder2<
          AdaptedLeftInputCollectionStreamConnectionMetatype<TInputStreamMetatype>,
          EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
          EmptyAdaptedOutputStreamConnectionMetatypeTuple
        >(nextContext),

        toItem2: buildOutputItemStreamConfigurationBuilder2<
          AdaptedLeftInputCollectionStreamConnectionMetatype<TInputStreamMetatype>,
          EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
          EmptyAdaptedOutputStreamConnectionMetatypeTuple
        >(nextContext),
        toItemTuple2: buildOutputItemTupleStreamConfigurationBuilder2<
          AdaptedLeftInputCollectionStreamConnectionMetatype<TInputStreamMetatype>,
          EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
          EmptyAdaptedOutputStreamConnectionMetatypeTuple
        >(nextContext),
      };
    };

  return buildLeftInputCollectionStreamConfiguration;
};

export type LeftInputCollectionStreamConfigurationBuilderParent2 = {
  fromCollection2: LeftInputCollectionStreamConfigurationBuilder2;
};
