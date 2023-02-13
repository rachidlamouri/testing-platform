import { Gepp } from '../../../core/gepp';
import { Hubblepup } from '../../../core/hubblepup';
import { Quirm2 } from '../../../core/quirm';

export type ExampleDash2Gepp = Gepp<'example-dash-2'>;

export type ExampleDash2 = string;

export type ExampleDash2Hubblepup = Hubblepup<ExampleDash2>;

export type ExampleDash2Quirm = Quirm2<
  [ExampleDash2Gepp],
  ExampleDash2Hubblepup
>;
