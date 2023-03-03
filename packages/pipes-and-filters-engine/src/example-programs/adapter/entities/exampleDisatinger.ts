import { buildDisatinger } from '../../../type-script-adapter/estinant/disatinger';
import { ExampleAVoictent } from './exampleAVoictent';
import { ExampleBVoictent } from './exampleBVoictent';
import { serialize } from './exampleOnama';

export const exampleDisatinger = buildDisatinger<
  [ExampleAVoictent, ExampleBVoictent],
  number
>({
  inputGeppTuple: ['a', 'b'],
  croard: (input) => {
    return input.value;
  },
  pinbe: (exampleA, exampleB) => {
    // eslint-disable-next-line no-console
    console.log(
      `Disatingating: ${serialize(exampleA)} | ${serialize(exampleB)}`,
    );
  },
});
