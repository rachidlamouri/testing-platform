/**
 * An in memory collection for identifiable items (version 2) ... (also
 * version 3, and by the time you're reading this theres probably a version 4.
 * who knows?)
 *
 * @noCanonicalDeclaration
 *
 * @readableName InMemoryIdentifiableItemCollection
 *
 * @todo find a better name for this file
 */

import { CollectionId } from '../../core/types/voictent/gepp';
import { ItemStream2 } from '../../core/types/lanbe/lanbe';
import { GenericIdentifiableItem } from '../../adapter/odeshin/identifiableItem';
import {
  AbstractInMemoryCollection,
  DereferenceError,
} from './abstractInMemoryCollection';
import {
  InMemoryIndexByName,
  InMemoryStreamMetatype,
} from '../stream-metatype/inMemoryStreamMetatype';
import { OutputValueByTemplateKeyPath } from '../../package-agnostic-utilities/data-structure/id';
import { assertNotUndefined } from '../../package-agnostic-utilities/nil/assertNotUndefined';

export type InMemoryIdentifiableItem2IndexByName = InMemoryIndexByName &
  // TODO: REMOVE UNDEFINED after mass refactor
  (| {
        id: GenericIdentifiableItem['id'];
        zorn?: GenericIdentifiableItem['id'];
      }
    | {
        id?: GenericIdentifiableItem['id'];
        zorn: GenericIdentifiableItem['id'];
      }
  );

type InMemoryIdentifiableItem2StreamMetatype<
  TCollectionId extends CollectionId,
  TItem extends GenericIdentifiableItem,
  TCollection,
> = InMemoryStreamMetatype<
  TCollectionId,
  TItem,
  TItem,
  InMemoryIdentifiableItem2IndexByName,
  TCollection
>;

type GenericInMemoryIdentifiableItem2StreamMetatype =
  InMemoryIdentifiableItem2StreamMetatype<
    CollectionId,
    GenericIdentifiableItem,
    unknown
  >;

type IdLike = {
  forHuman: string;
  forDebug: OutputValueByTemplateKeyPath | string;
};

const getIdLike = (identifiableItem: GenericIdentifiableItem): IdLike => {
  const id = identifiableItem.id ?? identifiableItem.zorn;
  assertNotUndefined(id);

  const result =
    typeof id === 'string'
      ? { forHuman: id, forDebug: id }
      : {
          forHuman: id.forHuman,
          forDebug: id.templateValueByKeyPath,
        };

  return result;
};

export abstract class BaseInMemoryOdeshin2Voictent<
  TRestrictingVoque extends GenericInMemoryIdentifiableItem2StreamMetatype,
  TVoque extends TRestrictingVoque,
> extends AbstractInMemoryCollection<TRestrictingVoque, TVoque> {
  protected hubblepupPelueByZorn = new Map<string, TVoque['hubblepupPelue']>();

  addItem(hubblepup: TVoque['hubblepupPelue']): void {
    super.addItem(hubblepup);

    const hubblepupZornLike = getIdLike(hubblepup);
    const humanReadableZorn = hubblepupZornLike.forHuman;

    if (this.hubblepupPelueByZorn.has(humanReadableZorn)) {
      const existingHubblepup =
        this.hubblepupPelueByZorn.get(humanReadableZorn);
      assertNotUndefined(existingHubblepup);
      const existingZornLike = getIdLike(existingHubblepup);

      const error = new Error(`Duplicate zorn: ${humanReadableZorn}`);
      Object.assign(error, {
        gepp: this.collectionId,
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

  protected dereferenceItem(
    lanbe: ItemStream2<TRestrictingVoque, TVoque>,
  ): TVoque['indexedHubblepupPelie'] {
    const listIndex = this.getStreamIndex(lanbe);

    if (listIndex === AbstractInMemoryCollection.minimumInclusiveIndex) {
      throw new DereferenceError(lanbe);
    }

    const odeshin = this.itemTuple[listIndex];
    const humanReadableZorn = getIdLike(odeshin).forHuman;

    return {
      item: odeshin,
      indexByName: {
        serializableId: humanReadableZorn.replaceAll('/', ' | '),
        listIndex,
        id: odeshin.id,
      },
    };
  }
}

export type InMemoryIdentifiableItem2ListStreamMetatype<
  TGepp extends CollectionId,
  TOdeshin extends GenericIdentifiableItem,
> = InMemoryIdentifiableItem2StreamMetatype<TGepp, TOdeshin, TOdeshin[]>;

export type GenericInMemoryOdeshin2ListVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    CollectionId,
    GenericIdentifiableItem
  >;

export class InMemoryOdeshin2ListVoictent<
  TVoque extends GenericInMemoryOdeshin2ListVoque,
> extends BaseInMemoryOdeshin2Voictent<
  GenericInMemoryOdeshin2ListVoque,
  TVoque
> {
  protected dereferenceCollection(): TVoque['voictentPelie'] {
    return this.itemTuple;
  }
}

type InMemoryOdeshin3VoictentPelie<TOdeshinPelie> = {
  byZorn: Map<string, TOdeshinPelie>;
  list: TOdeshinPelie[];
};

export type InMemoryOdeshin3Voque<
  TGepp extends CollectionId,
  TOdeshin extends GenericIdentifiableItem,
> = InMemoryIdentifiableItem2StreamMetatype<
  TGepp,
  TOdeshin,
  InMemoryOdeshin3VoictentPelie<TOdeshin>
>;

type GenericInMemoryOdeshin3Voque = InMemoryOdeshin3Voque<
  CollectionId,
  GenericIdentifiableItem
>;

export class InMemoryOdeshin3Voictent<
  TVoque extends GenericInMemoryOdeshin3Voque,
> extends BaseInMemoryOdeshin2Voictent<GenericInMemoryOdeshin3Voque, TVoque> {
  protected dereferenceCollection(): TVoque['voictentPelie'] {
    return {
      byZorn: this.hubblepupPelueByZorn,
      list: this.itemTuple,
    };
  }
}
