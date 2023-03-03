import { buildWattlection } from '../../../type-script-adapter/estinant/wattlection';
import { Gepp } from '../../../type-script-adapter/gepp';
import { Voictent } from '../../../type-script-adapter/voictent';
import { ExampleHubblepupA, ExampleAVoictent } from './exampleAVoictent';
import { ExampleHubblepupB, ExampleBVoictent } from './exampleBVoictent';

type GeppJoined = Gepp<'joined'>;

type Joined = {
  inputA: ExampleHubblepupA;
  inputB: ExampleHubblepupB;
};

type JoinedVoictent = Voictent<GeppJoined, Joined>;

export const exampleWattlection = buildWattlection<
  [ExampleAVoictent, ExampleBVoictent],
  JoinedVoictent,
  number
>({
  inputGeppTuple: ['a', 'b'],
  outputGepp: 'joined',
  croard: (input) => {
    return input.value;
  },
  pinbe: (inputA, inputB) => {
    const output: Joined = {
      inputA,
      inputB,
    };

    return output;
  },
});
