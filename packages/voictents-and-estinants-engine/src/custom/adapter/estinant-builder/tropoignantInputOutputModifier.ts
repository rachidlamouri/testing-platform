import { Hubblepup } from '../../../core/hubblepup';
import { Gepp } from '../../../type-script-adapter/gepp';
import { HubblepupTuple } from '../../../type-script-adapter/hubblepup';
import { QuirmList } from '../../../type-script-adapter/quirm';
import { Grition, GritionTuple } from '../grition';
import { Odeshin, OdeshinTuple } from '../odeshin';

export const hubblepupTupleToHubblepupTuple = (
  inputTuple: HubblepupTuple,
): HubblepupTuple => inputTuple;

export const odeshinTupleToGritionTuple = (
  inputTuple: OdeshinTuple,
): GritionTuple => inputTuple.map((odeshin) => odeshin.grition);

export const hubblepupToHubblepup = (input: Hubblepup): Hubblepup => input;

export const odeshinToGrition = (input: Odeshin): Grition => input.grition;

type OutputHubblepupNormalizer = (hubblepup: Hubblepup) => QuirmList;
export const buildHubblepupToQuirmList = (
  gepp: Gepp,
): OutputHubblepupNormalizer => {
  const hubblepupToQuirmList: OutputHubblepupNormalizer = (hubblepup) => {
    return [
      {
        gepp,
        hubblepup,
      },
    ];
  };

  return hubblepupToQuirmList;
};
