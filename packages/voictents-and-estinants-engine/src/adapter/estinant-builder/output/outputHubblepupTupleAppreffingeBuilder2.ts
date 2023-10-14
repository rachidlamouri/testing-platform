import { Spread } from 'type-fest';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  InputOutputContext,
} from '../shared/programmedTransformBuilderContext';
import { PartialOutputStreamConfiguration } from '../shared/partialStreamConfiguration';
import {
  AdaptedTransformBuilderParent2,
  buildAdaptedTransformBuilder2,
} from '../adapted-transform/adaptedTransformBuilder2';
import {
  AdaptedOutputStreamConnectionMetatype,
  GenericAdaptedLeftInputStreamConnectionMetatype,
  GenericAdaptedOutputStreamConnectionMetatypeTuple,
  GenericAdaptedRightInputStreamConnectionMetatypeTuple,
} from '../shared/streamConnectionMetatype';

type NextAdaptedOutputVickenTuple<
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
  TOutputVoque extends GenericStreamMetatype,
> = [
  ...TAdaptedOutputVickenTuple,
  AdaptedOutputStreamConnectionMetatype<
    TOutputVoque,
    TOutputVoque['itemEggStreamable'][]
  >,
];

/**
 * Builds the context needed to output zero or more hubblepups
 *
 * @readableName OutputItemTupleStreamConfigurationBuilder
 */
type OutputHubblepupTupleAppreffingeBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = <TOutputVoque extends GenericStreamMetatype>(
  partialOutputAppreffinge: PartialOutputStreamConfiguration<TOutputVoque>,
) => Spread<
  OutputItemTupleStreamConfigurationBuilderParent2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
  >,
  AdaptedTransformBuilderParent2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
  >
>;

export const buildOutputItemTupleStreamConfigurationBuilder2 = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
>(
  inputOutputContext: InputOutputContext,
): OutputHubblepupTupleAppreffingeBuilder2<
  TAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple
> => {
  const buildOutputHubblepupTupleAppreffinge2: OutputHubblepupTupleAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  > = <TOutputVoque extends GenericStreamMetatype>(
    outputAppreffinge: PartialOutputStreamConfiguration<TOutputVoque>,
  ) => {
    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult: (leftInput, modifiedInput, aggregatedOutput) => {
        const hubblepupTuple = aggregatedOutput[
          outputAppreffinge.collectionId
        ] as TOutputVoque['collectionStreamable'];

        return [outputAppreffinge.collectionId, hubblepupTuple];
      },
      outputCollectionId: outputAppreffinge.collectionId,
    });

    return {
      toItemTuple2: buildOutputItemTupleStreamConfigurationBuilder2<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),
      onTransform: buildAdaptedTransformBuilder2<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),
    };
  };

  return buildOutputHubblepupTupleAppreffinge2;
};

export type OutputItemTupleStreamConfigurationBuilderParent2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = {
  toItemTuple2: OutputHubblepupTupleAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  >;
};
