import { Gepp, GeppTuple } from './gepp';
import { Quirm } from './quirm';

/**
 * A cache of Quirms, where each Quirm is keyed by one of its Gepps. This is used by a Procody.
 */
export class Cology extends Map<Gepp, Quirm> {
  constructor(public readonly geppTuple: GeppTuple) {
    super();
  }

  isReady(): boolean {
    return this.geppTuple.every((gepp) => this.has(gepp));
  }
}
