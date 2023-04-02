import { Hubblepup } from '../../../core/hubblepup';
import { Quirm, QuirmList } from '../../../core/quirm';
import { Gepp } from '../../../type-script-adapter/gepp';
import { HubblepupTuple } from '../../../type-script-adapter/hubblepup';
import { StringZorn } from '../../../utilities/semantic-types/zorn';
import { Grition, GritionTuple } from '../grition';
import { Odeshin, OdeshinTuple } from '../odeshin';
import {
  AggregatedOutput,
  AggregatedOutputContext,
  ConstituentResultNormalizer,
  InputOutputContext,
  PinbetunfOutputAggregator,
} from './estinantBuilderContext';

export const hubblepupTupleToHubblepupTuple = (
  inputTuple: HubblepupTuple,
): HubblepupTuple => inputTuple;

export const odeshinTupleToGritionTuple = (
  inputTuple: OdeshinTuple,
): GritionTuple => inputTuple.map((odeshin) => odeshin.grition);

export const hubblepupToHubblepup = (input: Hubblepup): Hubblepup => input;

export const odeshinToGrition = (input: Odeshin): Grition => input.grition;

export const voidToQuirmList = (): QuirmList => [];

export const buildPinbetunfOutputAggregator = (
  gepp: Gepp,
): PinbetunfOutputAggregator => {
  const aggregatePinbetunfOutput: PinbetunfOutputAggregator = (
    modifiedOutput: unknown,
  ) => {
    return {
      [gepp]: modifiedOutput,
    };
  };
  return aggregatePinbetunfOutput;
};

export const buildOutputHubblepupTupleNormalizer = (
  gepp: Gepp,
): ConstituentResultNormalizer => {
  const normalizeHubblepupTuple: ConstituentResultNormalizer = (
    leftInput,
    modifiedInput,
    aggregatedOutput,
  ) => {
    const hubblepupTuple = aggregatedOutput[gepp] as HubblepupTuple;
    const quirmList = hubblepupTuple.map<Quirm>((hubblepup) => {
      return {
        gepp,
        hubblepup,
      };
    });

    return quirmList;
  };

  return normalizeHubblepupTuple;
};

export const buildOutputHubblepupNormalizer = (
  gepp: Gepp,
): ConstituentResultNormalizer => {
  const normalizeHubblepup: ConstituentResultNormalizer = (
    leftInput,
    modifiedInput,
    aggregatedOutput,
  ) => {
    const hubblepup = aggregatedOutput[gepp] as Hubblepup;
    const quirm: Quirm = {
      gepp,
      hubblepup,
    };

    return [quirm];
  };

  return normalizeHubblepup;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ZornAccessor<TLeftInput = any> = (
  leftInput: TLeftInput,
) => StringZorn;

export const buildOutputGritionNormalizer = (
  gepp: Gepp,
  getZorn: ZornAccessor,
): ConstituentResultNormalizer => {
  const normalizeGrition: ConstituentResultNormalizer = (
    leftInput,
    modifiedInput,
    aggregatedOutput,
  ) => {
    const zorn = getZorn(leftInput);
    const grition = aggregatedOutput[gepp];
    const hubblepup: Hubblepup = {
      zorn,
      grition,
    };
    const quirm: Quirm = {
      gepp,
      hubblepup,
    };

    return [quirm];
  };

  return normalizeGrition;
};

export const extendInputOutputContext = (
  { instantiationContext, inputContext, outputContext }: InputOutputContext,
  normalizeNextConstituentResult: ConstituentResultNormalizer,
): InputOutputContext => {
  const nextOutputContext: AggregatedOutputContext = {
    aggregatePinbetunfOutput: (aggregatedOutput: AggregatedOutput) => {
      return aggregatedOutput;
    },
    constituentResultNormalizerList: [
      ...outputContext.constituentResultNormalizerList,
      normalizeNextConstituentResult,
    ],
  };

  const nextInputOutputContext: InputOutputContext = {
    instantiationContext,
    inputContext,
    outputContext: nextOutputContext,
  };

  return nextInputOutputContext;
};
