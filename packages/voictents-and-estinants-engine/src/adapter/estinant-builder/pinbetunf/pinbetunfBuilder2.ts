import { Simplify, UnionToIntersection } from 'type-fest';
import {
  buildEstinantAssembler,
  EstinantAssemblerParent,
} from '../assembler/estinantAssembler';
import {
  AssemblerContext,
  InputOutputContext,
} from '../shared/programmedTransformBuilderContext';
import {
  GenericAdaptedLeftInputStreamConnectionMetatype,
  GenericAdaptedOutputStreamConnectionMetatype,
  GenericAdaptedOutputStreamConnectionMetatypeTuple,
  GenericAdaptedRightInputStreamConnectionMetatypeTuple,
} from '../shared/streamConnectionMetatype';
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
  TAdaptedInputVickenTuple extends { adaptedTransformInput: unknown }[],
> = {
  [Index in keyof TAdaptedInputVickenTuple]: TAdaptedInputVickenTuple[Index]['adaptedTransformInput'];
};

type PinbetunfInputTuple1<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
> = PinbetunfInputTuple2<
  [TAdaptedLeftInputVicken, ...TAdaptedRightInputVickenTuple]
>;

type PinbetunfOutput<
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = TAdaptedOutputVickenTuple extends []
  ? void
  : TAdaptedOutputVickenTuple extends [
      infer TAdaptedOutputVicken extends GenericAdaptedOutputStreamConnectionMetatype,
    ]
  ? TAdaptedOutputVicken['adaptedTransformOutput']
  : Simplify<
      UnionToIntersection<
        {
          [Index in keyof TAdaptedOutputVickenTuple]: {
            [Key in TAdaptedOutputVickenTuple[Index]['streamMetatype']['collectionId']]: TAdaptedOutputVickenTuple[Index]['adaptedTransformOutput'];
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
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
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
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
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
    transform: Pinbetunf2<
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
      transform,
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
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputVickenTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputVickenTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = {
  onTransform: PinbetunfBuilder2<
    TAdaptedLeftInputVicken,
    TAdaptedRightInputVickenTuple,
    TAdaptedOutputVickenTuple
  >;
};
