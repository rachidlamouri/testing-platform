import { Zorn } from '../utilities/semantic-types/zorn';
import { Dreanor, LeftDreanor } from './dreanor';
import { Hubblepup, HubblepupTuple } from './hubblepup';
import { Mabz } from './mabz';

/**
 * A left input and a respective Mabz.
 * This helps the engine find all of the right inputs associated with the left input
 */
export type Cology = {
  leftDreanor: LeftDreanor;
  leftInput: Hubblepup | HubblepupTuple;
  mabz: Mabz;
};

export type CologyEntry = [Dreanor, Zorn];

export const getCologyEntryList = (cology: Cology): CologyEntry[] => {
  const leftEntry: CologyEntry = [cology.leftDreanor, cology.leftInput];

  const nestedRightEntryList = [...cology.mabz.entries()];

  const flattenedRightEntryList = nestedRightEntryList.flatMap<CologyEntry>(
    ([rightDreanor, zornTuple]) => {
      return zornTuple.map<CologyEntry>((zorn) => {
        return [rightDreanor, zorn];
      });
    },
  );

  const entryList = [leftEntry, ...flattenedRightEntryList];
  return entryList;
};

export class CologySet extends Set<Cology> {}
