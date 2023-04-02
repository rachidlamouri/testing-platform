import { Simplify, UnionToIntersection } from 'type-fest';
import {
  LeftVicken,
  OutputVicken,
  OutputVickenTuple,
  RightVicken,
  RightVickenTuple,
} from '../../../type-script-adapter/vicken';
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

type PinbetunfOutput<TOutputVickenTuple extends OutputVickenTuple> =
  TOutputVickenTuple extends []
    ? void
    : TOutputVickenTuple extends [infer TOutputVicken extends OutputVicken]
    ? TOutputVicken['pinbeOutput']
    : Simplify<
        UnionToIntersection<
          {
            [Index in keyof TOutputVickenTuple]: {
              [Key in TOutputVickenTuple[Index]['voictent']['gepp']]: TOutputVickenTuple[Index]['pinbeOutput'];
            };
          }[number]
        >
      >;

export type PinbetunfBuilder<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = (
  pinbe: Pinbetunf<
    PinbetunInputTuple1<TLeftVicken, TRightVickenTuple>,
    PinbetunfOutput<TOutputVickenTuple>
  >,
) => EstinantAssemblerParent<
  TLeftVicken,
  TRightVickenTuple,
  TOutputVickenTuple
>;

export const buildPinbetunfBuilder = <
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
>(
  inputOutputContext: InputOutputContext,
): PinbetunfBuilder<TLeftVicken, TRightVickenTuple, TOutputVickenTuple> => {
  const buildPinbetunf: PinbetunfBuilder<
    TLeftVicken,
    TRightVickenTuple,
    TOutputVickenTuple
  > = (
    pinbe: Pinbetunf<
      PinbetunInputTuple1<TLeftVicken, TRightVickenTuple>,
      PinbetunfOutput<TOutputVickenTuple>
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
      assemble: buildEstinantAssembler(nextContext),
    };
  };

  return buildPinbetunf;
};

export type PinbetunfBuilderParent<
  TLeftVicken extends LeftVicken,
  TRightVickenTuple extends RightVickenTuple,
  TOutputVickenTuple extends OutputVickenTuple,
> = {
  onPinbe: PinbetunfBuilder<TLeftVicken, TRightVickenTuple, TOutputVickenTuple>;
};
