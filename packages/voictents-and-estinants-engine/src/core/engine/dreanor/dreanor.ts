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
import { Prected } from './prected';

export enum DreanorTypeName {
  LeftDreanor = 'LeftDreanor',
  RightVoictentDreanor = 'RightVoictentDreanor',
  RightVoictentItemDreanor = 'RightVoictentItemDreanor',
  RightVoictentItem2Dreanor = 'RightVoictentItem2Dreanor',
}

/**
 * Contains the information needed to identify a Voictent, and to stream its Hubblepups
 */
export type LeftDreanor = {
  typeName: DreanorTypeName.LeftDreanor;
  gepp: CollectionId;
  lanbe: Stream;
  isReady: boolean;
};

export type RightVoictentDreanor = {
  typeName: DreanorTypeName.RightVoictentDreanor;
  gepp: CollectionId;
  lanbe: GenericCollectionStream;
  isReady: boolean;
  mutableReference?: unknown;
};

export type RightVoictentItem2Dreanor = {
  typeName: DreanorTypeName.RightVoictentItem2Dreanor;
  gepp: CollectionId;
  lanbe: GenericCollectionItemStream2;
  prected: Prected;
  framate: RightKeyTupleAccessor | GenericRightKeyTupleAccessor3;
  croard: RightKeyAccessor | GenericRightKeyAccessor3;
};

export type RightDreanor = RightVoictentDreanor | RightVoictentItem2Dreanor;

export type RightDreanorTuple = readonly RightDreanor[];

/**
 * The information needed to identify a collection, to stream its contents, and
 * to track when a collection is ready to be streamed.
 *
 * @readableName MutableStreamConnectionState
 */
export type Dreanor = LeftDreanor | RightDreanor;

export type DreanorTuple = Tuple<Dreanor>;
