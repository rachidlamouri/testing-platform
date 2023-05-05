import { Odeshin } from '../../custom/adapter/odeshin';
import { Gepp } from '../engine-shell/voictent/gepp';
import { InMemoryVoictent, InMemoryVoque } from './inMemoryVoictent';

export type InMemoryOdeshinVoque<
  TGepp extends Gepp,
  THubblepup extends Odeshin,
> = InMemoryVoque<TGepp, THubblepup>;

export type GenericInMemoryOdeshinVoque = InMemoryVoque<Gepp, Odeshin>;

export class InMemoryOdeshinVoictent<
  TVoque extends GenericInMemoryOdeshinVoque,
> extends InMemoryVoictent<TVoque> {
  // eslint-disable-next-line class-methods-use-this
  getSerializableId(hubblepup: TVoque['receivedHubblepup']): string {
    // TODO: move the responsibility of normalizing the serializable id elsewhere
    return hubblepup.zorn.replaceAll('/', ' | ');
  }
}
