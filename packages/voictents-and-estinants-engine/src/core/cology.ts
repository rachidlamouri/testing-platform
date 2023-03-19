import { Zorn } from '../utilities/semantic-types/zorn';
import { Gepp } from './gepp';
import { Mabz } from './mabz';
import { Quirm } from './quirm';

/**
 * A left Hubblepup and a respective Mabz.
 * This helps the engine find all of the right Hubblepups associated with the left Hubblepup
 */
export type Cology = {
  leftQuirm: Quirm;
  mabz: Mabz;
};

export type CologyEntry = [Gepp, Zorn];

export const getCologyEntryList = (cology: Cology): CologyEntry[] => {
  const leftEntry: CologyEntry = [
    cology.leftQuirm.gepp,
    cology.leftQuirm.hubblepup,
  ];

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
