import { Hubblepup } from '../../core/engine-shell/quirm/hubblepup';
import { GenericVoque } from '../../core/engine/voque';
import { Predicate } from '../../utilities/predicate';
import { SpreadN } from '../../utilities/spreadN';
import {
  buildEstinantAssembler,
  EstinantAssemblerParent,
} from './estinantAssembler';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  ConstituentResultNormalizer,
  InputOutputContext,
} from './estinantBuilderContext';
import {
  AdaptedOutputVicken,
  GenericAdaptedLeftInputHubblepupVicken,
  GenericAdaptedOutputVickenTuple,
} from './vicken';

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
