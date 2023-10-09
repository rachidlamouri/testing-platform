import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import {
  Croarder,
  GenericCroarder3,
} from '../../types/appreffinge/input/right/croarder';
import {
  Framation,
  GenericFramation3,
} from '../../types/appreffinge/input/right/framation';
import { Gepp } from '../../types/voictent/gepp';
import {
  GenericVoictentItemLanbe2,
  GenericVoictentPelieLanbe,
  Lanbe,
} from '../../types/lanbe/lanbe';
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
  gepp: Gepp;
  lanbe: Lanbe;
  isReady: boolean;
};

export type RightVoictentDreanor = {
  typeName: DreanorTypeName.RightVoictentDreanor;
  gepp: Gepp;
  lanbe: GenericVoictentPelieLanbe;
  isReady: boolean;
  mutableReference?: unknown;
};

export type RightVoictentItem2Dreanor = {
  typeName: DreanorTypeName.RightVoictentItem2Dreanor;
  gepp: Gepp;
  lanbe: GenericVoictentItemLanbe2;
  prected: Prected;
  framate: Framation | GenericFramation3;
  croard: Croarder | GenericCroarder3;
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
