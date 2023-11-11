import {
  MutableStreamConnectionStateTuple,
  LeftMutableStreamConnectionState,
  RightMutableStreamConnectionStateTuple,
} from './mutable-stream-connection-state/mutableStreamConnectionState';
import { GenericProgrammedTransform2 } from '../types/programmed-transform/programmedTransform';
import { TransformInputKeyGroupSetCacheCache } from './transform-input-key-group-set-cache-cache/transformInputKeyGroupSetCacheCache';
import { CollectionIdSet } from '../types/collection/collectionId';
import { GenericCollection2 } from '../types/collection/collection2';

/**
 * A programmed transform wrapper that is used to connect collections to
 * transforms.
 *
 * @readableName MutableTransformState
 */
export type MutableTransformState2 = {
  programmedTransform: GenericProgrammedTransform2;
  leftMutableStreamConnectionState: LeftMutableStreamConnectionState;
  rightMutableStreamConnectionStateTuple: RightMutableStreamConnectionStateTuple;
  outputCollectionIdSet: CollectionIdSet;
  transformInputKeyGroupSetCacheCache: TransformInputKeyGroupSetCacheCache;
  executionCount: number;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependencySet: Set<MutableCollectionState>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  mutableDependencySet: Set<MutableCollectionState>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependentSet: Set<MutableCollectionState>;
};

export const getMutableStreamConnectionStateTuple = (
  mutableTransformState: MutableTransformState2,
): MutableStreamConnectionStateTuple => [
  mutableTransformState.leftMutableStreamConnectionState,
  ...mutableTransformState.rightMutableStreamConnectionStateTuple,
];

export type MutableCollectionState = {
  collection: GenericCollection2;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependencySet: Set<MutableTransformState2>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  mutableDependencySet: Set<MutableTransformState2>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependentSet: Set<MutableTransformState2>;
};
