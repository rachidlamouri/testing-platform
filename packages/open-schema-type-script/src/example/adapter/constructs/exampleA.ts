import { Gepp } from '../../../core/gepp';
import { Hubblepup } from '../../../core/hubblepup';
import { Quirm2 } from '../../../core/quirm';
import { InitialInputGeppTuple } from './initialInputGepp';

export type ExampleA = string;

export type ExampleAHubblepup = Hubblepup<ExampleA>;

export type ExampleAGepp = Gepp<'example-a'>;

export type AInitialGeppTuple = InitialInputGeppTuple<[ExampleAGepp]>;

export type ExampleAQuirm = Quirm2<AInitialGeppTuple, ExampleAHubblepup>;

const quirmA1: ExampleAQuirm = {
  geppTuple: ['initial-input', 'example-a'],
  hubblepup: 'a-1',
};

const quirmA2: ExampleAQuirm = {
  geppTuple: ['initial-input', 'example-a'],
  hubblepup: 'a-2',
};

export const exampleAQuirmTuple = [quirmA1, quirmA2] as const;
