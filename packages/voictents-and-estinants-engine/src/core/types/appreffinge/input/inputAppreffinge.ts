import { GenericLeftInputAppreffinge } from './leftInputAppreffinge';
import { GenericRightInputStreamConfiguration } from './right/rightInputStreamConfiguration';

/**
 * Determines how to stream a collection into one input of a transform.
 *
 * @readableName InputStreamConfiguration
 */
export type GenericInputAppreffinge =
  | GenericLeftInputAppreffinge
  | GenericRightInputStreamConfiguration;
