import { buildMattomer } from '../../../type-script-adapter/estinant/mattomer';
import { ExampleHubblepupA, ExampleAVoictent } from './exampleAVoictent';
import { ExampleHubblepupB, ExampleBVoictent } from './exampleBVoictent';
import { InitialInputVoictent } from './initialInputVoictent';

export const exampleMattomer = buildMattomer<
  InitialInputVoictent,
  [ExampleAVoictent, ExampleBVoictent]
>({
  inputGepp: 'initial-input',
  kerzTuple: [
    {
      gepp: 'a',
      pinbe: (input): input is ExampleHubblepupA => input.key === 'a',
    },
    {
      gepp: 'b',
      pinbe: (input): input is ExampleHubblepupB => input.key === 'b',
    },
  ],
});
