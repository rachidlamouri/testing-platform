import { Hubblepup } from '../../adapter/hubblepup';
import { Voictent } from '../../adapter/voictent';

export type InputA = {
  number: string;
};

export type InputAHubblepup = Hubblepup<InputA>;

export const INPUT_A_GEPP = 'input-a';

export type InputAGepp = typeof INPUT_A_GEPP;

export type InputAVoictent = Voictent<InputAGepp, InputAHubblepup>;
