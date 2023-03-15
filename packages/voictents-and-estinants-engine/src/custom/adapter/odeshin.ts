import { Hubblepup } from '../../type-script-adapter/hubblepup';
import { Grition } from './grition';

export type Odeshin<
  TZorn extends string = string,
  TGrition extends Grition = Grition,
> = Hubblepup<{
  zorn: TZorn;
  grition: TGrition;
}>;

export type OdeshinFromGrition<TGrition extends Grition = Grition> = Odeshin<
  string,
  TGrition
>;

export const isOdeshin = (hubblepup: Hubblepup): hubblepup is Odeshin =>
  'zorn' in hubblepup && typeof hubblepup.zorn === 'string';
