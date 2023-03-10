import { buildDisatinger } from '../../../type-script-adapter/estinant/disatinger';
import { Vicken } from '../../../type-script-adapter/vicken';
import { Vition } from '../../../type-script-adapter/vition';
import { ExampleAVoictent } from './exampleAVoictent';
import { ExampleBVoictent } from './exampleBVoictent';
import { serialize } from './exampleOnama';

export const exampleDisatinger = buildDisatinger<
  Vition<
    ExampleAVoictent,
    [Vicken<ExampleBVoictent, [ExampleBVoictent], number>]
  >
>({
  leftGepp: 'a',
  rightAppreffingeTuple: [
    {
      gepp: 'b',
      framate: (inputA): [number] => [inputA.value],
      croard: (inputB): number => inputB.value,
    },
  ],
  pinbe: (inputA, [inputB]) => {
    // eslint-disable-next-line no-console
    console.log(`Disatingating: ${serialize(inputA)} | ${serialize(inputB)}`);
  },
});
