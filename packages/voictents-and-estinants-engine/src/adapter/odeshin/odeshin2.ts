import { StringZorn, UnsafeZorn2 } from '../../utilities/semantic-types/zorn';

export type OdeshinZorn = StringZorn | UnsafeZorn2;

export type GenericOdeshin2 = {
  zorn: OdeshinZorn;
};
