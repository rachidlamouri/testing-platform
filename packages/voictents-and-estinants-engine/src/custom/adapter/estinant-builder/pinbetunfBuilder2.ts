import { Simplify, UnionToIntersection } from 'type-fest';
import {
  buildEstinantAssembler,
  EstinantAssemblerParent,
} from './estinantAssembler';
import { AssemblerContext, InputOutputContext } from './estinantBuilderContext';
import {
  GenericAdaptedLeftInputVicken,
  GenericAdaptedOutputVicken,
  GenericAdaptedOutputVickenTuple,
  GenericAdaptedRightInputVickenTuple,
} from './vicken';
import {
  Straline,
  StralineTuple,
} from '../../../utilities/semantic-types/straline';

type Pinbetunf2<TInputTuple extends StralineTuple, TOutput extends Straline> = (
  ...input: TInputTuple
) => TOutput;

// TODO: clean up the constraint on this type
type PinbetunInputTuple2<
  TAdaptedInputVickenTuple extends { pinbetunfInput: unknown }[],
> = {
  [Index in keyof TAdaptedInputVickenTuple]: TAdaptedInputVickenTuple[Index]['pinbetunfInput'];
};

type PinbetunInputTuple1<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
> = PinbetunInputTuple2<
  [TAdaptedLeftInputVicken, ...TAdaptedRightInputVickenTuple]
>;

type PinbetunfOutput<
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = TAdaptedOutputVickenTuple extends []
  ? void
  : TAdaptedOutputVickenTuple extends [
      infer TAdaptedOutputVicken extends GenericAdaptedOutputVicken,
    ]
  ? TAdaptedOutputVicken['pinbetunfOutput']
  : Simplify<
      UnionToIntersection<
        {
          [Index in keyof TAdaptedOutputVickenTuple]: {
            [Key in TAdaptedOutputVickenTuple[Index]['voque']['gepp']]: TAdaptedOutputVickenTuple[Index]['pinbetunfOutput'];
          };
        }[number]
      >
    >;

export type PinbetunfBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = (
  pinbe: Pinbetunf2<
    PinbetunInputTuple1<TAdaptedLeftInputVicken, TAdaptedRightInputVickenTuple>,
    PinbetunfOutput<TAdaptedOutputVickenTuple>
  >,
) => EstinantAssemblerParent<
  TAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple
>;

export const buildPinbetunfBuilder2 = <
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): PinbetunfBuilder2<
  TAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple
> => {
  const buildPinbetunf: PinbetunfBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  > = (
    pinbe: Pinbetunf2<
      PinbetunInputTuple1<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple
      >,
      PinbetunfOutput<TAdaptedOutputVickenTuple>
    >,
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
      assemble: buildEstinantAssembler<
        TAdaptedLeftInputVicken,
        TAdaptedRightInputVickenTuple,
        TAdaptedOutputVickenTuple
      >(nextContext),
    };
  };

  return buildPinbetunf;
};

export type PinbetunfBuilderParent2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = {
  onPinbe: PinbetunfBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  >;
};
