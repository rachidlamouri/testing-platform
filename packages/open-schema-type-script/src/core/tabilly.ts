import { Gipp } from './gipp';
import { Quirm } from './quirm';
import { Voictent } from './voictent';

/**
 * A cache of Voictents by Gipp.
 * The engine uses this to connect Trapoignant's to their input Voictents,
 * and to add Quirms to their corresponding Voictents.
 */
export class Tabilly extends Map<Gipp, Voictent<Quirm>> {
  /**
   * Gets a Voictent cached by a Gipp.
   *
   * @modifies the cache of Voictents with a new Voictent if one does not already exist for the given gipp
   * @param gipp the key of the Voictent to get
   * @returns the cached Voictent or a new Voictent
   */
  getOrInstantiateAndGetVoictent(gipp: Gipp): Voictent<Quirm> {
    let voictent = this.get(gipp);

    if (voictent === undefined) {
      voictent = new Voictent();
      this.set(gipp, voictent);
    }

    return voictent;
  }

  addQuirmByGipp(quirm: Quirm, gipp: Gipp): void {
    const voictent = this.getOrInstantiateAndGetVoictent(gipp);
    voictent.addStraline(quirm);
    this.set(gipp, voictent);
  }
}
