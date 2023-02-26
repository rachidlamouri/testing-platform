import { Gepp, GeppTuple } from './gepp';
import { Hubblepup } from './hubblepup';

/**
 * A cache of Hubblepups, where each Hubblepup is keyed by one of its Gepps. This is used by a Procody.
 */
export class Cology extends Map<Gepp, Hubblepup> {
  constructor(public readonly geppTuple: GeppTuple) {
    super();
  }

  isReady(): boolean {
    return this.geppTuple.every((gepp) => this.has(gepp));
  }
}
