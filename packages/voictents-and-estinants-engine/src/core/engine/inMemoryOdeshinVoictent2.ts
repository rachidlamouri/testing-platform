import { Gepp } from '../engine-shell/voictent/gepp';
import { SpreadN } from '../../utilities/spreadN';
import { VoictentItemLanbe2 } from '../engine-shell/voictent/lanbe';
import { GenericOdeshin2 } from '../../custom/adapter/odeshin2';
import {
  AbstractInMemoryVoictent,
  DereferenceError,
} from './abstractInMemoryVoictent';
import { InMemoryIndexByName, InMemoryVoque } from './inMemoryVoque';

type InMemoryOdeshin2IndexByName = SpreadN<
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
> = InMemoryVoque<TGepp, THubblepup, THubblepup, InMemoryOdeshin2IndexByName>;

export type GenericInMemoryOdeshin2Voque = InMemoryOdeshin2Voque<
  Gepp,
  GenericOdeshin2
>;

export class InMemoryOdeshin2Voictent<
  TVoque extends GenericInMemoryOdeshin2Voque,
> extends AbstractInMemoryVoictent<GenericInMemoryOdeshin2Voque, TVoque> {
  private hubblepupByZorn = new Map<string, TVoque['receivedHubblepup']>();

  addHubblepup(hubblepup: TVoque['receivedHubblepup']): void {
    super.addHubblepup(hubblepup);

    if (this.hubblepupByZorn.has(hubblepup.zorn)) {
      // TODO: turn this into a ProgramError and find a way to get in the ProgramError collection
      // eslint-disable-next-line no-console
      console.error('DUPLICATE ZORN', {
        gepp: this.gepp,
        zorn: hubblepup.zorn,
        existing: this.hubblepupByZorn.get(hubblepup.zorn),
        duplicate: hubblepup,
      });
      // eslint-disable-next-line no-console
      console.log();
    } else {
      this.hubblepupByZorn.set(hubblepup.zorn, hubblepup);
    }
  }

  protected dereference(
    lanbe: VoictentItemLanbe2<GenericInMemoryOdeshin2Voque, TVoque>,
  ): TVoque['indexedEmittedHubblepup'] {
    const listIndex = this.getLanbeIndex(lanbe);

    if (listIndex === AbstractInMemoryVoictent.minimumInclusiveIndex) {
      throw new DereferenceError(lanbe);
    }

    const odeshin = this.hubblepupTuple[listIndex];
    return {
      hubblepup: odeshin,
      indexByName: {
        serializableId: odeshin.zorn.replaceAll('/', ' | '),
        listIndex,
        zorn: odeshin.zorn,
      },
    };
  }
}
