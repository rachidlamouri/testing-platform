import {
  StringZorn,
  UnsafeZorn2,
} from '../../package-agnostic-utilities/datastructure/zorn';

export type OdeshinZorn = StringZorn | UnsafeZorn2;

export type GenericOdeshin2 = {
  zorn: OdeshinZorn;
};
