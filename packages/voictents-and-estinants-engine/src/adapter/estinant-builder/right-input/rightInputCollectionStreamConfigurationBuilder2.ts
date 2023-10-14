import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildInputOutputContextFromRightInputContext,
  InputOutputContext,
} from '../shared/programmedTransformBuilderContext';
import {
  buildOutputItemStreamConfigurationBuilder2,
  OutputItemStreamConfigurationBuilderParent2,
} from '../output/outputHubblepupAppreffingeBuilder2';
import {
  OutputItemTupleStreamConfigurationBuilderParent2,
  buildOutputItemTupleStreamConfigurationBuilder2,
} from '../output/outputHubblepupTupleAppreffingeBuilder2';
import { PartialRightCollectionStreamConfiguration } from '../shared/partialStreamConfiguration';
import {
  AdaptedRightInputCollectionStreamConnectionMetatype,
  GenericAdaptedLeftInputStreamConnectionMetatype,
  GenericAdaptedRightInputStreamConnectionMetatypeTuple,
} from '../shared/streamConnectionMetatype';
import {
  buildAdaptedTransformBuilder2,
  AdaptedTransformBuilderParent2,
} from '../pinbetunf/pinbetunfBuilder2';

type NextAdaptedRightInputStreamConnectionMetatypeTuple<
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TRightInputStreamMetatype extends GenericStreamMetatype,
> = [
  ...TAdaptedRightInputStreamConnectionMetatypeTuple,
  AdaptedRightInputCollectionStreamConnectionMetatype<TRightInputStreamMetatype>,
];

type EmptyAdaptedOutputStreamConnectionMetatypeTuple = [];

/**
 * Collects the context needed to construct a right input stream connection to
 * consume an entire collection.
 *
 * @readableName RightInputCollectionStreamConfigurationBuilder
 */
type RightInputCollectionStreamConfigurationBuilder2<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
> = <TRightInputStreamMetatype extends GenericStreamMetatype>(
  partialRightStreamConfiguration: PartialRightCollectionStreamConfiguration<TRightInputStreamMetatype>,
) => SpreadN<
  [
    RightInputCollectionStreamConfigurationBuilderParent2<
      TAdaptedLeftInputStreamConnectionMetatype,
      NextAdaptedRightInputStreamConnectionMetatypeTuple<
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        TRightInputStreamMetatype
      >
    >,

    AdaptedTransformBuilderParent2<
      TAdaptedLeftInputStreamConnectionMetatype,
      NextAdaptedRightInputStreamConnectionMetatypeTuple<
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        TRightInputStreamMetatype
      >,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,

    OutputItemStreamConfigurationBuilderParent2<
      TAdaptedLeftInputStreamConnectionMetatype,
      NextAdaptedRightInputStreamConnectionMetatypeTuple<
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        TRightInputStreamMetatype
      >,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,
    OutputItemTupleStreamConfigurationBuilderParent2<
      TAdaptedLeftInputStreamConnectionMetatype,
      NextAdaptedRightInputStreamConnectionMetatypeTuple<
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        TRightInputStreamMetatype
      >,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,
  ]
>;

export const buildRightInputCollectionStreamConfigurationBuilder2 = <
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
>(
  inputOutputContext: InputOutputContext,
): RightInputCollectionStreamConfigurationBuilder2<
  TAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple
> => {
  const buildRightInputItemStreamConfiguration: RightInputCollectionStreamConfigurationBuilder2<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedRightInputStreamConnectionMetatypeTuple
  > = <TRightInputStreamMetatype extends GenericStreamMetatype>(
    partialRightStreamConfiguration: PartialRightCollectionStreamConfiguration<TRightInputStreamMetatype>,
  ) => {
    const nextContext = buildInputOutputContextFromRightInputContext({
      previousContext: inputOutputContext,
      rightInputContext: {
        collectionId: partialRightStreamConfiguration.collectionId,
        isCollectionStream: true,
        modifyCoreTransformInput: (rightInput) => rightInput as unknown,
      },
    });

    return {
      andFromCollection2: buildRightInputCollectionStreamConfigurationBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        NextAdaptedRightInputStreamConnectionMetatypeTuple<
          TAdaptedRightInputStreamConnectionMetatypeTuple,
          TRightInputStreamMetatype
        >
      >(nextContext),

      onTransform: buildAdaptedTransformBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        NextAdaptedRightInputStreamConnectionMetatypeTuple<
          TAdaptedRightInputStreamConnectionMetatypeTuple,
          TRightInputStreamMetatype
        >,
        EmptyAdaptedOutputStreamConnectionMetatypeTuple
      >(nextContext),

      toItem2: buildOutputItemStreamConfigurationBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        NextAdaptedRightInputStreamConnectionMetatypeTuple<
          TAdaptedRightInputStreamConnectionMetatypeTuple,
          TRightInputStreamMetatype
        >,
        EmptyAdaptedOutputStreamConnectionMetatypeTuple
      >(nextContext),
      toItemTuple2: buildOutputItemTupleStreamConfigurationBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        NextAdaptedRightInputStreamConnectionMetatypeTuple<
          TAdaptedRightInputStreamConnectionMetatypeTuple,
          TRightInputStreamMetatype
        >,
        EmptyAdaptedOutputStreamConnectionMetatypeTuple
      >(nextContext),
    };
  };

  return buildRightInputItemStreamConfiguration;
};

export type RightInputCollectionStreamConfigurationBuilderParent2<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
> = {
  andFromCollection2: RightInputCollectionStreamConfigurationBuilder2<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedRightInputStreamConnectionMetatypeTuple
  >;
};
