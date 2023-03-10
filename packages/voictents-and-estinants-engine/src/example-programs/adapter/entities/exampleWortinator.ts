import { buildWortinator } from '../../../type-script-adapter/estinant/wortinator';
import { SerializedVoictent } from './exampleOnama';

export const exampleWortinator = buildWortinator<SerializedVoictent>({
  inputGepp: 'serialized',
  pinbe: (input) => {
    // eslint-disable-next-line no-console
    console.log(`Wort wort wort: ${input.serialized}`);
  },
});
