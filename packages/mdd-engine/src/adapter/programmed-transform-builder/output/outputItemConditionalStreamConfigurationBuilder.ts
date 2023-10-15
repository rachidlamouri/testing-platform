import { Item } from '../../../core/types/item/item';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { Predicate } from '../../../package-agnostic-utilities/function/predicate';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildProgrammedTransformAssembler,
  ProgrammedTransformAssemblerParent,
} from '../assembler/programmedTransformAssembler';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  ConstituentResultNormalizer,
  InputOutputContext,
} from '../shared/programmedTransformBuilderContext';
import {
  AdaptedOutputStreamConnectionMetatype,
  GenericAdaptedLeftInputItemStreamConnectionMetatype,
  GenericAdaptedOutputStreamConnectionMetatypeTuple,
} from '../shared/streamConnectionMetatype';

type EmptyAdaptedRightInputStreamConnectionMetatypeTuple = [];

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

// TODO: this one
type PartialOutputStreamConfiguration<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputItemStreamConnectionMetatype,
  TOutputStreamMetatype extends GenericStreamMetatype,
> = {
  collectionId: TOutputStreamMetatype['collectionId'];
  transform: Predicate<
    TAdaptedLeftInputStreamConnectionMetatype['adaptedTransformInput'],
    TOutputStreamMetatype['itemEggStreamable']
  >;
};

/**
 * Builds the context needed to output the input hubblepup based on a condition.
 * Each conditional appreffinge is independent of the others.
 *
 * @readableName OutputItemConditionalStreamConfigurationBuilder
 */
type OutputItemConditionalStreamConfigurationBuilder<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputItemStreamConnectionMetatype,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = <TOutputStreamMetatype extends GenericStreamMetatype>(
  partialOutputStreamConfiguration: PartialOutputStreamConfiguration<
    TAdaptedLeftInputStreamConnectionMetatype,
    TOutputStreamMetatype
  >,
) => SpreadN<
  [
    OutputItemConditionalStreamConfigurationBuilderParent<
      TAdaptedLeftInputStreamConnectionMetatype,
      NextAdaptedOutputStreamConnectionMetatypeTuple<
        TAdaptedOutputStreamConnectionMetatypeTuple,
        TOutputStreamMetatype
      >
    >,
    ProgrammedTransformAssemblerParent<
      TAdaptedLeftInputStreamConnectionMetatype,
      EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
      NextAdaptedOutputStreamConnectionMetatypeTuple<
        TAdaptedOutputStreamConnectionMetatypeTuple,
        TOutputStreamMetatype
      >
    >,
  ]
>;

export const buildOutputItemConditionalStreamConfigurationBuilder = <
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputItemStreamConnectionMetatype,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
>(
  inputOutputContext: InputOutputContext,
): OutputItemConditionalStreamConfigurationBuilder<
  TAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedOutputStreamConnectionMetatypeTuple
> => {
  const buildOutputItemConditionalStreamConfiguration: OutputItemConditionalStreamConfigurationBuilder<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedOutputStreamConnectionMetatypeTuple
  > = <TOutputStreamMetatype extends GenericStreamMetatype>(
    partialOutputStreamConfiguration: PartialOutputStreamConfiguration<
      TAdaptedLeftInputStreamConnectionMetatype,
      TOutputStreamMetatype
    >,
  ) => {
    const normalizeResult: ConstituentResultNormalizer = (
      leftInput,
      modifiedLeftInput,
    ) => {
      const predicateResult =
        partialOutputStreamConfiguration.transform(modifiedLeftInput);

      let itemTuple: Item[];
      if (predicateResult) {
        itemTuple = [modifiedLeftInput];
      } else {
        itemTuple = [];
      }

      return [partialOutputStreamConfiguration.collectionId, itemTuple];
    };

    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult,
      outputCollectionId: partialOutputStreamConfiguration.collectionId,
    });

    return {
      toItemOnCondition: buildOutputItemConditionalStreamConfigurationBuilder<
        TAdaptedLeftInputStreamConnectionMetatype,
        NextAdaptedOutputStreamConnectionMetatypeTuple<
          TAdaptedOutputStreamConnectionMetatypeTuple,
          TOutputStreamMetatype
        >
      >(nextContext),

      assemble: buildProgrammedTransformAssembler<
        TAdaptedLeftInputStreamConnectionMetatype,
        EmptyAdaptedRightInputStreamConnectionMetatypeTuple,
        NextAdaptedOutputStreamConnectionMetatypeTuple<
          TAdaptedOutputStreamConnectionMetatypeTuple,
          TOutputStreamMetatype
        >
      >({
        ...nextContext,
        transform: () => {
          // no op
        },
      }),
    };
  };

  return buildOutputItemConditionalStreamConfiguration;
};

export type OutputItemConditionalStreamConfigurationBuilderParent<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputItemStreamConnectionMetatype,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = {
  toItemOnCondition: OutputItemConditionalStreamConfigurationBuilder<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedOutputStreamConnectionMetatypeTuple
  >;
};
