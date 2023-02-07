import { Quirm } from '../../core/quirm';
import { Grition } from '../core/grition';
import { Odeshin, OdeshinIdentifier } from '../core/odeshin';

export type ValidationResult = Grition<{
  identifier: OdeshinIdentifier;
  predicate: string;
  isValid: boolean;
}>;

export type ValidationResultIdentifier = `validation-result:${string}`;

export type ValidationResultOdeshin = Odeshin<
  ValidationResultIdentifier,
  ValidationResult
>;

export const VALIDATION_RESULT_GIPP = 'validation-result';

export type ValidationResultGipp = typeof VALIDATION_RESULT_GIPP;

export type ValidationResultQuirm = Quirm<
  ValidationResultOdeshin,
  [ValidationResultGipp]
>;
