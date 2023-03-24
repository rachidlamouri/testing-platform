import { Hubblepup } from '../../type-script-adapter/hubblepup';
import { Tuple } from '../../utilities/semantic-types/tuple';
import { Grition } from './grition';

// TODO: don't parametrize "zorn", so that this is way simpler to work with
export type Odeshin<
  TZorn extends string = string,
  TGrition extends Grition = Grition,
> = Hubblepup<{
  zorn: TZorn;
  grition: TGrition;
}>;

export type OdeshinTuple = Tuple<Odeshin>;

export type OdeshinFromGrition<TGrition extends Grition = Grition> = Odeshin<
  string,
  TGrition
>;

export const isOdeshin = (hubblepup: Hubblepup): hubblepup is Odeshin =>
  'zorn' in hubblepup && typeof hubblepup.zorn === 'string';
