import { ZornTuple } from '../../../utilities/semantic-types/zorn';
import { GenericIndexedHubblepup, Hubblepup } from '../quirm/hubblepup';

/**
 * A function that takes the leftmost Hubblepup of a Cology and outputs a Zorn tuple for one of the other members of the Cology
 */
export type Framation = (leftHubblepup: Hubblepup) => ZornTuple;

export type Framation2 = (
  leftIndexedHubblepup: GenericIndexedHubblepup,
) => ZornTuple;
