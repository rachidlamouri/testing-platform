import { List } from '../../../utilities/semantic-types/list';
import { GenericGepp } from '../voictent/gepp';
import { Hubblepup } from './hubblepup';

/**
 * One of the two programmable units of the Engine (see Estinant). It allows the Concrete Programmer to register
 * a Hubblepup to a Voictent via a Gepp.
 */
export type Quirm = {
  gepp: GenericGepp;
  hubblepup: Hubblepup;
};

export type QuirmTuple = readonly Quirm[];

export type QuirmList = List<Quirm>;
