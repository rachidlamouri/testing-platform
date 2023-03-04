import { buildWattlection } from '../../../type-script-adapter/estinant/wattlection';
import { Gepp } from '../../../type-script-adapter/gepp';
import { Vicken } from '../../../type-script-adapter/vicken';
import { Vition } from '../../../type-script-adapter/vition';
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
  Vition<
    ExampleAVoictent,
    [Vicken<ExampleBVoictent, [ExampleBVoictent], number>]
  >,
  JoinedVoictent
>({
  leftGepp: 'a',
  rightAppreffingeTuple: [
    {
      gepp: 'b',
      framate: (inputA): [number] => {
        return [inputA.value];
      },
      croard: (inputB): number => inputB.value,
    },
  ],
  outputGepp: 'joined',
  pinbe: (inputA, [inputB]) => {
    const output: Joined = {
      inputA,
      inputB,
    };

    return output;
  },
});
