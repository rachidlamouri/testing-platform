import { List } from '../utilities/semantic-types/list';
import { Gepp } from './gepp';
import { Hubblepup } from './hubblepup';

/**
 * One of the two programmable units of the Engine (see Estinant). It allows the Concrete Programmer to register
 * a Hubblepup to a Voictent via a Gepp.
 */
export type Quirm = {
  gepp: Gepp;
  hubblepup: Hubblepup;
};

export type QuirmTuple = readonly Quirm[];

export type QuirmList = List<Quirm>;
