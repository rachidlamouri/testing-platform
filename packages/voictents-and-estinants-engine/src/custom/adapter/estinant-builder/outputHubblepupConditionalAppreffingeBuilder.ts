import { Hubblepup } from '../../../core/engine-shell/quirm/hubblepup';
import { GenericVoque } from '../../../core/engine/voque';
import { Predicate } from '../../../utilities/predicate';
import { SpreadN } from '../../../utilities/spreadN';
import {
  buildEstinantAssembler,
  EstinantAssemblerParent,
} from './estinantAssembler';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  ConstituentResultNormalizer,
  InputOutputContext,
} from './estinantBuilderContext';
import { GenericAdaptedLeftInputHubblepupVicken } from './vicken';

type AdaptedRightInputVickenTuple = [];

// There is technically multiple outputs, but this is unused on a mattomer :thinking:
type AdaptedOutputVickenTuple = [];

type PartialOutputAppreffinge<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputHubblepupVicken,
  TOutputVoque extends GenericVoque,
> = {
  gepp: TOutputVoque['gepp'];
  pinbe: Predicate<
    TAdaptedLeftInputVicken['pinbetunfInput'],
    TOutputVoque['receivedHubblepup']
  >;
};

export type OutputHubblepupConditionalAppreffingeBuilder<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputHubblepupVicken,
> = <TOutputVoque extends GenericVoque>(
  partialOutputAppreffinge: PartialOutputAppreffinge<
    TAdaptedLeftInputVicken,
    TOutputVoque
  >,
) => SpreadN<
  [
    OutputHubblepupConditionalAppreffingeBuilderParent<TAdaptedLeftInputVicken>,
    EstinantAssemblerParent<
      TAdaptedLeftInputVicken,
      AdaptedRightInputVickenTuple,
      AdaptedOutputVickenTuple
    >,
  ]
>;

export const buildOutputHubblepupConditionalAppreffingeBuilder = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputHubblepupVicken,
>(
  inputOutputContext: InputOutputContext,
): OutputHubblepupConditionalAppreffingeBuilder<TAdaptedLeftInputVicken> => {
  const buildOutputHubblepupConditionalAppreffinge: OutputHubblepupConditionalAppreffingeBuilder<
    TAdaptedLeftInputVicken
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
      toHubblepupOnCondition:
        buildOutputHubblepupConditionalAppreffingeBuilder<TAdaptedLeftInputVicken>(
          nextContext,
        ),

      assemble: buildEstinantAssembler<
        TAdaptedLeftInputVicken,
        AdaptedRightInputVickenTuple,
        AdaptedOutputVickenTuple
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
> = {
  toHubblepupOnCondition: OutputHubblepupConditionalAppreffingeBuilder<TAdaptedLeftInputVicken>;
};
