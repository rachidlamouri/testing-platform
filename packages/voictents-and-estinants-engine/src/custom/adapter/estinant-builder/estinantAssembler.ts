import { Estinant as CoreEstinant } from '../../../core/estinant';
import { Estinant } from '../../../type-script-adapter/estinant/estinant';
import { QuirmList } from '../../../type-script-adapter/quirm';
import { Vition } from '../../../type-script-adapter/vition';
import { VoictentTuple } from '../../../type-script-adapter/voictent';
import {
  AnyPinbetunf,
  LeftContext,
  OutputContext,
  RightContextTuple,
} from './estinantBuilderContext';

export type EstinantAssembler<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = () => Estinant<TInputVition, TOutputVoictentTuple>;

export const buildEstinantAssembler = <
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
>(
  leftContext: LeftContext,
  rightContextTuple: RightContextTuple,
  outputContext: OutputContext,
  pinbe: AnyPinbetunf,
): EstinantAssembler<TInputVition, TOutputVoictentTuple> => {
  const assembleEstinant: EstinantAssembler<
    TInputVition,
    TOutputVoictentTuple
  > = () => {
    const estinant = {
      leftAppreffinge: {
        gepp: leftContext.gepp,
        isWibiz: leftContext.isWibiz,
      },
      rightAppreffingeTuple: rightContextTuple.map((rightContext) => ({
        gepp: rightContext.gepp,
        isWibiz: rightContext.isWibiz,
        framate: rightContext.framate,
        croard: rightContext.croard,
      })),
      tropoig: (leftInput, ...rightInputTuple): QuirmList => {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment */
        const modifiedLeftInput = leftContext.modifyTropoignantInput(leftInput);
        const modifiedRightInputTuple = rightContextTuple.map(
          (rightContext, index) => {
            const rightInput = rightInputTuple[index];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return rightContext.modifyTropoignantInput(rightInput);
          },
        );
        const modifiedOutput = pinbe(
          modifiedLeftInput,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          ...modifiedRightInputTuple,
        );
        const output = outputContext.normalizePinbetunfOutput(modifiedOutput);
        /* eslint-enable @typescript-eslint/no-unsafe-assignment */

        return output;
      },
    } satisfies CoreEstinant as Estinant<TInputVition, TOutputVoictentTuple>;
    return estinant;
  };

  return assembleEstinant;
};

export type EstinantAssemblerParent<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = {
  assemble: EstinantAssembler<TInputVition, TOutputVoictentTuple>;
};
