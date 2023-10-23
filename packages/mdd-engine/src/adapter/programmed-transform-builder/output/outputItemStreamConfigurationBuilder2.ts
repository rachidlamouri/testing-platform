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
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildOutputItemTupleStreamConfigurationBuilder2,
  OutputItemTupleStreamConfigurationBuilderParent2,
} from './outputItemTupleStreamConfigurationBuilder2';

type NextAdaptedOutputStreamConnectionMetatypeTuple<
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
  TOutputStreamMetatype extends GenericStreamMetatype,
> = [
  ...TAdaptedOutputStreamConnectionMetatypeTuple,
  AdaptedOutputStreamConnectionMetatype<
    TOutputStreamMetatype,
    TOutputStreamMetatype['itemEggStreamable']
  >,
];

/**
 * Builds the context needed to enable outputing a single item
 *
 * @readableName OutputItemStreamConfigurationBuilder
 */
type OutputItemStreamConfigurationBuilder2<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = <TOutputStreamMetatype extends GenericStreamMetatype>(
  partialOutputStreamConfiguration: PartialOutputStreamConfiguration<TOutputStreamMetatype>,
) => SpreadN<
  [
    AdaptedTransformBuilderParent2<
      TAdaptedLeftInputStreamConnectionMetatype,
      TAdaptedRightInputStreamConnectionMetatypeTuple,
      NextAdaptedOutputStreamConnectionMetatypeTuple<
        TAdaptedOutputStreamConnectionMetatypeTuple,
        TOutputStreamMetatype
      >
    >,

    OutputItemStreamConfigurationBuilderParent2<
      TAdaptedLeftInputStreamConnectionMetatype,
      TAdaptedRightInputStreamConnectionMetatypeTuple,
      NextAdaptedOutputStreamConnectionMetatypeTuple<
        TAdaptedOutputStreamConnectionMetatypeTuple,
        TOutputStreamMetatype
      >
    >,
    OutputItemTupleStreamConfigurationBuilderParent2<
      TAdaptedLeftInputStreamConnectionMetatype,
      TAdaptedRightInputStreamConnectionMetatypeTuple,
      NextAdaptedOutputStreamConnectionMetatypeTuple<
        TAdaptedOutputStreamConnectionMetatypeTuple,
        TOutputStreamMetatype
      >
    >,
  ]
>;

export const buildOutputItemStreamConfigurationBuilder2 = <
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
>(
  inputOutputContext: InputOutputContext,
): OutputItemStreamConfigurationBuilder2<
  TAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple
> => {
  const buildOutputItemStreamConfiguration2: OutputItemStreamConfigurationBuilder2<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedRightInputStreamConnectionMetatypeTuple,
    TAdaptedOutputStreamConnectionMetatypeTuple
  > = <TOutputStreamMetatype extends GenericStreamMetatype>(
    outputStreamConfiguration: PartialOutputStreamConfiguration<TOutputStreamMetatype>,
  ) => {
    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult: (leftInput, modifiedInput, aggregatedOutput) => {
        const item = aggregatedOutput[
          outputStreamConfiguration.collectionId
        ] as TOutputStreamMetatype['itemStreamable'];

        return [outputStreamConfiguration.collectionId, [item]];
      },
      outputCollectionId: outputStreamConfiguration.collectionId,
    });

    return {
      onTransform: buildAdaptedTransformBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        NextAdaptedOutputStreamConnectionMetatypeTuple<
          TAdaptedOutputStreamConnectionMetatypeTuple,
          TOutputStreamMetatype
        >
      >(nextContext),

      toItem2: buildOutputItemStreamConfigurationBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        NextAdaptedOutputStreamConnectionMetatypeTuple<
          TAdaptedOutputStreamConnectionMetatypeTuple,
          TOutputStreamMetatype
        >
      >(nextContext),
      toItemTuple2: buildOutputItemTupleStreamConfigurationBuilder2<
        TAdaptedLeftInputStreamConnectionMetatype,
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        NextAdaptedOutputStreamConnectionMetatypeTuple<
          TAdaptedOutputStreamConnectionMetatypeTuple,
          TOutputStreamMetatype
        >
      >(nextContext),
    };
  };

  return buildOutputItemStreamConfiguration2;
};

export type OutputItemStreamConfigurationBuilderParent2<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = {
  toItem2: OutputItemStreamConfigurationBuilder2<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedRightInputStreamConnectionMetatypeTuple,
    TAdaptedOutputStreamConnectionMetatypeTuple
  >;
};
