import {
  Hubblepup,
  HubblepupIndexByName,
  IndexedHubblepup,
} from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';

export type VoictentConfiguration<
  TGepp extends Gepp,
  TInputHubblepup extends Hubblepup,
  TOutputHubblepup extends Hubblepup,
  IndexByName extends HubblepupIndexByName,
  TOutputVoictent,
> = {
  gepp: TGepp;
  indexByName: IndexByName;
  inputHubblepup: TInputHubblepup;
  outputHubblepup: TOutputHubblepup;
  indexedOutputHubblepup: IndexedHubblepup<TOutputHubblepup, IndexByName>;
  outputVoictent: TOutputVoictent;
};

export type GenericVoictentConfiguration = VoictentConfiguration<
  Gepp,
  Hubblepup,
  Hubblepup,
  HubblepupIndexByName,
  unknown
>;
