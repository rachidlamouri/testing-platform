/**
 * A mess. Seriously this file needs to be cleaned up. It has all sorts of misc
 * context objects, input acessors, and other functions.
 *
 * @noCanonicalDeclaration
 *
 * @readableName ProgrammedTransformBuilderContext
 *
 * @todo split up the typess and functions in this file by purpose
 */

import { CollectionId } from '../../../core/types/collection/collectionId';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLeftInputAccessor = (leftInput: any) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRightInputAccessor = (leftInput: any) => any;

type LeftInputContext = {
  version?: 2;
  collectionId: CollectionId;
  isCollectionStream: boolean;
  modifyCoreTransformInput: AnyLeftInputAccessor;
};

type RightInputCollectionContext = {
  version?: 2;
  collectionId: CollectionId;
  isCollectionStream: true;
  modifyCoreTransformInput: AnyRightInputAccessor;
};

type RightInputItemContext = {
  version?: 2;
  collectionId: CollectionId;
  isCollectionStream: false;
  getRightKeyTuple: AnyLeftInputAccessor;
  getRightKey: AnyRightInputAccessor;
  modifyCoreTransformInput: AnyRightInputAccessor;
};

type RightInputContext = RightInputCollectionContext | RightInputItemContext;

type RightInputContextTuple = Tuple<RightInputContext>;

type AggregatedOutput = Record<CollectionId, unknown>;

type AdaptedTransformOutputAggregator<> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modifiedOutput: any,
) => AggregatedOutput;

// TODO: the entry value should be TVoque['collectionStreamable']
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CoreConstituentOutputEntry = [CollectionId, any];

export type ConstituentResultNormalizer = (
  leftInput: unknown,
  modifiedInput: unknown,
  aggregatedOutput: AggregatedOutput,
) => CoreConstituentOutputEntry;

type AggregatedOutputContext = {
  aggregateAdaptedTransformOutput: AdaptedTransformOutputAggregator;
  constituentResultNormalizerList: ConstituentResultNormalizer[];
  collectionIdTuple: CollectionId[];
};

type AdaptedTransform<TInputTuple extends Tuple<unknown>, TOutput> = (
  ...input: TInputTuple
) => TOutput;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyAdaptedTransform = AdaptedTransform<any, any>;

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
  transform: AnyAdaptedTransform;
};

const buildEmptyAggregatedOutput: AdaptedTransformOutputAggregator = () => {
  const aggregatedOutput: AggregatedOutput = {};
  return aggregatedOutput;
};

const buildSingleValueAggregatedOutputBuilder = (
  outputCollectionId: CollectionId,
): AdaptedTransformOutputAggregator => {
  const buildSingleValueAggregatedOutput: AdaptedTransformOutputAggregator = (
    modifiedOutput: unknown,
  ) => {
    const aggregatedOutput: AggregatedOutput = {
      [outputCollectionId]: modifiedOutput,
    };
    return aggregatedOutput;
  };

  return buildSingleValueAggregatedOutput;
};

const passthroughAggregatedOutput: AdaptedTransformOutputAggregator = (
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
      aggregateAdaptedTransformOutput: buildEmptyAggregatedOutput,
      constituentResultNormalizerList: [],
      collectionIdTuple: [],
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
  outputCollectionId: CollectionId;
};

export const buildInputOutputContextFromConstituentResultNormalizer = ({
  previousContext: {
    instantiationContext,
    inputContext,
    outputContext: {
      constituentResultNormalizerList: previousConstituentResultNormalizerList,
      collectionIdTuple: previousCollectionIdTuple,
    },
  },
  normalizeResult,
  outputCollectionId,
}: InputOutputContextFromOutputContextBuilderInput): InputOutputContext => {
  const nextConstituentResultNormalizerList = [
    ...previousConstituentResultNormalizerList,
    normalizeResult,
  ];

  const aggregateAdaptedTransformOutput: AdaptedTransformOutputAggregator =
    nextConstituentResultNormalizerList.length === 1
      ? buildSingleValueAggregatedOutputBuilder(outputCollectionId)
      : passthroughAggregatedOutput;

  return {
    instantiationContext,
    inputContext,
    outputContext: {
      aggregateAdaptedTransformOutput,
      constituentResultNormalizerList: nextConstituentResultNormalizerList,
      collectionIdTuple: [...previousCollectionIdTuple, outputCollectionId],
    },
  };
};
