import { Hubblepup } from '../../adapter/hubblepup';
import { Voictent } from '../../adapter/voictent';

export type InputD = {
  number: string;
};

export type InputDHubblepup = Hubblepup<InputD>;

export const INPUT_D_GEPP = 'input-d';

export type InputDGepp = typeof INPUT_D_GEPP;

export type InputDVoictent = Voictent<InputDGepp, InputDHubblepup>;
