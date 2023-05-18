import {
  GenericIndexedHubblepupTuple,
  Hubblepup,
} from '../../../core/engine-shell/quirm/hubblepup';
import { QuirmList } from '../../../core/engine-shell/quirm/quirm';
import { Gepp } from '../../../type-script-adapter/gepp';
import { HubblepupTuple } from '../../../type-script-adapter/hubblepup';
import { StringZorn } from '../../../utilities/semantic-types/zorn';
import { Grition, GritionTuple } from '../grition';
import { Odeshin, OdeshinTuple } from '../odeshin';
import {
  ConstituentResultNormalizer,
  PinbetunfOutputAggregator,
} from './estinantBuilderContext';

export const hubblepupTupleToHubblepupTuple = (
  inputTuple: HubblepupTuple,
): HubblepupTuple => inputTuple;

export const indexedOdeshinTupleToGritionTuple = (
  inputTuple: GenericIndexedHubblepupTuple,
): GritionTuple => {
  const odeshinTuple = inputTuple.map((x) => x.hubblepup as Odeshin);
  const gritionTuple = odeshinTuple.map((odeshin: Odeshin) => {
    return odeshin.grition;
  });

  return gritionTuple;
};

export const odeshinTupleToGritionTuple = (
  odeshinTuple: OdeshinTuple,
): GritionTuple => {
  const gritionTuple = odeshinTuple.map((odeshin: Odeshin) => {
    return odeshin.grition;
  });

  return gritionTuple;
};

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
    const hubblepupTuple = aggregatedOutput[gepp] as Hubblepup[];
    return [gepp, hubblepupTuple];
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
    const hubblepup = aggregatedOutput[gepp];
    return [gepp, [hubblepup]];
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

    return [gepp, [hubblepup]];
  };

  return normalizeGrition;
};
