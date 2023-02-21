import { Estinant, Estinant2 } from '../../../core/estinant';
import { Tropoignant, Tropoignant2 } from '../../../core/tropoignant';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import { ValidationResultQuirm } from './validationResult';

export type Validation<TOdeshin extends Odeshin> = Tropoignant<
  TOdeshin,
  [ValidationResultQuirm]
>;

export type ValidationEstinant<TOdeshin extends Odeshin> = Estinant<
  TOdeshin,
  [ValidationResultQuirm]
>;

export type Validation2<TPlifal extends Plifal> = Tropoignant2<
  [TPlifal],
  [ValidationResultQuirm]
>;

export type ValidationEstinant2<TPlifal extends Plifal> = Estinant2<
  [TPlifal],
  [ValidationResultQuirm]
>;
