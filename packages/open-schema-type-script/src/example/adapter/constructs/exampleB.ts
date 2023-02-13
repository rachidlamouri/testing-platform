import { Gepp } from '../../../core/gepp';
import { Hubblepup } from '../../../core/hubblepup';
import { Quirm2 } from '../../../core/quirm';
import { InitialInputGeppTuple } from './initialInputGepp';

export type ExampleB = string;

export type ExampleBHubblepup = Hubblepup<ExampleB>;

export type ExampleBGepp = Gepp<'example-b'>;

export type BInitialGeppTuple = InitialInputGeppTuple<[ExampleBGepp]>;

export type ExampleBQuirm = Quirm2<BInitialGeppTuple, ExampleBHubblepup>;

const quirmB1: ExampleBQuirm = {
  geppTuple: ['initial-input', 'example-b'],
  hubblepup: 'b-1',
};

const quirmB2: ExampleBQuirm = {
  geppTuple: ['initial-input', 'example-b'],
  hubblepup: 'b-2',
};

export const exampleBQuirmTuple = [quirmB1, quirmB2] as const;
