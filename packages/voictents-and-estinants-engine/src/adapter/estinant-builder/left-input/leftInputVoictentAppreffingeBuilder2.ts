import {
  buildInputOutputContextFromLeftInputContext,
  InstantiationContext,
} from '../shared/programmedTransformBuilderContext';
import {
  buildOutputHubblepupAppreffingeBuilder2,
  OutputHubblepupAppreffingeBuilderParent2,
} from '../output/outputHubblepupAppreffingeBuilder2';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { AdaptedLeftInputCollectionStreamConnectionMetatype } from '../shared/streamConnectionMetatype';
import { PartialLeftInputStreamConfiguration } from '../shared/partialStreamConfiguration';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildRightInputVoictentAppreffingeBuilder2,
  RightInputVoictentAppreffingeBuilderParent2,
} from '../right-input/rightInputVoictentAppreffingeBuilder2';
import {
  buildOutputHubblepupTupleAppreffingeBuilder2,
  OutputHubblepupTupleAppreffingeBuilderParent2,
} from '../output/outputHubblepupTupleAppreffingeBuilder2';
import {
  buildRightInputHubblepupTupleAppreffingeBuilder2,
  RightInputHubblepupTupleAppreffingeBuilderParent2,
} from '../right-input/rightInputHubblepupTupleAppreffingeBuilder2';
import {
  buildPinbetunfBuilder2,
  PinbetunfBuilderParent2,
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
    RightInputVoictentAppreffingeBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,
    RightInputHubblepupTupleAppreffingeBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple
    >,

    PinbetunfBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,

    OutputHubblepupAppreffingeBuilderParent2<
      AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
      EmptyAdaptedRightInputVickenTuple,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputHubblepupTupleAppreffingeBuilderParent2<
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
        andFromVoictent2: buildRightInputVoictentAppreffingeBuilder2<
          AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple
        >(nextContext),
        andFromHubblepupTuple2:
          buildRightInputHubblepupTupleAppreffingeBuilder2<
            AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
            EmptyAdaptedRightInputVickenTuple
          >(nextContext),

        onTransform: buildPinbetunfBuilder2<
          AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),

        toItem2: buildOutputHubblepupAppreffingeBuilder2<
          AdaptedLeftInputCollectionStreamConnectionMetatype<TInputVoque>,
          EmptyAdaptedRightInputVickenTuple,
          EmptyAdaptedOutputVickenTuple
        >(nextContext),
        toHubblepupTuple2: buildOutputHubblepupTupleAppreffingeBuilder2<
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
