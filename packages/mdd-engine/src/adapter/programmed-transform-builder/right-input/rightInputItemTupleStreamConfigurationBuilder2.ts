import { GenericIndexedItemTuple } from '../../../core/types/item/item';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import {
  ComplexId,
  IdTuple2,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildInputOutputContextFromRightInputContext,
  InputOutputContext,
} from '../shared/programmedTransformBuilderContext';
import {
  buildOutputItemStreamConfigurationBuilder2,
  OutputItemStreamConfigurationBuilderParent2,
} from '../output/outputItemStreamConfigurationBuilder2';
import {
  buildOutputItemTupleStreamConfigurationBuilder2,
  OutputItemTupleStreamConfigurationBuilderParent2,
} from '../output/outputItemTupleStreamConfigurationBuilder2';
import { PartialRightItemTupleStreamConfiguration } from '../shared/partialStreamConfiguration';
import {
  AdaptedTransformBuilderParent2,
  buildAdaptedTransformBuilder2,
} from '../adapted-transform/adaptedTransformBuilder2';
import {
  buildRightInputCollectionStreamConfigurationBuilder2,
  RightInputCollectionStreamConfigurationBuilderParent2,
} from './rightInputCollectionStreamConfigurationBuilder2';
import {
  AdaptedRightInputItemTupleStreamConnectionMetatype,
  GenericAdaptedLeftInputStreamConnectionMetatype,
  GenericAdaptedRightInputStreamConnectionMetatypeTuple,
} from '../shared/streamConnectionMetatype';

type NextAdaptedRightInputStreamConnectionMetatypeTuple<
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TRightInputStreamMetatype extends GenericStreamMetatype,
  TIdTuple extends IdTuple2,
> = [
  ...TAdaptedRightInputStreamConnectionMetatypeTuple,
  AdaptedRightInputItemTupleStreamConnectionMetatype<
    TRightInputStreamMetatype,
    TIdTuple
  >,
];

type EmptyAdaptedOutputStreamConnectionMetatypeTuple = [];

/**
 * Constructs the context needed to build a right input stream connection for
 * zero or more items.
 *
 * @readableName RightInputItemTupleStreamConfigurationBuilder
 */
type RightInputItemTupleStreamConfigurationBuilder2<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
> = <
  TRightInputStreamMetatype extends GenericStreamMetatype,
  TIdTuple extends IdTuple2,
>(
  partialRightStreamConfiguration: PartialRightItemTupleStreamConfiguration<
    TAdaptedLeftInputStreamConnectionMetatype,
    TRightInputStreamMetatype,
    TIdTuple
  >,
) => SpreadN<
  [
    RightInputItemTupleStreamConfigurationBuilderParent2<
      TAdaptedLeftInputStreamConnectionMetatype,
      NextAdaptedRightInputStreamConnectionMetatypeTuple<
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        TRightInputStreamMetatype,
        TIdTuple
      >
    >,
    RightInputCollectionStreamConfigurationBuilderParent2<
      TAdaptedLeftInputStreamConnectionMetatype,
      NextAdaptedRightInputStreamConnectionMetatypeTuple<
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        TRightInputStreamMetatype,
        TIdTuple
      >
    >,

    AdaptedTransformBuilderParent2<
      TAdaptedLeftInputStreamConnectionMetatype,
      NextAdaptedRightInputStreamConnectionMetatypeTuple<
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        TRightInputStreamMetatype,
        TIdTuple
      >,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,

    OutputItemStreamConfigurationBuilderParent2<
      TAdaptedLeftInputStreamConnectionMetatype,
      NextAdaptedRightInputStreamConnectionMetatypeTuple<
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        TRightInputStreamMetatype,
        TIdTuple
      >,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,
    OutputItemTupleStreamConfigurationBuilderParent2<
      TAdaptedLeftInputStreamConnectionMetatype,
      NextAdaptedRightInputStreamConnectionMetatypeTuple<
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        TRightInputStreamMetatype,
        TIdTuple
      >,
      EmptyAdaptedOutputStreamConnectionMetatypeTuple
    >,
  ]
