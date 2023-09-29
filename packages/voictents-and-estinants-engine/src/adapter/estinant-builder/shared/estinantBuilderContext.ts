import { Gepp } from '../../../core/types/voictent/gepp';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLeftInputAccessor = (leftInput: any) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRightInputAccessor = (leftInput: any) => any;

type LeftInputContext = {
  version?: 2;
  gepp: Gepp;
  isWibiz: boolean;
  modifyTropoignantInput: AnyLeftInputAccessor;
};

type RightInputVoictentContext = {
  version?: 2;
  gepp: Gepp;
  isWibiz: true;
  modifyTropoignantInput: AnyRightInputAccessor;
};

type RightInputHubblepupContext = {
  version?: 2;
  gepp: Gepp;
  isWibiz: false;
  framate: AnyLeftInputAccessor;
  croard: AnyRightInputAccessor;
  modifyTropoignantInput: AnyRightInputAccessor;
};

type RightInputContext = RightInputVoictentContext | RightInputHubblepupContext;

type RightInputContextTuple = Tuple<RightInputContext>;

type AggregatedOutput = Record<Gepp, unknown>;

type PinbetunfOutputAggregator<> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modifiedOutput: any,
) => AggregatedOutput;

// TODO: the entry value should be TVoque['voictentPelie']
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CoreConstituentOutputEntry = [Gepp, any];

export type ConstituentResultNormalizer = (
  leftInput: unknown,
  modifiedInput: unknown,
  aggregatedOutput: AggregatedOutput,
) => CoreConstituentOutputEntry;

type AggregatedOutputContext = {
  aggregatePinbetunfOutput: PinbetunfOutputAggregator;
  constituentResultNormalizerList: ConstituentResultNormalizer[];
  geppTuple: Gepp[];
};

type Pinbetunf<TInputTuple extends Tuple<unknown>, TOutput> = (
  ...input: TInputTuple
) => TOutput;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPinbetunf = Pinbetunf<any, any>;

export type InstantiationContext = {
  name: string;
};

type InputContext = {
  leftInputContext: LeftInputContext;
  rightInputContextTuple: RightInputContextTuple;
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

const buildEmptyAggregatedOutput: PinbetunfOutputAggregator = () => {
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

type InputOutputContextFromLeftInputContextBuilderInput = {
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
