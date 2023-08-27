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
      zorn: GenericOdeshin2['zorn'];
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

const getHumanReadableZorn = (odeshin: GenericOdeshin2): string => {
  const result =
    typeof odeshin.zorn === 'string' ? odeshin.zorn : odeshin.zorn.forHuman;

  return result;
};

export class InMemoryOdeshin2Voictent<
  TVoque extends GenericInMemoryOdeshin2Voque,
> extends AbstractInMemoryVoictent<GenericInMemoryOdeshin2Voque, TVoque> {
  private hubblepupByZorn = new Map<string, TVoque['receivedHubblepup']>();

  addHubblepup(hubblepup: TVoque['receivedHubblepup']): void {
    super.addHubblepup(hubblepup);

    const humanReadableZorn = getHumanReadableZorn(hubblepup);

    if (this.hubblepupByZorn.has(humanReadableZorn)) {
      const error = new Error(`Duplicate zorn: ${humanReadableZorn}`);
      Object.assign(error, {
        gepp: this.gepp,
        zorn: humanReadableZorn,
        existing: this.hubblepupByZorn.get(humanReadableZorn),
        duplicate: hubblepup,
      });

      throw error;
    } else {
      this.hubblepupByZorn.set(humanReadableZorn, hubblepup);
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
    const humanReadableZorn = getHumanReadableZorn(odeshin);
    return {
      hubblepup: odeshin,
      indexByName: {
        serializableId: humanReadableZorn.replaceAll('/', ' | '),
        listIndex,
        zorn: odeshin.zorn,
      },
    };
  }
}
