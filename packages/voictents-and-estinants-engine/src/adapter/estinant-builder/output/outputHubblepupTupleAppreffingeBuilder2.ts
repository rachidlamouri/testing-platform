import { Spread } from 'type-fest';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  InputOutputContext,
} from '../shared/programmedTransformBuilderContext';
import { PartialOutputStreamConfiguration } from '../shared/partialStreamConfiguration';
import {
  PinbetunfBuilderParent2,
  buildPinbetunfBuilder2,
} from '../pinbetunf/pinbetunfBuilder2';
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
  OutputHubblepupTupleAppreffingeBuilderParent2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
  >,
  PinbetunfBuilderParent2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
  >
>;

export const buildOutputHubblepupTupleAppreffingeBuilder2 = <
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
      toHubblepupTuple2: buildOutputHubblepupTupleAppreffingeBuilder2<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),
      onTransform: buildPinbetunfBuilder2<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),
    };
  };

  return buildOutputHubblepupTupleAppreffinge2;
};

export type OutputHubblepupTupleAppreffingeBuilderParent2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = {
  toHubblepupTuple2: OutputHubblepupTupleAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  >;
};
