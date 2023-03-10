import { buildMentursection } from '../../../type-script-adapter/estinant/mentursection';
import { Voictent } from '../../../type-script-adapter/voictent';
import { InitialInputVoictent } from './initialInputVoictent';

type ValueHubblepup<T> = {
  value: T;
};

type VoictentLetter = Voictent<'letter', ValueHubblepup<string>>;

type VoictentNumber = Voictent<'number', ValueHubblepup<number>>;

export const exampleMentursection = buildMentursection<
  InitialInputVoictent,
  [VoictentLetter, VoictentNumber]
>({
  inputGepp: 'initial-input',
  outputGeppTuple: ['letter', 'number'],
  pinbe: (input) => {
    const letterHubblepup: ValueHubblepup<string> = {
      value: input.key,
    };

    const numberHubblepup: ValueHubblepup<number> = {
      value: input.value,
    };

    return {
      letter: [letterHubblepup],
      number: [numberHubblepup],
    };
  },
});
