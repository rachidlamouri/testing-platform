import { Zorn } from '../../../package-agnostic-utilities/datastructure/zorn';
import { Dreanor, LeftDreanor } from '../dreanor/dreanor';
import { Mabz } from './mabz';

/**
 * A left input and its stream connection plus every right input id tuple and
 * their respective stream connections (one connection per tuple). This helps
 * the engine find all of the right inputs associated with the left input. The
 * engine does not assume the shape of a streamable, so the id of the left input
 * is unknown, and therefore the group must store the left input itself.
 *
 * @readableName TransformInputIdGroup
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
