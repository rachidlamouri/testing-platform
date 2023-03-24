import {
  LeftVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { VoictentTuple } from '../../../type-script-adapter/voictent';
import {
  Straline,
  StralineTuple,
} from '../../../utilities/semantic-types/straline';
import {
  buildEstinantAssembler,
  EstinantAssemblerParent,
} from './estinantAssembler';
import {
  AssemblerContext,
  InputOutputContext,
  Pinbetunf,
} from './estinantBuilderContext';

export type PinbetunfBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVoictentTuple extends VoictentTuple,
  TPinbetunfInputTuple extends StralineTuple,
  TPinbeOutput extends Straline,
> = (
  pinbe: Pinbetunf<TPinbetunfInputTuple, TPinbeOutput>,
) => EstinantAssemblerParent<
  TLeftVicken,
  TRightVickenTuple,
  TOutputVoictentTuple
>;

export const buildPinbetunfBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVoictentTuple extends VoictentTuple,
  TPinbetunfInputTuple extends StralineTuple,
  TPinbeOutput extends Straline,
>(
  inputOutputContext: InputOutputContext,
): PinbetunfBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TOutputVoictentTuple,
  TPinbetunfInputTuple,
  TPinbeOutput
> => {
  const buildPinbetunf: PinbetunfBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVoictentTuple,
    TPinbetunfInputTuple,
    TPinbeOutput
  > = (pinbe: Pinbetunf<TPinbetunfInputTuple, TPinbeOutput>) => {
    const { inputContext, outputContext } = inputOutputContext;

    const nextContext: AssemblerContext = {
      inputContext,
      outputContext,
      pinbe,
    };

    return {
      assemble: buildEstinantAssembler(nextContext),
    };
  };

  return buildPinbetunf;
};

export type PinbetunfBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVoictentTuple extends VoictentTuple,
  TPinbetunfInputTuple extends StralineTuple,
  TPinbeOutput extends Straline,
> = {
  onPinbe: PinbetunfBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVoictentTuple,
    TPinbetunfInputTuple,
    TPinbeOutput
  >;
};
