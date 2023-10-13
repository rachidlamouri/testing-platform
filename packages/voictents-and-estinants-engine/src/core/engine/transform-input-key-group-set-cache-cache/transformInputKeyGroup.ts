import { DeprecatedId } from '../../../package-agnostic-utilities/data-structure/id';
import {
  MutableStreamConnectionState,
  LeftMutableStreamConnectionState,
} from '../mutable-stream-connection-state/mutableStreamConnectionState';
import { RightInputKeyTupleCache } from './rightInputKeyTupleCache';

/**
 * A left input and its stream connection plus every right input id tuple and
 * their respective stream connections (one connection per tuple). This helps
 * the engine find all of the right inputs associated with the left input. The
 * engine does not assume the shape of an item, so the id of the left input
 * is unknown, and therefore the group must store the left input itself.
 *
 * @readableName TransformInputKeyGroup
 */
export type TransformInputKeyGroup = {
  leftMutableStreamConnectionState: LeftMutableStreamConnectionState;
  leftInput: unknown;
  rightInputKeyTupleCache: RightInputKeyTupleCache;
  hasTriggered: boolean;
};

type TransformInputKeyGroupEntry = [MutableStreamConnectionState, DeprecatedId];

export const getTransformInputKeyGroupEntryList = (
  transformInputKeyGroup: TransformInputKeyGroup,
): TransformInputKeyGroupEntry[] => {
  const leftEntry: TransformInputKeyGroupEntry = [
    transformInputKeyGroup.leftMutableStreamConnectionState,
    transformInputKeyGroup.leftInput,
  ];

  const nestedRightEntryList = [
    ...transformInputKeyGroup.rightInputKeyTupleCache.entries(),
  ];

  const flattenedRightEntryList =
    nestedRightEntryList.flatMap<TransformInputKeyGroupEntry>(
      ([rightMutableStreamConnectionState, idTuple]) => {
        return idTuple.map<TransformInputKeyGroupEntry>((id) => {
          return [rightMutableStreamConnectionState, id];
        });
      },
    );

  const entryList = [leftEntry, ...flattenedRightEntryList];
  return entryList;
};

export class TransformInputKeyGroupSet extends Set<TransformInputKeyGroup> {}
