import { Gepp } from './gepp';
import { Lanbe } from './lanbe';
import { Quirm } from './quirm';

export type Dreanor = {
  gepp: Gepp;
  lanbe: Lanbe<Quirm>;
};

export type DreanorTuple = readonly Dreanor[];
