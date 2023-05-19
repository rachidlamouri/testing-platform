import { Hubblepup } from '../../../core/engine-shell/quirm/hubblepup';
import { GenericOutputVicken } from '../../../core/engine-shell/vicken/outputVicken';
import {
  CoreLeftInputVickenFromLeftVicken,
  CoreOutputVickenFromOutputVickenTuple,
  CoreRightInputVickenTupleFromRightVickenTuple,
  LeftVicken,
} from '../../../type-script-adapter/vicken';
import { Predicate } from '../../../utilities/predicate';
import { OdeshinVoictent } from '../odeshinVoictent';
import {
  buildEstinantAssembler,
  EstinantAssemblerParent,
} from './estinantAssembler';
import {
  buildInputOutputContextFromConstituentResultNormalizer,
  ConstituentResultNormalizer,
  InputOutputContext,
} from './estinantBuilderContext';
import { ZornAccessor } from './tropoignantInputOutputModifier';

type RightInputVickenTuple = [];

// There is technically multiple outputs, but this is unused on a mattomer :thinking:
type OutputVickenTuple = [];

type OutputAppreffinge<
  TLeftVicken extends LeftVicken,
  TOutputVoictent extends OdeshinVoictent,
> = {
  gepp: TOutputVoictent['gepp'];
  getZorn: ZornAccessor<TLeftVicken['tropoignantInput']>;
  pinbe: Predicate<
    TLeftVicken['pinbetunfInput'],
    TOutputVoictent['hubblepupTuple'][number]['grition']
  >;
};

export type OutputGritionConditionalAppreffingeBuilder<
  TLeftVicken extends LeftVicken,
> = <TOutputVoictent extends OdeshinVoictent>(
  outputAppreffinge: OutputAppreffinge<TLeftVicken, TOutputVoictent>,
) => OutputGritionConditionalAppreffingeBuilderParent<TLeftVicken> &
  EstinantAssemblerParent<
    CoreLeftInputVickenFromLeftVicken<TLeftVicken>,
    CoreRightInputVickenTupleFromRightVickenTuple<RightInputVickenTuple>,
    CoreOutputVickenFromOutputVickenTuple<OutputVickenTuple> extends GenericOutputVicken
      ? CoreOutputVickenFromOutputVickenTuple<OutputVickenTuple>
      : GenericOutputVicken
  >;

export const buildOutputGritionConditionalAppreffingeBuilder = <
  TLeftVicken extends LeftVicken,
>(
  inputOutputContext: InputOutputContext,
): OutputGritionConditionalAppreffingeBuilder<TLeftVicken> => {
  const buildOutputGritionConditionalAppreffinge: OutputGritionConditionalAppreffingeBuilder<
    TLeftVicken
  > = <TOutputVoictent extends OdeshinVoictent>(
    outputAppreffinge: OutputAppreffinge<TLeftVicken, TOutputVoictent>,
  ) => {
    const normalizeResult: ConstituentResultNormalizer = (
      leftInput,
      modifiedLeftInput,
    ) => {
      const predicateResult = outputAppreffinge.pinbe(modifiedLeftInput);

      let hubblepupTuple: Hubblepup[];
      if (predicateResult) {
        const zorn = outputAppreffinge.getZorn(
          leftInput as TLeftVicken['tropoignantInput'],
        );

        const hubblepup = {
          zorn,
          grition: modifiedLeftInput,
        };

        hubblepupTuple = [hubblepup];
      } else {
        hubblepupTuple = [];
      }

      return [outputAppreffinge.gepp, hubblepupTuple];
    };

    const nextContext = buildInputOutputContextFromConstituentResultNormalizer({
      previousContext: inputOutputContext,
      normalizeResult,
      outputGepp: outputAppreffinge.gepp,
    });

    return {
      toGritionOnCondition:
        buildOutputGritionConditionalAppreffingeBuilder<TLeftVicken>(
          nextContext,
        ),
      assemble: buildEstinantAssembler<
        CoreLeftInputVickenFromLeftVicken<TLeftVicken>,
        CoreRightInputVickenTupleFromRightVickenTuple<RightInputVickenTuple>,
        CoreOutputVickenFromOutputVickenTuple<OutputVickenTuple> extends GenericOutputVicken
          ? CoreOutputVickenFromOutputVickenTuple<OutputVickenTuple>
          : GenericOutputVicken
      >({
        ...nextContext,
        pinbe: () => {
          // no op
        },
      }),
    };
  };

  return buildOutputGritionConditionalAppreffinge;
};

export type OutputGritionConditionalAppreffingeBuilderParent<
  TLeftVicken extends LeftVicken,
> = {
  toGritionOnCondition: OutputGritionConditionalAppreffingeBuilder<TLeftVicken>;
};
