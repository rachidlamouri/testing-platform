import { Gepp } from '../types/voictent/gepp';
import { GenericVoictent2 } from '../types/voictent/voictent2';

/**
 * A cache of Voictents by Gepp.
 * The engine uses this to connect Tropoignant's to their input Voictents,
 * and to add Hubblepups to their corresponding Voictents.
 */
export class Tabilly extends Map<Gepp, GenericVoictent2> {}
