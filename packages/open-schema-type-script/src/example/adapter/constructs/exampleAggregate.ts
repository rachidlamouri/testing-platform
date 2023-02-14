import { Gepp } from '../../../core/gepp';
import { Hubblepup } from '../../../core/hubblepup';
import { Quirm2 } from '../../../core/quirm';
import { ExampleA } from './exampleA';
import { ExampleB } from './exampleB';

export type ExampleAggregate = {
  a: ExampleA;
  b: ExampleB;
};

export type ExampleAggregateHubblepup = Hubblepup<ExampleAggregate>;

export type ExampleAggregateGepp = Gepp<'example-aggregate'>;

export type ExampleAggregateQuirm = Quirm2<
  [ExampleAggregateGepp],
  ExampleAggregateHubblepup
>;
