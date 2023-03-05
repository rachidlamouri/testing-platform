import { Voictent } from '../../../type-script-adapter/voictent';
import { ExampleOdeshin } from './exampleOdeshin';

export const EXAMPLE_INPUT_GEPP = 'example-input';

export type ExampleInputGepp = typeof EXAMPLE_INPUT_GEPP;

export type ExampleInputVoictent = Voictent<ExampleInputGepp, ExampleOdeshin>;

export const exampleInputOdeshin: ExampleOdeshin = {
  identifier: 'example',
  grition: 1,
};
