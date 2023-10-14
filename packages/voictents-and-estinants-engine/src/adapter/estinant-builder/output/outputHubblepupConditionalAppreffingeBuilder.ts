import { Item } from '../../../core/types/item/item';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { Predicate } from '../../../package-agnostic-utilities/function/predicate';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildProgrammedTransformAssembler,
  ProgrammedTransformAssemblerParent,
} from '../assembler/estinantAssembler';
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

type EmptyAdaptedRightInputVickenTuple = [];

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

// TODO: this one
type PartialOutputAppreffinge<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputItemStreamConnectionMetatype,
  TOutputVoque extends GenericStreamMetatype,
> = {
  gepp: TOutputVoque['collectionId'];
  pinbe: Predicate<
    TAdaptedLeftInputVicken['adaptedTransformInput'],
    TOutputVoque['itemEggStreamable']
  >;
};

/**
 * Builds the context needed to output the input hubblepup based on a condition.
 * Each conditional appreffinge is independent of the others.
 *
 * @readableName OutputItemConditionalStreamConfigurationBuilder
 */
type OutputHubblepupConditionalAppreffingeBuilder<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputItemStreamConnectionMetatype,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = <TOutputVoque extends GenericStreamMetatype>(
  partialOutputAppreffinge: PartialOutputAppreffinge<
    TAdaptedLeftInputVicken,
    TOutputVoque
  >,
) => SpreadN<
  [
    OutputHubblepupConditionalAppreffingeBuilderParent<
      TAdaptedLeftInputVicken,
      NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
    >,
    ProgrammedTransformAssemblerParent<
      TAdaptedLeftInputVicken,
      EmptyAdaptedRightInputVickenTuple,
      NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
    >,
  ]
>;

export const buildOutputHubblepupConditionalAppreffingeBuilder = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputItemStreamConnectionMetatype,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
>(
  inputOutputContext: InputOutputContext,
): OutputHubblepupConditionalAppreffingeBuilder<
  TAdaptedLeftInputVicken,
  TAdaptedOutputVickenTuple
> => {
  const buildOutputHubblepupConditionalAppreffinge: OutputHubblepupConditionalAppreffingeBuilder<
    TAdaptedLeftInputVicken,
    TAdaptedOutputVickenTuple
  > = <TOutputVoque extends GenericStreamMetatype>(
    partialOutputAppreffinge: PartialOutputAppreffinge<
      TAdaptedLeftInputVicken,
      TOutputVoque
    >,
  ) => {
    const normalizeResult: ConstituentResultNormalizer = (
      leftInput,
      modifiedLeftInput,
    ) => {
      const predicateResult = partialOutputAppreffinge.pinbe(modifiedLeftInput);

      let hubblepupTuple: Item[];
      if (predicateResult) {
        hubblepupTuple = [modifiedLeftInput];
      } else {
        hubblepupTuple = [];
      }

      return [partialOutputAppreffinge.gepp, hubblepupTuple];
    };

    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult,
      outputCollectionId: partialOutputAppreffinge.gepp,
    });

    return {
      toHubblepupOnCondition: buildOutputHubblepupConditionalAppreffingeBuilder<
        TAdaptedLeftInputVicken,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),

      assemble: buildProgrammedTransformAssembler<
        TAdaptedLeftInputVicken,
        EmptyAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >({
        ...nextContext,
        transform: () => {
          // no op
        },
      }),
    };
  };

  return buildOutputHubblepupConditionalAppreffinge;
};

export type OutputHubblepupConditionalAppreffingeBuilderParent<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputItemStreamConnectionMetatype,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = {
  toHubblepupOnCondition: OutputHubblepupConditionalAppreffingeBuilder<
    TAdaptedLeftInputVicken,
    TAdaptedOutputVickenTuple
  >;
};
