import { Spread } from 'type-fest';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  InputOutputContext,
} from '../shared/estinantBuilderContext';
import { PartialOutputAppreffinge } from '../shared/partialAppreffinge';
import {
  PinbetunfBuilderParent2,
  buildPinbetunfBuilder2,
} from '../pinbetunf/pinbetunfBuilder2';
import {
  AdaptedOutputVicken,
  GenericAdaptedLeftInputVicken,
  GenericAdaptedOutputVickenTuple,
  GenericAdaptedRightInputVickenTuple,
} from '../shared/vicken';

type NextAdaptedOutputVickenTuple<
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
  TOutputVoque extends GenericStreamMetatype,
> = [
  ...TAdaptedOutputVickenTuple,
  AdaptedOutputVicken<TOutputVoque, TOutputVoque['itemEggStreamable'][]>,
];

/**
 * Builds the context needed to output zero or more hubblepups
 *
 * @readableName OutputItemTupleStreamConfigurationBuilder
 */
type OutputHubblepupTupleAppreffingeBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = <TOutputVoque extends GenericStreamMetatype>(
  partialOutputAppreffinge: PartialOutputAppreffinge<TOutputVoque>,
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
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
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
    outputAppreffinge: PartialOutputAppreffinge<TOutputVoque>,
  ) => {
    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult: (leftInput, modifiedInput, aggregatedOutput) => {
        const hubblepupTuple = aggregatedOutput[
          outputAppreffinge.collectionId
        ] as TOutputVoque['collectionStreamable'];

        return [outputAppreffinge.collectionId, hubblepupTuple];
      },
      outputGepp: outputAppreffinge.collectionId,
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
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = {
  toHubblepupTuple2: OutputHubblepupTupleAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  >;
};
