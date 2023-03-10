import { buildCortmum } from '../../../type-script-adapter/estinant/cortmum';
import { Vicken } from '../../../type-script-adapter/vicken';
import { Vition } from '../../../type-script-adapter/vition';
import { Voictent } from '../../../type-script-adapter/voictent';
import { ExampleAVoictent, ExampleHubblepupA } from './exampleAVoictent';
import { ExampleBVoictent, ExampleHubblepupB } from './exampleBVoictent';

export type PermutationA = {
  left: ExampleHubblepupA | ExampleHubblepupB;
  right: ExampleHubblepupA | ExampleHubblepupB;
};

export type PermutationB = {
  sequence: [
    ExampleHubblepupA | ExampleHubblepupB,
    ExampleHubblepupA | ExampleHubblepupB,
  ];
};

export type PermutationAVoictent = Voictent<'permutation-a', PermutationA>;

export type PermutationBVoictent = Voictent<'permutation-b', PermutationB>;

export const exampleCortmum = buildCortmum<
  Vition<
    ExampleAVoictent,
    [Vicken<ExampleBVoictent, [ExampleBVoictent, ExampleBVoictent], number>]
  >,
  [PermutationAVoictent, PermutationBVoictent]
>({
  leftGepp: 'a',
  rightAppreffingeTuple: [
    {
      gepp: 'b',
      croard: (input): number => {
        return input.value;
      },
      framate: (): [number, number] => {
        return [2, 1];
      },
    },
  ],
  outputGeppTuple: ['permutation-a', 'permutation-b'],
  pinbe: (inputA, [inputB1, inputB2]) => {
    return {
      'permutation-a': [
        { left: inputA, right: inputB1 },
        { left: inputA, right: inputB2 },
        { left: inputB1, right: inputA },
        { left: inputB2, right: inputA },
      ],
      'permutation-b': [
        { sequence: [inputA, inputB1] },
        { sequence: [inputA, inputB2] },
        { sequence: [inputB1, inputA] },
        { sequence: [inputB2, inputA] },
      ],
    };
  },
});
