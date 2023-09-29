import { Zorn } from '../../../package-agnostic-utilities/datastructure/zorn';
import { Dreanor, LeftDreanor } from '../dreanor/dreanor';
import { Mabz } from './mabz';

/**
 * A left input and a respective Mabz.
 * This helps the engine find all of the right inputs associated with the left input
 */
export type Cology = {
  leftDreanor: LeftDreanor;
  leftInput: unknown;
  mabz: Mabz;
  hasTriggered: boolean;
};

type CologyEntry = [Dreanor, Zorn];

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
