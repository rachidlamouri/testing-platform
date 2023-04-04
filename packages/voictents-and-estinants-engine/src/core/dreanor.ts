import { Tuple } from '../utilities/semantic-types/tuple';
import { Croarder } from './croarder';
import { Framation } from './framation';
import { Gepp } from './gepp';
import { Lanbe, VoictentItemLanbe, VoictentLanbe } from './lanbe';
import { Prected } from './prected';

export enum DreanorTypeName {
  LeftDreanor = 'LeftDreanor',
  RightVoictentDreanor = 'RightVoictentDreanor',
  RightVoictentItemDreanor = 'RightVoictentItemDreanor',
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
  framate: Framation;
  croard: Croarder;
  prected: Prected;
};

/**
 * Contains the information needed to identify a Voictent, and to stream and cache its Hubblepups
 */
export type RightDreanor = RightVoictentDreanor | RightVoictentItemDreanor;

export type RightDreanorTuple = readonly RightDreanor[];

export type Dreanor = LeftDreanor | RightDreanor;

export type DreanorTuple = Tuple<Dreanor>;
