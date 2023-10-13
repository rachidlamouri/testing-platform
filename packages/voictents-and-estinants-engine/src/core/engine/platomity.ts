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
export type Platomity2 = {
  version: 2;
  programmedTransform: GenericProgrammedTransform2;
  leftDreanor: LeftMutableStreamConnectionState;
  rightDreanorTuple: RightMutableStreamConnectionStateTuple;
  outputGeppSet: CollectionIdSet;
  procody: TransformInputKeyGroupSetCacheCache;
  executionCount: number;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependencySet: Set<Virok>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  mutableDependencySet: Set<Virok>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependentSet: Set<Virok>;
};

export const getDreanorTuple = (
  platomity: Platomity2,
): MutableStreamConnectionStateTuple => [
  platomity.leftDreanor,
  ...platomity.rightDreanorTuple,
];

export type Virok = {
  voictent: GenericCollection2;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependencySet: Set<Platomity2>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  mutableDependencySet: Set<Platomity2>;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  dependentSet: Set<Platomity2>;
};
