import { Gepp } from '../engine-shell/voictent/gepp';
import { SpreadN } from '../../utilities/spreadN';
import { HubblepupPelieLanbe2 } from '../engine-shell/voictent/lanbe';
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

type InMemoryOdeshin2Voque<
  TGepp extends Gepp,
  THubblepup extends GenericOdeshin2,
  TVoictentPelie,
> = InMemoryVoque<
  TGepp,
  THubblepup,
  THubblepup,
  InMemoryOdeshin2IndexByName,
  TVoictentPelie
>;

type GenericInMemoryOdeshin2Voque = InMemoryOdeshin2Voque<
  Gepp,
  GenericOdeshin2,
  unknown
>;

const getHumanReadableZorn = (odeshin: GenericOdeshin2): string => {
  const result =
    typeof odeshin.zorn === 'string' ? odeshin.zorn : odeshin.zorn.forHuman;

  return result;
};

export abstract class BaseInMemoryOdeshin2Voictent<
  TRestrictingVoque extends GenericInMemoryOdeshin2Voque,
  TVoque extends TRestrictingVoque,
> extends AbstractInMemoryVoictent<TRestrictingVoque, TVoque> {
  // TODO: rename this to just odeshinByZorn, HubblepupPelue and HubblepupPelie are the same in this context
  protected hubblepupPelueByZorn = new Map<string, TVoque['hubblepupPelue']>();

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

  protected dereferenceHubblepupPelie(
    lanbe: HubblepupPelieLanbe2<TRestrictingVoque, TVoque>,
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

export type InMemoryOdeshin2ListVoque<
  TGepp extends Gepp,
  TOdeshin extends GenericOdeshin2,
> = InMemoryOdeshin2Voque<TGepp, TOdeshin, TOdeshin[]>;

export type GenericInMemoryOdeshin2ListVoque = InMemoryOdeshin2ListVoque<
  Gepp,
  GenericOdeshin2
>;

export class InMemoryOdeshin2ListVoictent<
  TVoque extends GenericInMemoryOdeshin2ListVoque,
> extends BaseInMemoryOdeshin2Voictent<
  GenericInMemoryOdeshin2ListVoque,
  TVoque
> {
  protected dereferenceVoictentPelie(): TVoque['voictentPelie'] {
    return this.hubblepupPelieTuple;
  }
}

type InMemoryOdeshin3VoictentPelie<TOdeshinPelie> = {
  byZorn: Map<string, TOdeshinPelie>;
  list: TOdeshinPelie[];
};

export type InMemoryOdeshin3Voque<
  TGepp extends Gepp,
  TOdeshin extends GenericOdeshin2,
> = InMemoryOdeshin2Voque<
  TGepp,
  TOdeshin,
  InMemoryOdeshin3VoictentPelie<TOdeshin>
>;

type GenericinMemoryOdeshin3Voque = InMemoryOdeshin3Voque<
  Gepp,
  GenericOdeshin2
>;

export class InMemoryOdeshin3Voictent<
  TVoque extends GenericinMemoryOdeshin3Voque,
> extends BaseInMemoryOdeshin2Voictent<GenericinMemoryOdeshin3Voque, TVoque> {
  protected dereferenceVoictentPelie(): TVoque['voictentPelie'] {
    return {
      byZorn: this.hubblepupPelueByZorn,
      list: this.hubblepupPelieTuple,
    };
  }
}
