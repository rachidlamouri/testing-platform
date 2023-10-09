import {
  Simplezorn,
  UnsafeComplexzorn,
} from '../../package-agnostic-utilities/datastructure/zorn';

/**
 * @todo consider eliminating string literals and just going with complex identifiers
 */
export type OdeshinZorn = Simplezorn | UnsafeComplexzorn;

/**
 * An identifiable item
 *
 * @readableName GenericIdentifiableItem
 */
export type GenericOdeshin2 = {
  zorn: OdeshinZorn;
};
