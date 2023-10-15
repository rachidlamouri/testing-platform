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

import { CollectionId } from '../../core/types/collection/collectionId';
import { ItemStream2 } from '../../core/types/stream/stream';
import { GenericIdentifiableItem } from '../../adapter/identifiable-item/identifiableItem';
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

export abstract class BaseInMemoryIdentifiableItem2Collection<
  TRestrictingVoque extends GenericInMemoryIdentifiableItem2StreamMetatype,
  TVoque extends TRestrictingVoque,
> extends AbstractInMemoryCollection<TRestrictingVoque, TVoque> {
  protected hubblepupPelueByZorn = new Map<
    string,
    TVoque['itemEggStreamable']
  >();

  addItem(hubblepup: TVoque['itemEggStreamable']): void {
    super.addItem(hubblepup);

    const hubblepupZornLike = getIdLike(hubblepup);
    const humanReadableZorn = hubblepupZornLike.forHuman;

    if (this.hubblepupPelueByZorn.has(humanReadableZorn)) {
      const existingHubblepup =
        this.hubblepupPelueByZorn.get(humanReadableZorn);
      assertNotUndefined(existingHubblepup);
      const existingZornLike = getIdLike(existingHubblepup);

      const error = new Error(`Duplicate id: ${humanReadableZorn}`);
      Object.assign(error, {
        gepp: this.collectionId,
        id: humanReadableZorn,
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
  ): TVoque['indexedItemStreamable'] {
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

export type GenericInMemoryIdentifiableItem2ListStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    CollectionId,
    GenericIdentifiableItem
  >;

export class InMemoryIdentifiableItem2ListCollection<
  TVoque extends GenericInMemoryIdentifiableItem2ListStreamMetatype,
> extends BaseInMemoryIdentifiableItem2Collection<
  GenericInMemoryIdentifiableItem2ListStreamMetatype,
  TVoque
> {
  protected dereferenceCollection(): TVoque['collectionStreamable'] {
    return this.itemTuple;
  }
}

type InMemoryOdeshin3VoictentPelie<TOdeshinPelie> = {
  byId: Map<string, TOdeshinPelie>;
  list: TOdeshinPelie[];
};

export type InMemoryIdentifiableItem3StreamMetatype<
  TGepp extends CollectionId,
  TOdeshin extends GenericIdentifiableItem,
> = InMemoryIdentifiableItem2StreamMetatype<
  TGepp,
  TOdeshin,
  InMemoryOdeshin3VoictentPelie<TOdeshin>
>;

type GenericInMemoryOdeshin3Voque = InMemoryIdentifiableItem3StreamMetatype<
  CollectionId,
  GenericIdentifiableItem
>;

export class InMemoryIdentifiableItem3Collection<
  TVoque extends GenericInMemoryOdeshin3Voque,
> extends BaseInMemoryIdentifiableItem2Collection<
  GenericInMemoryOdeshin3Voque,
  TVoque
> {
  protected dereferenceCollection(): TVoque['collectionStreamable'] {
    return {
      byId: this.hubblepupPelueByZorn,
      list: this.itemTuple,
    };
  }
}