import { Estinant } from '../../core/estinant';
import { Tropoignant } from '../../core/tropoignant';
import { Odeshin } from '../core/odeshin';
import { ValidationResultQuirm } from './validationResult';

export type Validation<TOdeshin extends Odeshin> = Tropoignant<
  TOdeshin,
  [ValidationResultQuirm]
>;

export type ValidationEstinant<TOdeshin extends Odeshin> = Estinant<
  TOdeshin,
  [ValidationResultQuirm]
>;
