import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  InputOutputContext,
} from '../shared/programmedTransformBuilderContext';
import { PartialOutputStreamConfiguration } from '../shared/partialStreamConfiguration';
import {
  AdaptedTransformBuilderParent2,
  buildAdaptedTransformBuilder2,
} from '../pinbetunf/pinbetunfBuilder2';
import {
  AdaptedOutputStreamConnectionMetatype,
  GenericAdaptedLeftInputStreamConnectionMetatype,
  GenericAdaptedOutputStreamConnectionMetatypeTuple,
  GenericAdaptedRightInputStreamConnectionMetatypeTuple,
} from '../shared/streamConnectionMetatype';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildOutputItemTupleStreamConfigurationBuilder2,
  OutputItemTupleStreamConfigurationBuilderParent2,
} from './outputHubblepupTupleAppreffingeBuilder2';

type NextAdaptedOutputVickenTuple<
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
  TOutputVoque extends GenericStreamMetatype,
> = [
  ...TAdaptedOutputVickenTuple,
  AdaptedOutputStreamConnectionMetatype<
    TOutputVoque,
    TOutputVoque['itemEggStreamable']
  >,
];

/**
 * Builds the context needed to enable outputing a single hubblepup
 *
 * @readableName OutputItemStreamConfigurationBuilder
 */
type OutputHubblepupAppreffingeBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = <TOutputVoque extends GenericStreamMetatype>(
  partialOutputAppreffinge: PartialOutputStreamConfiguration<TOutputVoque>,
) => SpreadN<
  [
    AdaptedTransformBuilderParent2<
      TAdaptedLeftInputVicken,
      TAdaptedRightInputVickenTuple,
      NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
    >,

    OutputItemStreamConfigurationBuilderParent2<
      TAdaptedLeftInputVicken,
      TAdaptedRightInputVickenTuple,
      NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
    >,
    OutputItemTupleStreamConfigurationBuilderParent2<
      TAdaptedLeftInputVicken,
      TAdaptedRightInputVickenTuple,
      NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
    >,
  ]
>;

export const buildOutputItemStreamConfigurationBuilder2 = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
>(
  inputOutputContext: InputOutputContext,
): OutputHubblepupAppreffingeBuilder2<
  TAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple
> => {
  const buildOutputHubblepupAppreffinge2: OutputHubblepupAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  > = <TOutputVoque extends GenericStreamMetatype>(
    outputAppreffinge: PartialOutputStreamConfiguration<TOutputVoque>,
  ) => {
    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult: (leftInput, modifiedInput, aggregatedOutput) => {
        const hubblepup = aggregatedOutput[
          outputAppreffinge.collectionId
        ] as TOutputVoque['itemStreamable'];

        return [outputAppreffinge.collectionId, [hubblepup]];
      },
      outputCollectionId: outputAppreffinge.collectionId,
    });

    return {
      onTransform: buildAdaptedTransformBuilder2<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),

      toItem2: buildOutputItemStreamConfigurationBuilder2<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),
      toItemTuple2: buildOutputItemTupleStreamConfigurationBuilder2<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),
    };
  };

  return buildOutputHubblepupAppreffinge2;
};

export type OutputItemStreamConfigurationBuilderParent2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = {
  toItem2: OutputHubblepupAppreffingeBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  >;
};
