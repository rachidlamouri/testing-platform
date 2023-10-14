import { GenericIndexedItem } from '../../../core/types/item/item';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from '../shared/programmedTransformBuilderContext';
import {
  buildOutputHubblepupTupleAppreffingeBuilder2,
  OutputHubblepupTupleAppreffingeBuilderParent2,
} from '../output/outputHubblepupTupleAppreffingeBuilder2';
import { PartialLeftInputStreamConfiguration } from '../shared/partialStreamConfiguration';
import {
  buildPinbetunfBuilder2,
  PinbetunfBuilderParent2,
} from '../pinbetunf/pinbetunfBuilder2';
import { AdaptedLeftInputItemStreamConnectionMetatype } from '../shared/streamConnectionMetatype';
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
type LeftInputHubblepupAppreffingeBuilder2 = <
  TInputVoque extends GenericStreamMetatype,
>(
  partialLeftInputAppreffinge: PartialLeftInputStreamConfiguration<TInputVoque>,
) => SpreadN<
  [
    RightInputHubblepupTupleAppreffingeBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,
    RightInputVoictentAppreffingeBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,

    PinbetunfBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,

    OutputHubblepupConditionalAppreffingeBuilderParent<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputHubblepupAppreffingeBuilderParent2<
      AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputHubblepupTupleAppreffingeBuilderParent2<
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
        andFromHubblepupTuple2:
          buildRightInputHubblepupTupleAppreffingeBuilder2<
            AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
            EmptyAdaptedRightInputVickenTuple
          >(nextContext),
        andFromVoictent2: buildRightInputVoictentAppreffingeBuilder2<
          AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple
        >(nextContext),

        onTransform: buildPinbetunfBuilder2<
          AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),

        toHubblepupOnCondition:
          buildOutputHubblepupConditionalAppreffingeBuilder<
            AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
            EmptyAdaptedOutputVickenTuple
          >(nextContext),

        toItem2: buildOutputHubblepupAppreffingeBuilder2<
          AdaptedLeftInputItemStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),
        toHubblepupTuple2: buildOutputHubblepupTupleAppreffingeBuilder2<
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
