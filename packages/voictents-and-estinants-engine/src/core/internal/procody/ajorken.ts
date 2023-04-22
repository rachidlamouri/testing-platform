import { Zorn } from '../../../utilities/semantic-types/zorn';
import { CologySet } from './cology';

/**
 * This lets the engine find any Cology that might be ready to be processed whenever
 * an element of that cology changes. Right inputs can be part of multiple cologies for various left inputs.
 */
export class Ajorken extends Map<Zorn, CologySet> {}
