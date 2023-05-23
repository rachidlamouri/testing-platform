import { Gepp } from '../../core/engine-shell/voictent/gepp';
import { Voque } from '../../core/engine/voque';
import { Odeshin } from './odeshin';

export type OdeshinIndexByName = {
  zorn: string;
};

export type OdeshinVoque<
  TGepp extends Gepp,
  THubblepup extends Odeshin,
  TEmittedVoictent,
> = Voque<TGepp, THubblepup, THubblepup, OdeshinIndexByName, TEmittedVoictent>;

export type GenericOdeshinVoque = OdeshinVoque<Gepp, Odeshin, unknown>;
