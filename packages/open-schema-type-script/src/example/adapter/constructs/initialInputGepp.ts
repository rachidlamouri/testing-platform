import { Gepp, GeppTuple } from '../../../core/gepp';

export type InitialInputGepp = Gepp<'initial-input'>;

export type InitialInputGeppTuple<TGeppTuple extends GeppTuple> = [
  InitialInputGepp,
  ...TGeppTuple,
];
