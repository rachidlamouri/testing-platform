import { Gepp } from './gepp';
import { Quirm, QuirmTuple } from './quirm';
import { Voictent } from './voictent';

/**
 * A cache of Voictents by Gepp.
 * The engine uses this to connect Tropoignant's to their input Voictents,
 * and to add Quirms to their corresponding Voictents.
 */
export class Tabilly extends Map<Gepp, Voictent<Quirm>> {
  /**
   * Gets a Voictent cached by a Gepp.
   *
   * @modifies the cache of Voictents with a new Voictent if one does not already exist for the given gepp
   * @param gepp the key of the Voictent to get
   * @returns the cached Voictent or a new Voictent
   */
  getOrInstantiateAndGetVoictent(gepp: Gepp): Voictent<Quirm> {
    let voictent = this.get(gepp);

    if (voictent === undefined) {
      voictent = new Voictent();
      this.set(gepp, voictent);
    }

    return voictent;
  }

  addQuirmsToVoictents(quirmTuple: QuirmTuple): void {
    const quirmAndGeppPairs = quirmTuple.flatMap((quirm) => {
      return quirm.geppTuple.map((gepp) => {
        return {
          quirm,
          gepp,
        };
      });
    });

    quirmAndGeppPairs.forEach(({ quirm, gepp }) => {
      this.addQuirmByGepp(quirm, gepp);
    });
  }

  addQuirmByGepp(quirm: Quirm, gepp: Gepp): void {
    const voictent = this.getOrInstantiateAndGetVoictent(gepp);
    voictent.addStraline(quirm);
    this.set(gepp, voictent);
  }
}
