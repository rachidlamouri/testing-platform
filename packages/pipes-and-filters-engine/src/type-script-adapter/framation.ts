import { Vicken, VickenZornTuple } from './vicken';
import { Vition } from './vition';
import { VoictentToHubblepup } from './voictent';

/**
 * A function that takes the leftmost Hubblepup of a Cology and outputs a Zorn tuple for one of the other members of the Cology
 */
export type Framation<TVition extends Vition, TVicken extends Vicken> = (
  leftHubblepup: VoictentToHubblepup<TVition['leftVoictent']>,
) => VickenZornTuple<TVicken>;
