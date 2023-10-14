import {
  SimpleId,
  UnsafeComplexId,
} from '../../package-agnostic-utilities/data-structure/id';

/**
 * @todo consider eliminating string literals and just going with complex identifiers
 */
export type IdentifiableItemId = SimpleId | UnsafeComplexId;

/**
 * An identifiable item
 *
 * @readableName GenericIdentifiableItem
 */
export type GenericIdentifiableItem =
  | {
      id: IdentifiableItemId;
      zorn?: IdentifiableItemId;
    }
  | {
      id?: IdentifiableItemId;
      zorn: IdentifiableItemId;
    };
