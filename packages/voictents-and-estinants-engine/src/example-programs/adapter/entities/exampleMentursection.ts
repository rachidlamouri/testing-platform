import { buildEstinant } from '../../../custom/adapter/estinant-builder/estinantBuilder';
import { Voictent } from '../../../type-script-adapter/voictent';
import {
  InitialInputVoictent,
  INITIAL_INPUT_GEPP,
} from './initialInputVoictent';

type ValueHubblepup<T> = {
  value: T;
};

type LetterVoictent = Voictent<'letter', ValueHubblepup<string>>;

type NumberVoictent = Voictent<'number', ValueHubblepup<number>>;

export const exampleMentursection = buildEstinant({
  name: 'exampleMentursection',
})
  .fromHubblepup<InitialInputVoictent>({
    gepp: INITIAL_INPUT_GEPP,
  })
  .toHubblepup<LetterVoictent>({
    gepp: 'letter',
  })
  .toHubblepup<NumberVoictent>({
    gepp: 'number',
  })
  .onPinbe((input) => {
    const letterHubblepup: ValueHubblepup<string> = {
      value: input.key,
    };

    const numberHubblepup: ValueHubblepup<number> = {
      value: input.value,
    };

    return {
      letter: letterHubblepup,
      number: numberHubblepup,
    };
  })
  .assemble();
