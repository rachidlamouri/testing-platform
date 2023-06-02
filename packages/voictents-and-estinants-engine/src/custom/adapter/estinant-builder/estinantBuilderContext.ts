import { GenericGepp } from '../../../core/engine-shell/voictent/gepp';
import {
  Straline,
  StralineTuple,
} from '../../../utilities/semantic-types/straline';
import { Tuple } from '../../../utilities/semantic-types/tuple';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLeftInputAccessor = (leftInput: any) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRightInputAccessor = (leftInput: any) => any;

type LeftInputContext = {
  version?: 2;
  gepp: GenericGepp;
  isWibiz: boolean;
  modifyTropoignantInput: AnyLeftInputAccessor;
};

type RightInputVoictentContext = {
  version?: 2;
  gepp: GenericGepp;
  isWibiz: true;
  modifyTropoignantInput: AnyRightInputAccessor;
};

type RightInputHubblepupContext = {
  version?: 2;
  gepp: GenericGepp;
  isWibiz: false;
  framate: AnyLeftInputAccessor;
  croard: AnyRightInputAccessor;
  modifyTropoignantInput: AnyRightInputAccessor;
};

type RightInputContext = RightInputVoictentContext | RightInputHubblepupContext;

type RightInputContextTuple = Tuple<RightInputContext>;

type AggregatedOutput = Record<GenericGepp, unknown>;

type PinbetunfOutputAggregator<> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modifiedOutput: any,
) => AggregatedOutput;

// TODO: the entry value should be TVoque['emittedVoictent']
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CoreConstituentOutputEntry = [GenericGepp, any];

export type ConstituentResultNormalizer = (
  leftInput: unknown,
  modifiedInput: unknown,
  aggregatedOutput: AggregatedOutput,
) => CoreConstituentOutputEntry;

type AggregatedOutputContext = {
  aggregatePinbetunfOutput: PinbetunfOutputAggregator;
  constituentResultNormalizerList: ConstituentResultNormalizer[];
  geppTuple: GenericGepp[];
};

type Pinbetunf<TInputTuple extends StralineTuple, TOutput extends Straline> = (
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
  outputGepp: GenericGepp,
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
  outputGepp: GenericGepp;
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
