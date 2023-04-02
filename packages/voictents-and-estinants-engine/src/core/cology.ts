import { Zorn } from '../utilities/semantic-types/zorn';
import { Gepp } from './gepp';
import { Hubblepup, HubblepupTuple } from './hubblepup';
import { Mabz } from './mabz';

/**
 * A left input and a respective Mabz.
 * This helps the engine find all of the right inputs associated with the left input
 */
export type Cology = {
  leftGepp: Gepp;
  leftInput: Hubblepup | HubblepupTuple;
  mabz: Mabz;
};

export type CologyEntry = [Gepp, Zorn];

export const getCologyEntryList = (cology: Cology): CologyEntry[] => {
  const leftEntry: CologyEntry = [cology.leftGepp, cology.leftInput];

  const nestedRightEntryList = [...cology.mabz.entries()];

  const flattenedRightEntryList = nestedRightEntryList.flatMap<CologyEntry>(
    ([gepp, zornTuple]) => {
      return zornTuple.map<CologyEntry>((zorn) => {
        return [gepp, zorn];
      });
    },
  );

  const entryList = [leftEntry, ...flattenedRightEntryList];
  return entryList;
};

export class CologySet extends Set<Cology> {}
