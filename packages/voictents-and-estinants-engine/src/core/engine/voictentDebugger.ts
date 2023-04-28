import { Straline } from '../../utilities/semantic-types/straline';
import { Hubblepup } from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';
import { Voictent2 } from './voictent2';

type OnHubblepupAddedToVoictentEvent<
  TGepp extends Gepp,
  THubblepup extends Hubblepup,
  TIndex extends Straline,
> = {
  voictent: Voictent2<TGepp, THubblepup, TIndex>;
  hubblepup: THubblepup;
};

export type IVoictentDebugger<
  TGepp extends Gepp,
  THubblepup extends Hubblepup,
  TIndex extends Straline,
> = {
  onHubblepupAddedToVoictent: (
    event: OnHubblepupAddedToVoictentEvent<TGepp, THubblepup, TIndex>,
  ) => void;
};
