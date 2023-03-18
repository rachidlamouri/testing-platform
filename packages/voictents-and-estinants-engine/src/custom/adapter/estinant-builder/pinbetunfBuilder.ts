import { Vition } from '../../../type-script-adapter/vition';
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
  LeftContext,
  OutputContext,
  Pinbetunf,
  RightContextTuple,
} from './estinantBuilderContext';

export type PinbetunfBuilder<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
  TPinbeInputTuple extends StralineTuple,
  TPinbeOutput extends Straline,
> = (
  pinbe: Pinbetunf<TPinbeInputTuple, TPinbeOutput>,
) => EstinantAssemblerParent<TInputVition, TOutputVoictentTuple>;

export const buildPinbetunfBuilder = <
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
  TPinbeInputTuple extends StralineTuple,
  TPinbeOutput extends Straline,
>(
  leftContext: LeftContext,
  rightContextTuple: RightContextTuple,
  outputContext: OutputContext,
): PinbetunfBuilder<
  TInputVition,
  TOutputVoictentTuple,
  TPinbeInputTuple,
  TPinbeOutput
> => {
  const buildPinbetunf: PinbetunfBuilder<
    TInputVition,
    TOutputVoictentTuple,
    TPinbeInputTuple,
    TPinbeOutput
  > = (pinbe: Pinbetunf<TPinbeInputTuple, TPinbeOutput>) => {
    return {
      assemble: buildEstinantAssembler(
        leftContext,
        rightContextTuple,
        outputContext,
        pinbe,
      ),
    };
  };

  return buildPinbetunf;
};

export type PinbetunfBuilderParent<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
  TPinbeInputTuple extends StralineTuple,
  TPinbeOutput extends Straline,
> = {
  onPinbe: PinbetunfBuilder<
    TInputVition,
    TOutputVoictentTuple,
    TPinbeInputTuple,
    TPinbeOutput
  >;
};
