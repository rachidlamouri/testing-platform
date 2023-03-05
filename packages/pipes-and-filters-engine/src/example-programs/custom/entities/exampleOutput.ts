import { buildOnama } from '../../../type-script-adapter/estinant/onama';
import { Voictent } from '../../../type-script-adapter/voictent';
import { ExampleInputVoictent } from './exampleInput';
import { ExampleOdeshin } from './exampleOdeshin';

export const EXAMPLE_OUTPUT_GEPP = 'example-output';

export type ExampleOutputGepp = typeof EXAMPLE_OUTPUT_GEPP;

export type ExampleOutputVoictent = Voictent<ExampleOutputGepp, ExampleOdeshin>;

export const exampleOutputEstinant = buildOnama<
  ExampleInputVoictent,
  ExampleOutputVoictent
>({
  inputGepp: 'example-input',
  outputGepp: 'example-output',
  pinbe: (input) => {
    return {
      identifier: input.identifier,
      grition: input.grition + 1,
    };
  },
});
