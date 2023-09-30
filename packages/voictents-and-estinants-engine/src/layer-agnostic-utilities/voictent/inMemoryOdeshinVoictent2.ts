/**
 * @noCanonicalDeclaration
 *
 * @todo find a better name for this file
 */

import { Gepp } from '../../core/types/voictent/gepp';
import { SpreadN } from '../../package-agnostic-utilities/type/spreadN';
import { HubblepupPelieLanbe2 } from '../../core/types/lanbe/lanbe';
import { GenericOdeshin2 } from '../../adapter/odeshin/odeshin2';
import {
  AbstractInMemoryVoictent,
  DereferenceError,
} from './abstractInMemoryVoictent';
import { InMemoryIndexByName, InMemoryVoque } from '../voque/inMemoryVoque';
import { OutputValueByTemplateKeyPath } from '../../package-agnostic-utilities/datastructure/zorn';
import { assertNotUndefined } from '../../package-agnostic-utilities/nil/assertNotUndefined';

export type InMemoryOdeshin2IndexByName = SpreadN<
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

const getZornLike = (
  odeshin: GenericOdeshin2,
): { forHuman: string; forDebug: OutputValueByTemplateKeyPath | string } => {
  const result =
    typeof odeshin.zorn === 'string'
      ? { forHuman: odeshin.zorn, forDebug: odeshin.zorn }
      : {
          forHuman: odeshin.zorn.forHuman,
          forDebug: odeshin.zorn.templateValueByKeyPath,
        };

  return result;
};

export abstract class BaseInMemoryOdeshin2Voictent<
  TRestrictingVoque extends GenericInMemoryOdeshin2Voque,
  TVoque extends TRestrictingVoque,
> extends AbstractInMemoryVoictent<TRestrictingVoque, TVoque> {
  protected hubblepupPelueByZorn = new Map<string, TVoque['hubblepupPelue']>();

  addHubblepup(hubblepup: TVoque['hubblepupPelue']): void {
    super.addHubblepup(hubblepup);

    const hubblepupZornLike = getZornLike(hubblepup);
    const humanReadableZorn = hubblepupZornLike.forHuman;

    if (this.hubblepupPelueByZorn.has(humanReadableZorn)) {
      const existingHubblepup =
        this.hubblepupPelueByZorn.get(humanReadableZorn);
      assertNotUndefined(existingHubblepup);
      const existingZornLike = getZornLike(existingHubblepup);

      const error = new Error(`Duplicate zorn: ${humanReadableZorn}`);
      Object.assign(error, {
        gepp: this.gepp,
        zorn: humanReadableZorn,
        formatted: {
          existing: existingZornLike.forDebug,
          duplicate: existingZornLike.forDebug,
        },
        existingHubblepup,
        duplicateHubblepup: hubblepup,
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
    const humanReadableZorn = getZornLike(odeshin).forHuman;
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
