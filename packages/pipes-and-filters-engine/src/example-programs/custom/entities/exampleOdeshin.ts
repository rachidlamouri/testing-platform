import { Grition } from '../../../custom/adapter/grition';
import { OdeshinFromGrition } from '../../../custom/adapter/odeshin';

export type Example = number;

export type ExampleGrition = Grition<Example>;

export type ExampleOdeshin = OdeshinFromGrition<ExampleGrition>;
