import {
  SimpleId,
  UnsafeComplexId,
} from '../../package-agnostic-utilities/data-structure/id';

/**
 * @todo consider eliminating string literals and just going with complex identifiers
 */
export type OdeshinZorn = SimpleId | UnsafeComplexId;

/**
 * An identifiable item
 *
 * @readableName GenericIdentifiableItem
 */
export type GenericIdentifiableItem =
  | {
      id: OdeshinZorn;
      zorn?: OdeshinZorn;
    }
  | {
      id?: OdeshinZorn;
      zorn: OdeshinZorn;
    };
