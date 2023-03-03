import { buildCortmum } from '../../../type-script-adapter/estinant/cortmum';
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
  [ExampleAVoictent, ExampleBVoictent],
  [PermutationAVoictent, PermutationBVoictent],
  number
>({
  inputGeppTuple: ['a', 'b'],
  outputGeppTuple: ['permutation-a', 'permutation-b'],
  croard: (input) => {
    return input.value;
  },
  pinbe: (inputA, inputB) => {
    const outputA1: PermutationA = {
      left: inputA,
      right: inputB,
    };

    const outputA2: PermutationA = {
      left: inputB,
      right: inputA,
    };

    const outputB1: PermutationB = {
      sequence: [inputA, inputB],
    };

    const outputB2: PermutationB = {
      sequence: [inputB, inputA],
    };

    return {
      'permutation-a': [outputA1, outputA2],
      'permutation-b': [outputB1, outputB2],
    };
  },
});
