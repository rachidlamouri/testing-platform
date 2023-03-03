import { Gepp } from '../../../type-script-adapter/gepp';
import { Voictent } from '../../../type-script-adapter/voictent';
import { ExampleHubblepup } from './exampleHubblepup';

export type GeppB = Gepp<'b'>;

export type ExampleHubblepupB = ExampleHubblepup<'b'>;

export type ExampleBVoictent = Voictent<GeppB, ExampleHubblepupB>;
