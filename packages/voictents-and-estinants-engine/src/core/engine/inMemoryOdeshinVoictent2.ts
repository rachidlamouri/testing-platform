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
  TVoictentPelie = THubblepup[],
> = InMemoryVoque<
  TGepp,
  THubblepup,
  THubblepup,
  InMemoryOdeshin2IndexByName,
  TVoictentPelie
>;

export type GenericInMemoryOdeshin2Voque = InMemoryOdeshin2Voque<
  Gepp,
  GenericOdeshin2,
  unknown
>;

const getHumanReadableZorn = (odeshin: GenericOdeshin2): string => {
  const result =
    typeof odeshin.zorn === 'string' ? odeshin.zorn : odeshin.zorn.forHuman;

  return result;
};

export class InMemoryOdeshin2Voictent<
  TVoque extends GenericInMemoryOdeshin2Voque,
> extends AbstractInMemoryVoictent<GenericInMemoryOdeshin2Voque, TVoque> {
  private hubblepupPelueByZorn = new Map<string, TVoque['hubblepupPelue']>();

  addHubblepup(hubblepup: TVoque['hubblepupPelue']): void {
    super.addHubblepup(hubblepup);

    const humanReadableZorn = getHumanReadableZorn(hubblepup);

    if (this.hubblepupPelueByZorn.has(humanReadableZorn)) {
      const error = new Error(`Duplicate zorn: ${humanReadableZorn}`);
      Object.assign(error, {
        gepp: this.gepp,
        zorn: humanReadableZorn,
        existing: this.hubblepupPelueByZorn.get(humanReadableZorn),
        duplicate: hubblepup,
      });

      throw error;
    } else {
      this.hubblepupPelueByZorn.set(humanReadableZorn, hubblepup);
    }
  }

  protected dereference(
    lanbe: VoictentItemLanbe2<GenericInMemoryOdeshin2Voque, TVoque>,
  ): TVoque['indexedHubblepupPelie'] {
    const listIndex = this.getLanbeIndex(lanbe);

    if (listIndex === AbstractInMemoryVoictent.minimumInclusiveIndex) {
      throw new DereferenceError(lanbe);
    }

    const odeshin = this.hubblepupPelieTuple[listIndex];
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
