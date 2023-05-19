import { RightInputAppreffinge } from '../../../core/engine-shell/appreffinge/rightInputAppreffinge';
import {
  Estinant2,
  GenericEstinant2,
} from '../../../core/engine-shell/estinant/estinant';
import { GenericTropoignant2 } from '../../../core/engine-shell/estinant/tropoignant';
import { GenericIndexedHubblepup } from '../../../core/engine-shell/quirm/hubblepup';
import { GenericLeftInputVicken } from '../../../core/engine-shell/vicken/leftInputVicken';
import { GenericOutputVicken } from '../../../core/engine-shell/vicken/outputVicken';
import {
  GenericRightInputHubblepupTupleVicken,
  GenericRightInputVickenTuple,
  GenericRightInputVoictentVicken,
} from '../../../core/engine-shell/vicken/rightInputVicken';
import { Zorn, ZornTuple } from '../../../utilities/semantic-types/zorn';
import {
  AssemblerContext,
  CoreConstituentOutputEntry,
} from './estinantBuilderContext';

export type EstinantAssembler<
  TLeftInputVicken extends GenericLeftInputVicken,
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
  TOutputVicken extends GenericOutputVicken,
> = () => Estinant2<TLeftInputVicken, TRightInputVickenTuple, TOutputVicken>;

export const buildEstinantAssembler = <
  TLeftInputVicken extends GenericLeftInputVicken,
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
  TOutputVicken extends GenericOutputVicken,
>(
  assemblerContext: AssemblerContext,
): EstinantAssembler<
  TLeftInputVicken,
  TRightInputVickenTuple,
  TOutputVicken
> => {
  const assembleEstinant: EstinantAssembler<
    TLeftInputVicken,
    TRightInputVickenTuple,
    TOutputVicken
  > = () => {
    const {
      instantiationContext,
      inputContext: { leftInputContext, rightInputContextTuple },
      outputContext,
    } = assemblerContext;

    const tropoig: GenericTropoignant2 = (leftInput, ...rightInputTuple) => {
      const adaptedLeftInput = leftInputContext.isWibiz
        ? leftInput
        : (leftInput as GenericIndexedHubblepup).hubblepup;

      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      const modifiedLeftInput =
        leftInputContext.modifyTropoignantInput(adaptedLeftInput);
      const modifiedRightInputTuple = rightInputContextTuple.map(
        (rightInputContext, index) => {
          const rightInput = rightInputTuple[index];
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return rightInputContext.modifyTropoignantInput(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            rightInput,
          );
        },
      );
      const modifiedOutput = assemblerContext.pinbe(
        modifiedLeftInput,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ...modifiedRightInputTuple,
      );

      const aggregatedOutput =
        outputContext.aggregatePinbetunfOutput(modifiedOutput);

      const outputEntryList =
        outputContext.constituentResultNormalizerList.map<CoreConstituentOutputEntry>(
          (normalizeResult) => {
            const outputEntry = normalizeResult(
              adaptedLeftInput,
              modifiedLeftInput,
              aggregatedOutput,
            );
            return outputEntry;
          },
        );
      /* eslint-enable @typescript-eslint/no-unsafe-assignment */

      const output = Object.fromEntries(outputEntryList);

      return output;
    };

    const estinant = {
      version: 2,
      name: instantiationContext.name,
      leftInputAppreffinge: {
        gepp: leftInputContext.gepp,
        isWibiz: leftInputContext.isWibiz,
      },
      rightInputAppreffingeTuple: rightInputContextTuple.map(
        (rightInputContext) => {
          if (rightInputContext.isWibiz) {
            return {
              gepp: rightInputContext.gepp,
              isWibiz: rightInputContext.isWibiz,
              framate: undefined,
              croard: undefined,
            } satisfies RightInputAppreffinge<
              GenericLeftInputVicken,
              GenericRightInputVoictentVicken
            >;
          }

          return {
            gepp: rightInputContext.gepp,
            isWibiz: rightInputContext.isWibiz,
            framate: (leftInput): ZornTuple => {
              const indexedLeftHubblepup = leftInput as GenericIndexedHubblepup;

              return rightInputContext.framate(
                indexedLeftHubblepup.hubblepup,
              ) as ZornTuple;
            },
            croard: (indexedRightHubblepup): Zorn => {
              return rightInputContext.croard(indexedRightHubblepup.hubblepup);
            },
          } satisfies RightInputAppreffinge<
            GenericLeftInputVicken,
            GenericRightInputHubblepupTupleVicken
          >;
        },
      ),
      outputAppreffinge: {
        geppTuple: outputContext.geppTuple,
      },
      tropoig,
    } satisfies GenericEstinant2 as unknown as Estinant2<
      TLeftInputVicken,
      TRightInputVickenTuple,
      TOutputVicken
    >;
    return estinant;
  };

  return assembleEstinant;
};

export type EstinantAssemblerParent<
  TLeftInputVicken extends GenericLeftInputVicken,
  TRightInputVickenTuple extends GenericRightInputVickenTuple,
  TOutputVicken extends GenericOutputVicken,
> = {
  assemble: EstinantAssembler<
    TLeftInputVicken,
    TRightInputVickenTuple,
    TOutputVicken
  >;
};
