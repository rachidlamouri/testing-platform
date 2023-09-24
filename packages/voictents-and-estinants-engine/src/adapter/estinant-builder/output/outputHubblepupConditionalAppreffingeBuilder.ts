import { Hubblepup } from '../../../core/engine-shell/hubblepup/hubblepup';
import { GenericVoque } from '../../../core/engine/voque';
import { Predicate } from '../../../utilities/functions/predicate';
import { SpreadN } from '../../../utilities/types/spreadN';
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
  TOutputVoque extends GenericVoque,
> = [
  ...TAdaptedOutputVickenTuple,
  AdaptedOutputVicken<TOutputVoque, TOutputVoque['hubblepupPelue']>,
];

type PartialOutputAppreffinge<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputHubblepupVicken,
  TOutputVoque extends GenericVoque,
> = {
  gepp: TOutputVoque['gepp'];
  pinbe: Predicate<
    TAdaptedLeftInputVicken['pinbetunfInput'],
    TOutputVoque['hubblepupPelue']
  >;
};

type OutputHubblepupConditionalAppreffingeBuilder<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputHubblepupVicken,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = <TOutputVoque extends GenericVoque>(
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
  > = <TOutputVoque extends GenericVoque>(
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

      let hubblepupTuple: Hubblepup[];
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
