import {
  LeftVicken,
  RightVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
import { VoictentTuple } from '../../../type-script-adapter/voictent';
import { Straline } from '../../../utilities/semantic-types/straline';
import {
  buildEstinantAssembler,
  EstinantAssemblerParent,
} from './estinantAssembler';
import {
  AssemblerContext,
  InputOutputContext,
  Pinbetunf,
} from './estinantBuilderContext';

type PinbetunInputTuple2<
  TVickenTuple extends readonly (LeftVicken | RightVicken)[],
> = {
  [Index in keyof TVickenTuple]: TVickenTuple[Index]['pinbetunfInput'];
};

type PinbetunInputTuple1<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
> = PinbetunInputTuple2<[TLeftVicken, ...TRightVickenTuple]>;

export type PinbetunfBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVoictentTuple extends VoictentTuple,
  TPinbeOutput extends Straline,
> = (
  pinbe: Pinbetunf<
    PinbetunInputTuple1<TLeftVicken, TRightVickenTuple>,
    TPinbeOutput
  >,
) => EstinantAssemblerParent<
  TLeftVicken,
  TRightVickenTuple,
  TOutputVoictentTuple
>;

export const buildPinbetunfBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVoictentTuple extends VoictentTuple,
  TPinbeOutput extends Straline,
>(
  inputOutputContext: InputOutputContext,
): PinbetunfBuilder<
  TLeftVicken,
  TRightVickenTuple,
  TOutputVoictentTuple,
  TPinbeOutput
> => {
  const buildPinbetunf: PinbetunfBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVoictentTuple,
    TPinbeOutput
  > = (
    pinbe: Pinbetunf<
      PinbetunInputTuple1<TLeftVicken, TRightVickenTuple>,
      TPinbeOutput
    >,
  ) => {
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
  TPinbeOutput extends Straline,
> = {
  onPinbe: PinbetunfBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVoictentTuple,
    TPinbeOutput
  >;
};
