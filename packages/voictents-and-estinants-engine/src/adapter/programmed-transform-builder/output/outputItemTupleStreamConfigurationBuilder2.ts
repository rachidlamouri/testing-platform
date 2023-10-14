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

type NextAdaptedOutputStreamConnectionMetatypeTuple<
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
  TOutputStreamMetatype extends GenericStreamMetatype,
> = [
  ...TAdaptedOutputStreamConnectionMetatypeTuple,
  AdaptedOutputStreamConnectionMetatype<
    TOutputStreamMetatype,
    TOutputStreamMetatype['itemEggStreamable'][]
  >,
];

/**
 * Builds the context needed to output zero or more hubblepups
 *
 * @readableName OutputItemTupleStreamConfigurationBuilder
 */
type OutputItemTupleStreamConfigurationBuilder2<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = <TOutputStreamMetatype extends GenericStreamMetatype>(
  partialOutputStreamConfiguration: PartialOutputStreamConfiguration<TOutputStreamMetatype>,
) => Spread<
  OutputItemTupleStreamConfigurationBuilderParent2<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedRightInputStreamConnectionMetatypeTuple,
    NextAdaptedOutputStreamConnectionMetatypeTuple<
      TAdaptedOutputStreamConnectionMetatypeTuple,
      TOutputStreamMetatype
    >
  >,
  AdaptedTransformBuilderParent2<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedRightInputStreamConnectionMetatypeTuple,
    NextAdaptedOutputStreamConnectionMetatypeTuple<
      TAdaptedOutputStreamConnectionMetatypeTuple,
      TOutputStreamMetatype
    >
  >
>;

export const buildOutputItemTupleStreamConfigurationBuilder2 = <
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
>(
  inputOutputContext: InputOutputContext,
): OutputItemTupleStreamConfigurationBuilder2<
  TAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple
> => {
  const buildOutputItemTupleStreamConfiguration2: OutputItemTupleStreamConfigurationBuilder2<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedRightInputStreamConnectionMetatypeTuple,
    TAdaptedOutputStreamConnectionMetatypeTuple
  > = <TOutputStreamMetatype extends GenericStreamMetatype>(
    outputStreamConfiguration: PartialOutputStreamConfiguration<TOutputStreamMetatype>,
  ) => {
    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult: (leftInput, modifiedInput, aggregatedOutput) => {
        const itemTuple = aggregatedOutput[
          outputStreamConfiguration.collectionId
        ] as TOutputStreamMetatype['collectionStreamable'];

        return [outputStreamConfiguration.collectionId, itemTuple];
      },
      outputCollectionId: outputStreamConfiguration.collectionId,
    });

    return {
      toItemTuple2: buildOutputItemTupleStreamConfigurationBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        NextAdaptedOutputStreamConnectionMetatypeTuple<
          TAdaptedOutputStreamConnectionMetatypeTuple,
          TOutputStreamMetatype
        >
      >(nextContext),
      onTransform: buildAdaptedTransformBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        NextAdaptedOutputStreamConnectionMetatypeTuple<
          TAdaptedOutputStreamConnectionMetatypeTuple,
          TOutputStreamMetatype
        >
      >(nextContext),
    };
  };

  return buildOutputItemTupleStreamConfiguration2;
};

export type OutputItemTupleStreamConfigurationBuilderParent2<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = {
  toItemTuple2: OutputItemTupleStreamConfigurationBuilder2<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedRightInputStreamConnectionMetatypeTuple,
    TAdaptedOutputStreamConnectionMetatypeTuple
  >;
};
