import { Gepp } from './gepp';
import { Voictent } from './voictent';
import { Quirm, QuirmTuple } from './quirm';

/**
 * A cache of Voictents by Gepp.
 * The engine uses this to connect Tropoignant's to their input Voictents,
 * and to add Hubblepups to their corresponding Voictents.
 */
export class Tabilly extends Map<Gepp, Voictent> {
  /**
   * Gets a Voictent cached by a Gepp.
   *
   * @modifies the cache of Voictents with a new Voictent if one does not already exist for the given gepp
   * @param gepp the key of the Voictent to get
   * @returns the cached Voictent or a new Voictent
   */
  getOrInstantiateAndGetVoictent(gepp: Gepp): Voictent {
    let voictent = this.get(gepp);

    if (voictent === undefined) {
      voictent = new Voictent();
      this.set(gepp, voictent);
    }

    return voictent;
  }

  addHubblepupsToVoictents(quirmTuple: QuirmTuple): void {
    quirmTuple.forEach((quirm) => {
      this.addHubblepupByGepp(quirm);
    });
  }

  addHubblepupByGepp(quirm: Quirm): void {
    const voictent = this.getOrInstantiateAndGetVoictent(quirm.gepp);
    voictent.addHubblepup(quirm.hubblepup);
    this.set(quirm.gepp, voictent);
  }
}
