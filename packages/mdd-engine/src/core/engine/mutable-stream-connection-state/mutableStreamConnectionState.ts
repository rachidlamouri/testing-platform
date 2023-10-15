import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import {
  RightKeyAccessor,
  GenericRightKeyAccessor3,
} from '../../types/stream-configuration/input/right/rightKeyAccessor';
import {
  RightKeyTupleAccessor,
  GenericRightKeyTupleAccessor3,
} from '../../types/stream-configuration/input/right/rightKeyTupleAccessor';
import { CollectionId } from '../../types/collection/collectionId';
import {
  GenericCollectionItemStream2,
  GenericCollectionStream,
  Stream,
} from '../../types/stream/stream';
import { ItemCache } from './itemCache';

export enum MutableStreamConnectionStateTypeName {
  LeftMutableStreamConnectionState = 'LeftDreanor',
  RightCollectionMutableStreamConnectionState = 'RightVoictentDreanor',
  RightCollectionItemMutableStreamConnectionState = 'RightVoictentItemDreanor',
  RightCollectionItem2MutableStreamConnectionState = 'RightVoictentItem2Dreanor',
}

/**
 * Contains the information needed to identify a Voictent, and to stream its Hubblepups
 */
export type LeftMutableStreamConnectionState = {
  typeName: MutableStreamConnectionStateTypeName.LeftMutableStreamConnectionState;
  collectionId: CollectionId;
  stream: Stream;
  isReady: boolean;
};

export type RightCollectionMutableStreamConnectionState = {
  typeName: MutableStreamConnectionStateTypeName.RightCollectionMutableStreamConnectionState;
  collectionId: CollectionId;
  stream: GenericCollectionStream;
  isReady: boolean;
  mutableReference?: unknown;
};

export type RightCollectionItem2MutableStreamConnectionState = {
  typeName: MutableStreamConnectionStateTypeName.RightCollectionItem2MutableStreamConnectionState;
  collectionId: CollectionId;
  stream: GenericCollectionItemStream2;
  itemCache: ItemCache;
  getRightKeyTuple: RightKeyTupleAccessor | GenericRightKeyTupleAccessor3;
  getRightKey: RightKeyAccessor | GenericRightKeyAccessor3;
};

export type RightMutableStreamConnectionState =
  | RightCollectionMutableStreamConnectionState
  | RightCollectionItem2MutableStreamConnectionState;

export type RightMutableStreamConnectionStateTuple =
  readonly RightMutableStreamConnectionState[];

/**
 * The information needed to identify a collection, to stream its contents, and
 * to track when a collection is ready to be streamed.
 *
 * @readableName MutableStreamConnectionState
 *
 * @canonicalDeclaration
 */
export type MutableStreamConnectionState =
  | LeftMutableStreamConnectionState
  | RightMutableStreamConnectionState;

export type MutableStreamConnectionStateTuple =
  Tuple<MutableStreamConnectionState>;
