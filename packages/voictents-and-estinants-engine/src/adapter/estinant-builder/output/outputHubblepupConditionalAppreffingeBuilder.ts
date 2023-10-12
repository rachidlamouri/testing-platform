import { Item } from '../../../core/types/hubblepup/hubblepup';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { Predicate } from '../../../package-agnostic-utilities/function/predicate';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import {
  buildEstinantAssembler,
  EstinantAssemblerParent,
} from '../assembler/estinantAssembler';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  ConstituentResultNormalizer,
  InputOutputContext,
} from '../shared/estinantBuilderContext';
import {
  AdaptedOutputVicken,
  GenericAdaptedLeftInputHubblepupVicken,
  GenericAdaptedOutputVickenTuple,
} from '../shared/vicken';

type EmptyAdaptedRightInputVickenTuple = [];

type NextAdaptedOutputVickenTuple<
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
  TOutputVoque extends GenericStreamMetatype,
> = [
  ...TAdaptedOutputVickenTuple,
  AdaptedOutputVicken<TOutputVoque, TOutputVoque['itemEggStreamable']>,
];

type PartialOutputAppreffinge<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputHubblepupVicken,
  TOutputVoque extends GenericStreamMetatype,
> = {
  gepp: TOutputVoque['collectionId'];
  pinbe: Predicate<
    TAdaptedLeftInputVicken['pinbetunfInput'],
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
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputHubblepupVicken,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
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
    EstinantAssemblerParent<
      TAdaptedLeftInputVicken,
      EmptyAdaptedRightInputVickenTuple,
      NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
    >,
  ]
>;

export const buildOutputHubblepupConditionalAppreffingeBuilder = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputHubblepupVicken,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
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
      outputGepp: partialOutputAppreffinge.gepp,
    });

    return {
      toHubblepupOnCondition: buildOutputHubblepupConditionalAppreffingeBuilder<
        TAdaptedLeftInputVicken,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >(nextContext),

      assemble: buildEstinantAssembler<
        TAdaptedLeftInputVicken,
        EmptyAdaptedRightInputVickenTuple,
        NextAdaptedOutputVickenTuple<TAdaptedOutputVickenTuple, TOutputVoque>
      >({
        ...nextContext,
        pinbe: () => {
          // no op
        },
      }),
    };
  };

  return buildOutputHubblepupConditionalAppreffinge;
};

export type OutputHubblepupConditionalAppreffingeBuilderParent<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputHubblepupVicken,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = {
  toHubblepupOnCondition: OutputHubblepupConditionalAppreffingeBuilder<
    TAdaptedLeftInputVicken,
    TAdaptedOutputVickenTuple
  >;
};
