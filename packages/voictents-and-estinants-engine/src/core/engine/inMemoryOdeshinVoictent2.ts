import { Gepp } from '../engine-shell/voictent/gepp';
import {
  InMemoryIndexByName,
  InMemoryVoictent,
  InMemoryVoque,
} from './inMemoryVoictent';
import { SpreadN } from '../../utilities/spreadN';
import { VoictentItemLanbe2 } from '../engine-shell/voictent/lanbe';
import { GenericOdeshin2 } from '../../custom/adapter/odeshin2';

export type InMemoryOdeshin2IndexByName = SpreadN<
  [
    InMemoryIndexByName,
    {
      zorn: string;
    },
  ]
>;

export type InMemoryOdeshin2Voque<
  TGepp extends Gepp,
  THubblepup extends GenericOdeshin2,
> = InMemoryVoque<TGepp, THubblepup, InMemoryOdeshin2IndexByName>;

export type GenericInMemoryOdeshin2Voque = InMemoryOdeshin2Voque<
  Gepp,
  GenericOdeshin2
>;

export class InMemoryOdeshin2Voictent<
  TVoque extends GenericInMemoryOdeshin2Voque,
> extends InMemoryVoictent<TVoque> {
  // eslint-disable-next-line class-methods-use-this
  getSerializableId(odeshin: TVoque['receivedHubblepup']): string {
    // TODO: move the responsibility of normalizing the serializable id elsewhere
    return odeshin.zorn.replaceAll('/', ' | ');
  }

  // TODO: there is no signal that this function is required to exist. If it doesn't exist then "zorn" would be undefined in indexByName
  dereference(
    lanbe: VoictentItemLanbe2<TVoque>,
  ): TVoque['indexedEmittedHubblepup'] {
    const partialIndexedHubblepup = super.dereference(lanbe);

    const odeshin = partialIndexedHubblepup.hubblepup;

    return {
      hubblepup: odeshin,
      indexByName: {
        ...partialIndexedHubblepup.indexByName,
        zorn: odeshin.zorn,
      },
    };
  }
}
