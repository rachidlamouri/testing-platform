import { Grition } from '../core/grition';
import { Odeshin, OdeshinIdentifier } from '../core/odeshin';
import { Plifal } from '../core/plifal';

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

export const VALIDATION_RESULT_GEPP = 'validation-result';

export type ValidationResultGepp = typeof VALIDATION_RESULT_GEPP;

export type ValidationResultQuirm = Plifal<
  [ValidationResultGepp],
  ValidationResultOdeshin
>;
