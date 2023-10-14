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
  buildOutputHubblepupAppreffingeBuilder2,
  OutputHubblepupAppreffingeBuilderParent2,
} from '../output/outputHubblepupAppreffingeBuilder2';
import {
  buildOutputHubblepupTupleAppreffingeBuilder2,
  OutputHubblepupTupleAppreffingeBuilderParent2,
} from '../output/outputHubblepupTupleAppreffingeBuilder2';
import { PartialRightItemTupleStreamConfiguration } from '../shared/partialStreamConfiguration';
import {
  PinbetunfBuilderParent2,
  buildPinbetunfBuilder2,
} from '../pinbetunf/pinbetunfBuilder2';
import {
  buildRightInputVoictentAppreffingeBuilder2,
  RightInputVoictentAppreffingeBuilderParent2,
} from './rightInputVoictentAppreffingeBuilder2';
import {
  AdaptedRightInputItemTupleStreamConnectionMetatype,
  GenericAdaptedLeftInputStreamConnectionMetatype,
  GenericAdaptedRightInputStreamConnectionMetatypeTuple,
} from '../shared/streamConnectionMetatype';

type NextAdaptedRightInputVickenTuple<
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TRightInputVoque extends GenericStreamMetatype,
  TZornTuple extends IdTuple2,
> = [
  ...TAdaptedRightInputVickenTuple,
  AdaptedRightInputItemTupleStreamConnectionMetatype<
    TRightInputVoque,
    TZornTuple
  >,
];

type EmptyAdaptedOutputVickenTuple = [];

/**
 * Constructs the context needed to build a right input stream connection for
 * zero or more hubblepups.
 *
 * @readableName RightInputItemTupleStreamConfigurationBuilder
 */
type RightInputHubblepupTupleAppreffingeBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
> = <
  TRightInputVoque extends GenericStreamMetatype,
  TZornTuple extends IdTuple2,
>(
  partialRightAppreffinge: PartialRightItemTupleStreamConfiguration<
    TAdaptedLeftInputVicken,
    TRightInputVoque,
    TZornTuple
  >,
) => SpreadN<
  [
    RightInputHubblepupTupleAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque,
        TZornTuple
      >
    >,
    RightInputVoictentAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque,
        TZornTuple
      >
    >,

    PinbetunfBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque,
        TZornTuple
      >,
      EmptyAdaptedOutputVickenTuple
    >,

    OutputHubblepupAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque,
        TZornTuple
      >,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputHubblepupTupleAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque,
        TZornTuple
      >,
      EmptyAdaptedOutputVickenTuple
    >,
  ]
>;

export const buildRightInputHubblepupTupleAppreffingeBuilder2 = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
>(
  inputOutputContext: InputOutputContext,
): RightInputHubblepupTupleAppreffingeBuilder2<
  TAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple
> => {
  const buildRightInputHubblepupTupleAppreffinge2: RightInputHubblepupTupleAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple
  > = <
    TRightInputVoque extends GenericStreamMetatype,
    TZornTuple extends IdTuple2,
  >(
    partialRightAppreffinge: PartialRightItemTupleStreamConfiguration<
      TAdaptedLeftInputVicken,
      TRightInputVoque,
      TZornTuple
    >,
  ) => {
    const nextContext = buildInputOutputContextFromRightInputContext({
      previousContext: inputOutputContext,
      rightInputContext: {
        version: 2,
        collectionId: partialRightAppreffinge.collectionId,
        isCollectionStream: false,
        getRightKeyTuple: (
          leftInput: TAdaptedLeftInputVicken['coreTransformInput'],
        ) => {
          const list = partialRightAppreffinge
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
          rightInput: TRightInputVoque['indexedItemStreamable'],
        ) => {
          const intermediateValue =
            partialRightAppreffinge.getRightKey(rightInput);
          if (intermediateValue instanceof ComplexId) {
            return intermediateValue.forHuman;
          }

          return intermediateValue;
        },
        modifyCoreTransformInput: (indexedHubblepupTuple) => {
          return (indexedHubblepupTuple as GenericIndexedItemTuple).map(
            (indexedHubblepup) => {
              return indexedHubblepup.item;
            },
          );
        },
      },
    });

    return {
      andFromHubblepupTuple2: buildRightInputHubblepupTupleAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque,
          TZornTuple
        >
      >(nextContext),
      andFromVoictent2: buildRightInputVoictentAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque,
          TZornTuple
        >
      >(nextContext),

      onTransform: buildPinbetunfBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque,
          TZornTuple
        >,
        EmptyAdaptedOutputVickenTuple
      >(nextContext),

      toItem2: buildOutputHubblepupAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque,
          TZornTuple
        >,
        EmptyAdaptedOutputVickenTuple
      >(nextContext),
      toHubblepupTuple2: buildOutputHubblepupTupleAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque,
          TZornTuple
        >,
        EmptyAdaptedOutputVickenTuple
      >(nextContext),
    };
  };

  return buildRightInputHubblepupTupleAppreffinge2;
};

export type RightInputHubblepupTupleAppreffingeBuilderParent2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
> = {
  andFromHubblepupTuple2: RightInputHubblepupTupleAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple
  >;
};
