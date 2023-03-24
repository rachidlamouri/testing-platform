import { buildEstinant } from '../../../custom/adapter/estinant-builder/estinantBuilder';
import { SerializedVoictent } from './exampleOnama';

export const exampleWortinator = buildEstinant()
  .fromHubblepup<SerializedVoictent>({
    gepp: 'serialized',
  })
  .onPinbe((input) => {
    // eslint-disable-next-line no-console
    console.log(`Wort wort wort: ${input.serialized}`);
  })
  .assemble();
