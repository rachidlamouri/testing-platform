import { Gepp } from '../../../core/gepp';
import { Hubblepup } from '../../../core/hubblepup';
import { Quirm2 } from '../../../core/quirm';

export type ExampleDash1Gepp = Gepp<'example-dash-1'>;

export type ExampleDash1 = string;

export type ExampleDash1Hubblepup = Hubblepup<ExampleDash1>;

export type ExampleDash1Quirm = Quirm2<
  [ExampleDash1Gepp],
  ExampleDash1Hubblepup
>;
