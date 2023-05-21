import { Gepp } from '../../../type-script-adapter/gepp';
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
  version?: 2;
  gepp: Gepp;
  isWibiz: boolean;
  modifyTropoignantInput: AnyLeftInputAccessor;
};

export type RightInputVoictentContext = {
  version?: 2;
  gepp: Gepp;
  isWibiz: true;
  modifyTropoignantInput: AnyRightInputAccessor;
};

export type RightInputHubblepupContext = {
  version?: 2;
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

// TODO: the entry value should be TVoque['emittedVoictent']
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CoreConstituentOutputEntry = [Gepp, any];

export type ConstituentResultNormalizer = (
  leftInput: unknown,
  modifiedInput: unknown,
  aggregatedOutput: AggregatedOutput,
) => CoreConstituentOutputEntry;

export type AggregatedOutputContext = {
  aggregatePinbetunfOutput: PinbetunfOutputAggregator;
  constituentResultNormalizerList: ConstituentResultNormalizer[];
  geppTuple: Gepp[];
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

export type InstantiationContext = {
  name: string;
};

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
  instantiationContext: InstantiationContext;
  inputContext: InputContext;
  outputContext: AggregatedOutputContext;
};

export type AssemblerContext = {
  instantiationContext: InstantiationContext;
  inputContext: InputContext;
  outputContext: AggregatedOutputContext;
  pinbe: AnyPinbetunf;
};

export const buildEmptyAggregatedOutput: PinbetunfOutputAggregator = () => {
  const aggregatedOutput: AggregatedOutput = {};
  return aggregatedOutput;
};

const buildSingleValueAggregatedOutputBuilder = (
  outputGepp: Gepp,
): PinbetunfOutputAggregator => {
  const buildSingleValueAggregatedOutput: PinbetunfOutputAggregator = (
    modifiedOutput: unknown,
  ) => {
    const aggregatedOutput: AggregatedOutput = {
      [outputGepp]: modifiedOutput,
    };
    return aggregatedOutput;
  };

  return buildSingleValueAggregatedOutput;
};

const passthroughAggregatedOutput: PinbetunfOutputAggregator = (
  modifiedOutput: unknown,
) => {
  const aggregatedOutput = modifiedOutput as AggregatedOutput;
  return aggregatedOutput;
};

export type InputOutputContextFromLeftInputContextBuilderInput = {
  instantiationContext: InstantiationContext;
  leftInputContext: LeftInputContext;
};

export const buildInputOutputContextFromLeftInputContext = ({
  instantiationContext,
  leftInputContext,
}: InputOutputContextFromLeftInputContextBuilderInput): InputOutputContext => {
  return {
    instantiationContext,
    inputContext: {
      leftInputContext,
      rightInputContextTuple: [],
    },
    outputContext: {
      aggregatePinbetunfOutput: buildEmptyAggregatedOutput,
      constituentResultNormalizerList: [],
      geppTuple: [],
    },
  };
};

type InputOutputContextFromRightInputContextBuilderInput = {
  previousContext: InputOutputContext;
  rightInputContext: RightInputContext;
};

export const buildInputOutputContextFromRightInputContext = ({
  previousContext: {
    instantiationContext,
    inputContext: {
      leftInputContext,
      rightInputContextTuple: previousRightInputContextTuple,
    },
    outputContext,
  },
  rightInputContext,
}: InputOutputContextFromRightInputContextBuilderInput): InputOutputContext => {
  const nextRightInputContextTuple = [
    ...previousRightInputContextTuple,
    rightInputContext,
  ];

  return {
    instantiationContext,
    inputContext: {
      leftInputContext,
      rightInputContextTuple: nextRightInputContextTuple,
    },
    outputContext,
  };
};

type InputOutputContextFromOutputContextBuilderInput = {
  previousContext: InputOutputContext;
  normalizeResult: ConstituentResultNormalizer;
  outputGepp: Gepp;
};

export const buildInputOutputContextFromConstituentResultNormalizer = ({
  previousContext: {
    instantiationContext,
    inputContext,
    outputContext: {
      constituentResultNormalizerList: previousConstituentResultNormalizerList,
      geppTuple: previousGeppTuple,
    },
  },
  normalizeResult,
  outputGepp,
}: InputOutputContextFromOutputContextBuilderInput): InputOutputContext => {
  const nextConstituentResultNormalizerList = [
    ...previousConstituentResultNormalizerList,
    normalizeResult,
  ];

  const aggregatePinbetunfOutput: PinbetunfOutputAggregator =
    nextConstituentResultNormalizerList.length === 1
      ? buildSingleValueAggregatedOutputBuilder(outputGepp)
      : passthroughAggregatedOutput;

  return {
    instantiationContext,
    inputContext,
    outputContext: {
      aggregatePinbetunfOutput,
      constituentResultNormalizerList: nextConstituentResultNormalizerList,
      geppTuple: [...previousGeppTuple, outputGepp],
    },
  };
};
