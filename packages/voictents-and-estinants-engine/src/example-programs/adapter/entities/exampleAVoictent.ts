import { Gepp } from '../../../type-script-adapter/gepp';
import { Voictent } from '../../../type-script-adapter/voictent';
import { ExampleHubblepup } from './exampleHubblepup';

export type GeppA = Gepp<'a'>;

export type ExampleHubblepupA = ExampleHubblepup<'a'>;

export type ExampleAVoictent = Voictent<GeppA, ExampleHubblepupA>;
