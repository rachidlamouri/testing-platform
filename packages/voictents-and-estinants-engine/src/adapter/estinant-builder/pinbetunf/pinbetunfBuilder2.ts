import { Simplify, UnionToIntersection } from 'type-fest';
import {
  buildEstinantAssembler,
  EstinantAssemblerParent,
} from '../assembler/estinantAssembler';
import {
  AssemblerContext,
  InputOutputContext,
} from '../shared/estinantBuilderContext';
import {
  GenericAdaptedLeftInputVicken,
  GenericAdaptedOutputVicken,
  GenericAdaptedOutputVickenTuple,
  GenericAdaptedRightInputVickenTuple,
} from '../shared/vicken';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';

/**
 * A transform that is abstracted away from a core transform's input and output
 * data structures. It's just a typed function.
 */
type Pinbetunf2<TInputTuple extends Tuple<unknown>, TOutput> = (
  ...input: TInputTuple
) => TOutput;

// TODO: clean up the constraint on this type
type PinbetunfInputTuple2<
  TAdaptedInputVickenTuple extends { pinbetunfInput: unknown }[],
> = {
  [Index in keyof TAdaptedInputVickenTuple]: TAdaptedInputVickenTuple[Index]['pinbetunfInput'];
};

type PinbetunfInputTuple1<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
> = PinbetunfInputTuple2<
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

/**
 * Constructs the {@link Pinbetunf2}
 *
 * @readableName AdaptedTransformBuilder
 */
type PinbetunfBuilder2<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputVickenTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputVickenTuple,
> = (
  pinbe: Pinbetunf2<
    PinbetunfInputTuple1<
      TAdaptedLeftInputVicken,
      TAdaptedRightInputVickenTuple
    >,
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
      PinbetunfInputTuple1<
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
