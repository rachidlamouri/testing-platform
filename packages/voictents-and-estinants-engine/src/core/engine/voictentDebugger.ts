import { Hubblepup } from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';
import { Voictent2 } from './voictent2';

type OnHubblepupAddedToVoictentEvent<
  TGepp extends Gepp,
  THubblepup extends Hubblepup,
> = {
  voictent: Voictent2<TGepp, THubblepup>;
  hubblepup: THubblepup;
};

export type IVoictentDebugger<
  TGepp extends Gepp,
  THubblepup extends Hubblepup,
> = {
  onHubblepupAddedToVoictent: (
    event: OnHubblepupAddedToVoictentEvent<TGepp, THubblepup>,
  ) => void;
};
