import { Hubblepup } from '../../type-script-adapter/hubblepup';
import { Grition } from './grition';

export type Odeshin<
  TIdentifier extends string = string,
  TGrition extends Grition = Grition,
> = Hubblepup<{
  identifier: TIdentifier;
  grition: TGrition;
}>;

export type OdeshinFromGrition<TGrition extends Grition = Grition> = Odeshin<
  string,
  TGrition
>;

export const isOdeshin = (hubblepup: Hubblepup): hubblepup is Odeshin =>
  'identifier' in hubblepup && typeof hubblepup.identifier === 'string';
