import { GenericLeftInputAppreffinge } from './leftInputAppreffinge';
import { GenericRightInputAppreffinge } from './right/rightInputAppreffinge';

/**
 * An input stream configuration for an estinant
 */
export type GenericInputAppreffinge =
  | GenericLeftInputAppreffinge
  | GenericRightInputAppreffinge;
