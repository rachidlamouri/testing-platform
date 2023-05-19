import {
  buildEstinantAssembler,
  EstinantAssemblerParent,
} from './estinantAssembler';
import { AssemblerContext, InputOutputContext } from './estinantBuilderContext';
import { GenericOutputVicken } from '../../../core/engine-shell/vicken/outputVicken';
import { GenericAdaptedLeftInputVicken } from './vicken';
import {
  Straline,
  StralineTuple,
} from '../../../utilities/semantic-types/straline';
import { GenericRightInputVickenTuple } from '../../../core/engine-shell/vicken/rightInputVicken';

type Pinbetunf2<TInputTuple extends StralineTuple, TOutput extends Straline> = (
  ...input: TInputTuple
) => TOutput;

type PinbetunInputTuple2<
  TAdaptedInputVickenTuple extends [GenericAdaptedLeftInputVicken],
> = {
  [Index in keyof TAdaptedInputVickenTuple]: TAdaptedInputVickenTuple[Index]['pinbetunfInput'];
};

type PinbetunInputTuple1<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
> = PinbetunInputTuple2<[TAdaptedLeftInputVicken]>;

export type PinbetunfBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericRightInputVickenTuple,
  TAdaptedOutputVicken extends GenericOutputVicken,
> = (
  pinbe: Pinbetunf2<PinbetunInputTuple1<TAdaptedLeftInputVicken>, void>,
) => EstinantAssemblerParent<
  TAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple,
  TAdaptedOutputVicken
>;

export const buildPinbetunfBuilder2 = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericRightInputVickenTuple,
  TAdaptedOutputVicken extends GenericOutputVicken,
>(
  inputOutputContext: InputOutputContext,
): PinbetunfBuilder2<
  TAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple,
  TAdaptedOutputVicken
> => {
  const buildPinbetunf: PinbetunfBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVicken
  > = (
    pinbe: Pinbetunf2<PinbetunInputTuple1<TAdaptedLeftInputVicken>, void>,
  ) => {
    const { instantiationContext, inputContext, outputContext } =
      inputOutputContext;

    const nextContext: AssemblerContext = {
      instantiationContext,
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

export type PinbetunfBuilderParent2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericRightInputVickenTuple,
  TAdaptedOutputVicken extends GenericOutputVicken,
> = {
  onPinbe: PinbetunfBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVicken
  >;
};
