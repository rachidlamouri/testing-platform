import { Simplify, UnionToIntersection } from 'type-fest';
import {
  buildProgrammedTransformAssembler,
  ProgrammedTransformAssemblerParent,
} from '../assembler/programmedTransformAssembler';
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
type AdaptedTransform2<TInputTuple extends Tuple<unknown>, TOutput> = (
  ...input: TInputTuple
) => TOutput;

// TODO: clean up the constraint on this type
type AdaptedTransformInputTuple2<
  TAdaptedInputStreamConnectionMetatypeTuple extends {
    adaptedTransformInput: unknown;
  }[],
> = {
  [Index in keyof TAdaptedInputStreamConnectionMetatypeTuple]: TAdaptedInputStreamConnectionMetatypeTuple[Index]['adaptedTransformInput'];
};

type AdaptedTransformInputTuple1<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
> = AdaptedTransformInputTuple2<
  [
    TAdaptedLeftInputStreamConnectionMetatype,
    ...TAdaptedRightInputStreamConnectionMetatypeTuple,
  ]
>;

type AdaptedTransformOutput<
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = TAdaptedOutputStreamConnectionMetatypeTuple extends []
  ? void
  : TAdaptedOutputStreamConnectionMetatypeTuple extends [
      infer TAdaptedOutputStreamConnectionMetatype extends GenericAdaptedOutputStreamConnectionMetatype,
    ]
  ? TAdaptedOutputStreamConnectionMetatype['adaptedTransformOutput']
  : Simplify<
      UnionToIntersection<
        {
          [Index in keyof TAdaptedOutputStreamConnectionMetatypeTuple]: {
            [Key in TAdaptedOutputStreamConnectionMetatypeTuple[Index]['streamMetatype']['collectionId']]: TAdaptedOutputStreamConnectionMetatypeTuple[Index]['adaptedTransformOutput'];
          };
        }[number]
      >
    >;

/**
 * Constructs the {@link AdaptedTransform2}
 *
 * @readableName AdaptedTransformBuilder
 */
type AdaptedTransformBuilder2<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = (
  transform: AdaptedTransform2<
    AdaptedTransformInputTuple1<
      TAdaptedLeftInputStreamConnectionMetatype,
      TAdaptedRightInputStreamConnectionMetatypeTuple
    >,
    AdaptedTransformOutput<TAdaptedOutputStreamConnectionMetatypeTuple>
  >,
) => ProgrammedTransformAssemblerParent<
  TAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple
>;

export const buildAdaptedTransformBuilder2 = <
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
>(
  inputOutputContext: InputOutputContext,
): AdaptedTransformBuilder2<
  TAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple
> => {
  const buildAdaptedTransform: AdaptedTransformBuilder2<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedRightInputStreamConnectionMetatypeTuple,
    TAdaptedOutputStreamConnectionMetatypeTuple
  > = (
    transform: AdaptedTransform2<
      AdaptedTransformInputTuple1<
        TAdaptedLeftInputStreamConnectionMetatype,
        TAdaptedRightInputStreamConnectionMetatypeTuple
      >,
      AdaptedTransformOutput<TAdaptedOutputStreamConnectionMetatypeTuple>
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
      assemble: buildProgrammedTransformAssembler<
        TAdaptedLeftInputStreamConnectionMetatype,
        TAdaptedRightInputStreamConnectionMetatypeTuple,
        TAdaptedOutputStreamConnectionMetatypeTuple
      >(nextContext),
    };
  };

  return buildAdaptedTransform;
};

export type AdaptedTransformBuilderParent2<
  TAdaptedLeftInputStreamConnectionMetatype extends GenericAdaptedLeftInputStreamConnectionMetatype,
  TAdaptedRightInputStreamConnectionMetatypeTuple extends GenericAdaptedRightInputStreamConnectionMetatypeTuple,
  TAdaptedOutputStreamConnectionMetatypeTuple extends GenericAdaptedOutputStreamConnectionMetatypeTuple,
> = {
  onTransform: AdaptedTransformBuilder2<
    TAdaptedLeftInputStreamConnectionMetatype,
    TAdaptedRightInputStreamConnectionMetatypeTuple,
    TAdaptedOutputStreamConnectionMetatypeTuple
  >;
};
