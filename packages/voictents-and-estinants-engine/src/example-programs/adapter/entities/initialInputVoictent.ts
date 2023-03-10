import { Gepp } from '../../../type-script-adapter/gepp';
import { Voictent } from '../../../type-script-adapter/voictent';
import { ExampleHubblepup } from './exampleHubblepup';

export const INITIAL_INPUT_GEPP = 'initial-input';

export type InitialInputGepp = Gepp<typeof INITIAL_INPUT_GEPP>;

export type InitialInputVoictent = Voictent<InitialInputGepp, ExampleHubblepup>;

export const initialInputHubblepupTuple: InitialInputVoictent['hubblepupTuple'] =
  [
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
  ];
