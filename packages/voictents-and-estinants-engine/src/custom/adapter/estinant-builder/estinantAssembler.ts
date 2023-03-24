import { Estinant as CoreEstinant } from '../../../core/estinant';
import { Estinant2 } from '../../../type-script-adapter/estinant/estinant';
import { QuirmList } from '../../../type-script-adapter/quirm';
import {
  LeftVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { VoictentTuple } from '../../../type-script-adapter/voictent';
import { AssemblerContext } from './estinantBuilderContext';

export type EstinantAssembler<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVoictentTuple extends VoictentTuple,
> = () => Estinant2<TLeftVicken, TRightVickenTuple, TOutputVoictentTuple>;

export const buildEstinantAssembler = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVoictentTuple extends VoictentTuple,
>(
  assemblerContext: AssemblerContext,
): EstinantAssembler<TLeftVicken, TRightVickenTuple, TOutputVoictentTuple> => {
  const assembleEstinant: EstinantAssembler<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVoictentTuple
  > = () => {
    const {
      inputContext: { leftInputContext, rightInputContextTuple },
      outputContext,
    } = assemblerContext;

    const estinant = {
      leftAppreffinge: {
        gepp: leftInputContext.gepp,
        isWibiz: leftInputContext.isWibiz,
      },
      rightAppreffingeTuple: rightInputContextTuple.map((rightInputContext) => {
        if (rightInputContext.isWibiz) {
          return {
            gepp: rightInputContext.gepp,
            isWibiz: rightInputContext.isWibiz,
            framate: () => [''],
            croard: () => '',
          };
        }

        return {
          gepp: rightInputContext.gepp,
          isWibiz: rightInputContext.isWibiz,
          framate: rightInputContext.framate,
          croard: rightInputContext.croard,
        };
      }),
      tropoig: (leftInput, ...rightInputTuple): QuirmList => {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment */
        const modifiedLeftInput =
          leftInputContext.modifyTropoignantInput(leftInput);
        const modifiedRightInputTuple = rightInputContextTuple.map(
          (rightInputContext, index) => {
            const rightInput = rightInputTuple[index];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return rightInputContext.modifyTropoignantInput(rightInput);
          },
        );
        const modifiedOutput = assemblerContext.pinbe(
          modifiedLeftInput,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          ...modifiedRightInputTuple,
        );

        const aggregatedOutput =
          outputContext.aggregatePinbetunfOutput(modifiedOutput);

        const quirmList = outputContext.constituentResultNormalizerList.flatMap(
          (normalizeResult) => {
            const resultList = normalizeResult(leftInput, aggregatedOutput);
            return resultList;
          },
        );
        /* eslint-enable @typescript-eslint/no-unsafe-assignment */

        return quirmList;
      },
    } satisfies CoreEstinant as Estinant2<
      TLeftVicken,
      TRightVickenTuple,
      TOutputVoictentTuple
    >;
    return estinant;
  };

  return assembleEstinant;
};

export type EstinantAssemblerParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVoictentTuple extends VoictentTuple,
> = {
  assemble: EstinantAssembler<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVoictentTuple
  >;
};
