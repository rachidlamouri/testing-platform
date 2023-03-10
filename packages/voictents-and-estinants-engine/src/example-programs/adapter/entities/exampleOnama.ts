import { buildOnama } from '../../../type-script-adapter/estinant/onama';
import { Gepp } from '../../../type-script-adapter/gepp';
import { Voictent } from '../../../type-script-adapter/voictent';
import { ExampleHubblepup } from './exampleHubblepup';
import { InitialInputVoictent } from './initialInputVoictent';

type Serialized = {
  serialized: string;
};

type GeppSerialized = Gepp<'serialized'>;

export type SerializedVoictent = Voictent<GeppSerialized, Serialized>;

export const serialize = (input: ExampleHubblepup): string => {
  return `${input.key}, ${input.value}`;
};

export const exampleOnama = buildOnama<
  InitialInputVoictent,
  SerializedVoictent
>({
  inputGepp: 'initial-input',
  outputGepp: 'serialized',
  pinbe: (input) => {
    const serialized = serialize(input);

    return {
      serialized,
    };
  },
});
