import { GenericLeftInputAppreffinge } from './leftInputAppreffinge';
import { GenericRightInputAppreffinge } from './right/rightInputAppreffinge';

/**
 * Determines how to stream a collection into one input of a transform.
 *
 * @readableName InputStreamConfiguration
 */
export type GenericInputAppreffinge =
  | GenericLeftInputAppreffinge
  | GenericRightInputAppreffinge;
