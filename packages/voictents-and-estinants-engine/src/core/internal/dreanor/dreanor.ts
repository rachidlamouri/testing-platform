import { Tuple } from '../../../utilities/semantic-types/tuple';
import { Croader2, Croarder } from '../../engine-shell/appreffinge/croarder';
import {
  Framation,
  Framation2,
} from '../../engine-shell/appreffinge/framation';
import { Gepp } from '../../engine-shell/voictent/gepp';
import {
  GenericVoictentItemLanbe2,
  Lanbe,
  VoictentItemLanbe,
  VoictentLanbe,
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
};

export type RightVoictentDreanor = {
  typeName: DreanorTypeName.RightVoictentDreanor;
  gepp: Gepp;
  lanbe: VoictentLanbe;
  isReady: boolean;
};

export type RightVoictentItemDreanor = {
  typeName: DreanorTypeName.RightVoictentItemDreanor;
  gepp: Gepp;
  lanbe: VoictentItemLanbe;
  prected: Prected;
  framate: Framation;
  croard: Croarder;
};

export type RightVoictentItem2Dreanor = {
  typeName: DreanorTypeName.RightVoictentItem2Dreanor;
  gepp: Gepp;
  lanbe: GenericVoictentItemLanbe2;
  prected: Prected;
  framate: Framation2;
  croard: Croader2;
};

/**
 * Contains the information needed to identify a Voictent, and to stream and cache its Hubblepups
 */
export type RightDreanor =
  | RightVoictentDreanor
  | RightVoictentItemDreanor
  | RightVoictentItem2Dreanor;

export type RightDreanorTuple = readonly RightDreanor[];

export type Dreanor = LeftDreanor | RightDreanor;

export type DreanorTuple = Tuple<Dreanor>;