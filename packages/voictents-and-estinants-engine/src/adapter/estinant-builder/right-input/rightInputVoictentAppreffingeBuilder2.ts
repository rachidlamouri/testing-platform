import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
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
  OutputHubblepupTupleAppreffingeBuilderParent2,
  buildOutputHubblepupTupleAppreffingeBuilder2,
} from '../output/outputHubblepupTupleAppreffingeBuilder2';
import { PartialRightCollectionStreamConfiguration } from '../shared/partialStreamConfiguration';
import {
  AdaptedRightInputCollectionStreamConnectionMetatype,
  GenericAdaptedLeftInputStreamConnectionMetatype,
  GenericAdaptedRightInputStreamConnectionMetatypeTuple,
} from '../shared/streamConnectionMetatype';
import {
  buildPinbetunfBuilder2,
  PinbetunfBuilderParent2,
} from '../pinbetunf/pinbetunfBuilder2';

type NextAdaptedRightInputVickenTuple<
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TRightInputVoque extends GenericStreamMetatype,
> = [
  ...TAdaptedRightInputVickenTuple,
  AdaptedRightInputCollectionStreamConnectionMetatype<TRightInputVoque>,
];

type EmptyAdaptedOutputVickenTuple = [];

/**
 * Collects the context needed to construct a right input stream connection to
 * consume an entire collection.
 *
 * @readableName RightInputCollectionStreamConfigurationBuilder
 */
type RightInputVoictentAppreffingeBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
> = <TRightInputVoque extends GenericStreamMetatype>(
  partialRightAppreffinge: PartialRightCollectionStreamConfiguration<TRightInputVoque>,
) => SpreadN<
  [
    RightInputVoictentAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque
      >
    >,

    PinbetunfBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque
      >,
      EmptyAdaptedOutputVickenTuple
    >,

    OutputHubblepupAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque
      >,
      EmptyAdaptedOutputVickenTuple
    >,
    OutputHubblepupTupleAppreffingeBuilderParent2<
      TAdaptedLeftInputVicken,
      NextAdaptedRightInputVickenTuple<
        TAdaptedRightInputVickenTuple,
        TRightInputVoque
      >,
      EmptyAdaptedOutputVickenTuple
    >,
  ]
>;

export const buildRightInputVoictentAppreffingeBuilder2 = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
>(
  inputOutputContext: InputOutputContext,
): RightInputVoictentAppreffingeBuilder2<
  TAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple
> => {
  const buildRightInputHubblepupAppreffinge: RightInputVoictentAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple
  > = <TRightInputVoque extends GenericStreamMetatype>(
    partialRightAppreffinge: PartialRightCollectionStreamConfiguration<TRightInputVoque>,
  ) => {
    const nextContext = buildInputOutputContextFromRightInputContext({
      previousContext: inputOutputContext,
      rightInputContext: {
        collectionId: partialRightAppreffinge.collectionId,
        isCollectionStream: true,
        modifyCoreTransformInput: (rightInput) => rightInput as unknown,
      },
    });

    return {
      andFromVoictent2: buildRightInputVoictentAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque
        >
      >(nextContext),

      onTransform: buildPinbetunfBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque
        >,
        EmptyAdaptedOutputVickenTuple
      >(nextContext),

      toItem2: buildOutputHubblepupAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque
        >,
        EmptyAdaptedOutputVickenTuple
      >(nextContext),
      toHubblepupTuple2: buildOutputHubblepupTupleAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        NextAdaptedRightInputVickenTuple<
          TAdaptedRightInputVickenTuple,
          TRightInputVoque
        >,
        EmptyAdaptedOutputVickenTuple
      >(nextContext),
    };
  };

  return buildRightInputHubblepupAppreffinge;
};

export type RightInputVoictentAppreffingeBuilderParent2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
> = {
  andFromVoictent2: RightInputVoictentAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple
  >;
};