>;

export const buildRightInputItemTupleStreamConfigurationBuilder2 = <
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
>(
  inputOutputContext: InputOutputContext,
): RightInputItemTupleStreamConfigurationBuilder2<
  TAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple
> => {
  const buildRightInputItemTupleStreamConfiguration2: RightInputItemTupleStreamConfigurationBuilder2<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedRightInputStreamConnectionMetatypeTuple
  > = <
    TRightInputStreamMetatype extends GenericStreamMetatype,
    TIdTuple extends IdTuple2,
  >(
    partialRightStreamConfiguration: PartialRightItemTupleStreamConfiguration<
      TAdaptedLeftInputStreamConnectionMetatype,
      TRightInputStreamMetatype,
      TIdTuple
    >,
  ) => {
    const nextContext = buildInputOutputContextFromRightInputContext({
      previousContext: inputOutputContext,
      rightInputContext: {
        version: 2,
        collectionId: partialRightStreamConfiguration.collectionId,
        isCollectionStream: false,
        getRightKeyTuple: (
          leftInput: TAdaptedLeftInputStreamConnectionMetatype['coreTransformInput'],
        ) => {
          const list = partialRightStreamConfiguration
            .getRightKeyTuple(leftInput)
            .map((intermediateValue) => {
              if (intermediateValue instanceof ComplexId) {
                return intermediateValue.forHuman;
              }

              return intermediateValue;
            });

          return list;
        },
        getRightKey: (
          rightInput: TRightInputStreamMetatype['indexedItemStreamable'],
        ) => {
          const intermediateValue =
            partialRightStreamConfiguration.getRightKey(rightInput);
          if (intermediateValue instanceof ComplexId) {
            return intermediateValue.forHuman;
          }

          return intermediateValue;
        },
        modifyCoreTransformInput: (indexedItemTuple) => {
          return (indexedItemTuple as GenericIndexedItemTuple).map(
            (indexedItem) => {
              return indexedItem.item;
            },
          );
        },
      },
    });

    return {
      andFromItemTuple2: buildRightInputItemTupleStreamConfigurationBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        NextAdaptedRightInputStreamConnectionMetatypeTuple<
          TAdaptedRightInputStreamConnectionMetatypeTuple,
          TRightInputStreamMetatype,
          TIdTuple
        >
      >(nextContext),
      andFromCollection2: buildRightInputCollectionStreamConfigurationBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        NextAdaptedRightInputStreamConnectionMetatypeTuple<
          TAdaptedRightInputStreamConnectionMetatypeTuple,
          TRightInputStreamMetatype,
          TIdTuple
        >
      >(nextContext),

      onTransform: buildAdaptedTransformBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        NextAdaptedRightInputStreamConnectionMetatypeTuple<
          TAdaptedRightInputStreamConnectionMetatypeTuple,
          TRightInputStreamMetatype,
          TIdTuple
        >,
        EmptyAdaptedOutputStreamConnectionMetatypeTuple
      >(nextContext),

      toItem2: buildOutputItemStreamConfigurationBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        NextAdaptedRightInputStreamConnectionMetatypeTuple<
          TAdaptedRightInputStreamConnectionMetatypeTuple,
          TRightInputStreamMetatype,
          TIdTuple
        >,
        EmptyAdaptedOutputStreamConnectionMetatypeTuple
      >(nextContext),
      toItemTuple2: buildOutputItemTupleStreamConfigurationBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        NextAdaptedRightInputStreamConnectionMetatypeTuple<
          TAdaptedRightInputStreamConnectionMetatypeTuple,
          TRightInputStreamMetatype,
          TIdTuple
        >,
        EmptyAdaptedOutputStreamConnectionMetatypeTuple
      >(nextContext),
    };
  };

  return buildRightInputItemTupleStreamConfiguration2;
};

export type RightInputItemTupleStreamConfigurationBuilderParent2<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
> = {
  andFromItemTuple2: RightInputItemTupleStreamConfigurationBuilder2<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedRightInputStreamConnectionMetatypeTuple
  >;
};
