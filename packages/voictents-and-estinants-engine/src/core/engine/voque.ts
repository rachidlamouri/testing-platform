import {
  Hubblepup,
  HubblepupIndexByName,
  IndexedHubblepup,
} from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';

export type VoictentConfiguration<
  TGepp extends Gepp,
  TReceivedHubblepup extends Hubblepup,
  TEmittedHubblepup extends Hubblepup,
  IndexByName extends HubblepupIndexByName,
  TEmittedVoictent,
> = {
  gepp: TGepp;
  indexByName: IndexByName;
  receivedHubblepup: TReceivedHubblepup;
  emittedHubblepup: TEmittedHubblepup;
  indexedEmittedHubblepup: IndexedHubblepup<TEmittedHubblepup, IndexByName>;
  emittedVoictent: TEmittedVoictent;
};

export type GenericVoictentConfiguration = VoictentConfiguration<
  Gepp,
  Hubblepup,
  Hubblepup,
  HubblepupIndexByName,
  unknown
>;
