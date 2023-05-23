import { Odeshin } from '../../custom/adapter/odeshin';
import { Gepp } from '../engine-shell/voictent/gepp';
import { SpreadN } from '../../utilities/spreadN';
import { VoictentItemLanbe2 } from '../engine-shell/voictent/lanbe';
import {
  AbstractInMemoryVoictent,
  DereferenceError,
} from './abstractInMemoryVoictent';
import { InMemoryIndexByName, InMemoryVoque } from './inMemoryVoque';

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
> extends AbstractInMemoryVoictent<GenericInMemoryOdeshinVoque, TVoque> {
  protected dereference(
    lanbe: VoictentItemLanbe2<GenericInMemoryOdeshinVoque, TVoque>,
  ): TVoque['indexedEmittedHubblepup'] {
    const listIndex = this.getLanbeIndex(lanbe);

    if (listIndex === AbstractInMemoryVoictent.minimumInclusiveIndex) {
      throw new DereferenceError(lanbe);
    }

    const hubblepup = this.hubblepupTuple[listIndex];
    return {
      hubblepup,
      indexByName: {
        serializableId: hubblepup.zorn,
        listIndex,
        zorn: hubblepup.zorn,
      },
    };
  }
}
