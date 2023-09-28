import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import {
  Croarder,
  GenericCroader3,
} from '../../engine-shell/appreffinge/input/right/croarder';
import {
  Framation,
  GenericFramation3,
} from '../../engine-shell/appreffinge/input/right/framation';
import { Gepp } from '../../engine-shell/voictent/gepp';
import {
  GenericVoictentItemLanbe2,
  GenericVoictentPelieLanbe,
  Lanbe,
} from '../../engine-shell/voictent/lanbe';
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
  croard: Croarder | GenericCroader3;
};

/**
 * Contains the information needed to identify a Voictent, and to stream and cache its Hubblepups
 */
export type RightDreanor = RightVoictentDreanor | RightVoictentItem2Dreanor;

export type RightDreanorTuple = readonly RightDreanor[];

export type Dreanor = LeftDreanor | RightDreanor;

export type DreanorTuple = Tuple<Dreanor>;
