import { Odeshin } from '../../custom/adapter/odeshin';
import { Gepp } from '../engine-shell/voictent/gepp';
import {
  InMemoryIndexByName,
  InMemoryVoictent,
  InMemoryVoque,
} from './inMemoryVoictent';
import { SpreadN } from '../../utilities/spreadN';
import { VoictentItemLanbe2 } from '../engine-shell/voictent/lanbe';

export type InMemoryOdeshinIndexByName = SpreadN<
  [
    InMemoryIndexByName,
    {
      zorn: string;
    },
  ]
>;

export type InMemoryOdeshinVoque<
  TGepp extends Gepp,
  THubblepup extends Odeshin,
> = InMemoryVoque<TGepp, THubblepup, InMemoryOdeshinIndexByName>;

export type GenericInMemoryOdeshinVoque = InMemoryOdeshinVoque<Gepp, Odeshin>;

export class InMemoryOdeshinVoictent<
  TVoque extends GenericInMemoryOdeshinVoque,
> extends InMemoryVoictent<TVoque> {
  // eslint-disable-next-line class-methods-use-this
  getSerializableId(hubblepup: TVoque['receivedHubblepup']): string {
    // TODO: move the responsibility of normalizing the serializable id elsewhere
    return hubblepup.zorn.replaceAll('/', ' | ');
  }

  // TODO: there is no signal that this function is required to exist. If it doesn't exist then "zorn" would be undefined in indexByName
  dereference(
    lanbe: VoictentItemLanbe2<TVoque>,
  ): TVoque['indexedEmittedHubblepup'] {
    const partialIndexedHubblepup = super.dereference(lanbe);

    return {
      hubblepup: partialIndexedHubblepup.hubblepup,
      indexByName: {
        ...partialIndexedHubblepup.indexByName,
        zorn: partialIndexedHubblepup.hubblepup.zorn,
      },
    };
  }
}
