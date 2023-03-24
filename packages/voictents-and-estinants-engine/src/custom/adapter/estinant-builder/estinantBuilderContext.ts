import { Gepp } from '../../../type-script-adapter/gepp';
import { QuirmList } from '../../../type-script-adapter/quirm';
import { Voictent } from '../../../type-script-adapter/voictent';
import {
  Straline,
  StralineTuple,
} from '../../../utilities/semantic-types/straline';
import { Tuple } from '../../../utilities/semantic-types/tuple';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLeftInputAccessor = (leftInput: any) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRightInputAccessor = (leftInput: any) => any;

export type TropoignantInput<
  TVoictent extends Voictent,
  TIsWibiz extends boolean,
> = [TIsWibiz] extends [true]
  ? TVoictent['hubblepupTuple']
  : TVoictent['hubblepupTuple'][number];

export type LeftInputContext = {
  gepp: Gepp;
  isWibiz: boolean;
  modifyTropoignantInput: AnyLeftInputAccessor;
};

export type RightInputVoictentContext = {
  gepp: Gepp;
  isWibiz: true;
  modifyTropoignantInput: AnyRightInputAccessor;
};

export type RightInputHubblepupContext = {
  gepp: Gepp;
  isWibiz: false;
  framate: AnyLeftInputAccessor;
  croard: AnyRightInputAccessor;
  modifyTropoignantInput: AnyRightInputAccessor;
};

export type RightInputContext =
  | RightInputVoictentContext
  | RightInputHubblepupContext;

export type RightInputContextTuple = Tuple<RightInputContext>;

export type AggregatedOutput = Record<Gepp, unknown>;

export type PinbetunfOutputAggregator<> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modifiedOutput: any,
) => AggregatedOutput;

export type ConstituentResultNormalizer = (
  leftInput: unknown,
  aggregatedOutput: AggregatedOutput,
) => QuirmList;

export type AggregatedOutputContext = {
  aggregatePinbetunfOutput: PinbetunfOutputAggregator;
  constituentResultNormalizerList: ConstituentResultNormalizer[];
};

export type RightInputContextTupleToModifiedInputTuple<
  TRightInputContextTuple extends RightInputContextTuple,
> = {
  [Index in keyof TRightInputContextTuple]: ReturnType<
    TRightInputContextTuple[Index]['modifyTropoignantInput']
  >;
};

export type AppendInputToPinbetunfInputTuple<
  TInputTuple extends StralineTuple,
  TNextInput extends Straline,
> = [...TInputTuple, TNextInput];

export type Pinbetunf<
  TInputTuple extends StralineTuple,
  TOutput extends Straline,
> = (...input: TInputTuple) => TOutput;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyPinbetunf = Pinbetunf<any, any>;

export type InputContext = {
  leftInputContext: LeftInputContext;
  rightInputContextTuple: RightInputContextTuple;
};

type InputContextExtenderInput<
  TNextRightInputContext extends RightInputContext,
> = {
  inputContext: InputContext;
  nextRightInputContext: TNextRightInputContext;
};

export const extendInputContext = <
  TNextRightInputContext extends RightInputContext,
>({
  inputContext,
  nextRightInputContext,
}: InputContextExtenderInput<TNextRightInputContext>): InputContext => {
  const nextRightInputContextTuple = [
    ...inputContext.rightInputContextTuple,
    nextRightInputContext,
  ];
  return {
    leftInputContext: inputContext.leftInputContext,
    rightInputContextTuple: nextRightInputContextTuple,
  };
};

export type InputOutputContext = {
  inputContext: InputContext;
  outputContext: AggregatedOutputContext;
};

export type AssemblerContext = {
  inputContext: InputContext;
  outputContext: AggregatedOutputContext;
  pinbe: AnyPinbetunf;
};
