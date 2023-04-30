import { Estinant as CoreEstinant } from '../../../core/engine-shell/estinant/estinant';
import { Estinant2 } from '../../../type-script-adapter/estinant/estinant';
import { QuirmList } from '../../../type-script-adapter/quirm';
import {
  LeftVicken,
  OutputVickenTuple,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { AssemblerContext } from './estinantBuilderContext';

export type EstinantAssembler<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = () => Estinant2<TLeftVicken, TRightVickenTuple, TOutputVickenTuple>;

export const buildEstinantAssembler = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
>(
  assemblerContext: AssemblerContext,
): EstinantAssembler<TLeftVicken, TRightVickenTuple, TOutputVickenTuple> => {
  const assembleEstinant: EstinantAssembler<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  > = () => {
    const {
      instantiationContext,
      inputContext: { leftInputContext, rightInputContextTuple },
      outputContext,
    } = assemblerContext;

    const estinant = {
      name: instantiationContext.name,
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
        const modifiedLeftInput = leftInputContext.modifyTropoignantInput(
          leftInput.hubblepup,
        );
        const modifiedRightInputTuple = rightInputContextTuple.map(
          (rightInputContext, index) => {
            const rightInput = rightInputTuple[index];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return rightInputContext.modifyTropoignantInput(
              rightInput.hubblepup,
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

        const quirmList = outputContext.constituentResultNormalizerList.flatMap(
          (normalizeResult) => {
            const resultList = normalizeResult(
              leftInput.hubblepup,
              modifiedLeftInput,
              aggregatedOutput,
            );
            return resultList;
          },
        );
        /* eslint-enable @typescript-eslint/no-unsafe-assignment */

        return quirmList;
      },
    } satisfies CoreEstinant as unknown as Estinant2<
      TLeftVicken,
      TRightVickenTuple,
      TOutputVickenTuple
    >;
    return estinant;
  };

  return assembleEstinant;
};

export type EstinantAssemblerParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = {
  assemble: EstinantAssembler<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  >;
};
