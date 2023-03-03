import { Gepp } from '../../../type-script-adapter/gepp';
import { Voictent } from '../../../type-script-adapter/voictent';
import { ExampleHubblepup } from './exampleHubblepup';

export type InitialInputGepp = Gepp<'initial-input'>;

export type InitialInputVoictent = Voictent<InitialInputGepp, ExampleHubblepup>;

export const initialInputVoictent: InitialInputVoictent = {
  gepp: 'initial-input',
  hubblepupTuple: [
    {
      key: 'a',
      value: 1,
    },
    {
      key: 'a',
      value: 2,
    },
    {
      key: 'b',
      value: 1,
    },
    {
      key: 'b',
      value: 2,
    },
  ],
};
