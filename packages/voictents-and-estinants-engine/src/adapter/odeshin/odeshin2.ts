import {
  StringZorn,
  UnsafeZorn2,
} from '../../package-agnostic-utilities/datastructure/zorn';

/**
 * @todo consider eliminating string literals and just going with complex identifiers
 */
export type OdeshinZorn = StringZorn | UnsafeZorn2;

/**
 * An identifiable item
 *
 * @readableName GenericIdentifiableItem
 */
export type GenericOdeshin2 = {
  zorn: OdeshinZorn;
};
