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
  InMemoryCollectionConstructorInput,
} from './abstractInMemoryCollection';
import {
  InMemoryIndexByName,
  InMemoryStreamMetatype,
} from '../stream-metatype/inMemoryStreamMetatype';
import { OutputValueByTemplateKeyPath } from '../../package-agnostic-utilities/data-structure/id';
import { assertNotUndefined } from '../../package-agnostic-utilities/nil/assertNotUndefined';
import { SpreadN } from '../../package-agnostic-utilities/type/spreadN';
import { StreamMetatype } from '../../core/types/stream-metatype/streamMetatype';

export type InMemoryIdentifiableItem2IndexByName = InMemoryIndexByName & {
  // TODO: REMOVE UNDEFINED after mass refactor
  id: GenericIdentifiableItem['id'];
};

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
  const { id } = identifiableItem;

  const result =
    typeof id === 'string'
      ? { forHuman: id, forDebug: id }
      : {
          forHuman: id.forHuman,
          forDebug: id.templateValueByKeyPath,
        };

  return result;
};

type BaseInMemoryIdentifiableItem2CollectionInput<
  TStreamMetatype extends GenericInMemoryIdentifiableItem2StreamMetatype,
> = SpreadN<
  [
    InMemoryCollectionConstructorInput<TStreamMetatype>,
    {
      continueOnDuplicate?: boolean;
    },
  ]
>;

export abstract class BaseInMemoryIdentifiableItem2Collection<
  TRestrictingStreamMetatype extends GenericInMemoryIdentifiableItem2StreamMetatype,
  TStreamMetatype extends TRestrictingStreamMetatype,
> extends AbstractInMemoryCollection<
  TRestrictingStreamMetatype,
  TStreamMetatype
> {
  continueOnDuplicate: boolean;

  protected itemEggById = new Map<
    string,
    TStreamMetatype['itemEggStreamable']
  >();

  constructor({
    continueOnDuplicate = false,
    ...input
  }: BaseInMemoryIdentifiableItem2CollectionInput<TStreamMetatype> & {
    continueOnDuplicate: boolean;
  }) {
    super(input);

    this.continueOnDuplicate = continueOnDuplicate;
  }

  addItem(item: TStreamMetatype['itemEggStreamable']): void {
    const itemIdLike = getIdLike(item);
    const humanReadableId = itemIdLike.forHuman;

    if (this.itemEggById.has(humanReadableId)) {
      if (this.continueOnDuplicate) {
        return;
      }

      const existingItem = this.itemEggById.get(humanReadableId);
      assertNotUndefined(existingItem);
      const existingIdLike = getIdLike(existingItem);

      const error = new Error(`Duplicate id: ${humanReadableId}`);
      Object.assign(error, {
        collectionId: this.collectionId,
        id: humanReadableId,
        formatted: {
          existing: existingIdLike.forDebug,
          duplicate: existingIdLike.forDebug,
        },
        existingItem,
        duplicateItem: item,
      });

      throw error;
    } else {
      super.addItem(item);
      this.itemEggById.set(humanReadableId, item);
    }
  }

  protected dereferenceItem(
    stream: ItemStream2<TRestrictingStreamMetatype, TStreamMetatype>,
  ): TStreamMetatype['indexedItemStreamable'] {
    const listIndex = this.getStreamIndex(stream);

    if (listIndex === AbstractInMemoryCollection.minimumInclusiveIndex) {
      throw new DereferenceError(stream);
    }

    const identifiableItem = this.itemTuple[listIndex];
    const humanReadableId = getIdLike(identifiableItem).forHuman;

    return {
      item: identifiableItem,
      indexByName: {
        serializableId: humanReadableId.replaceAll('/', ' | '),
        listIndex,
        id: identifiableItem.id,
      },
    };
  }
}

type InMemoryIdentifiableItem3CollectionStreamable<
  TIdentifiableItemStreamable,
> = {
  byId: Map<string, TIdentifiableItemStreamable>;
  list: TIdentifiableItemStreamable[];
};

export type InMemoryIdentifiableItem3StreamMetatype<
  TCollectionId extends CollectionId,
  TIdentifiableItem extends GenericIdentifiableItem,
> = InMemoryIdentifiableItem2StreamMetatype<
  TCollectionId,
  TIdentifiableItem,
  InMemoryIdentifiableItem3CollectionStreamable<TIdentifiableItem>
>;

type GenericInMemoryIdentifiableItem3StreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    CollectionId,
    GenericIdentifiableItem
  >;

export type UnsafeInMemoryIdentifiableItem3StreamMetatype = StreamMetatype<
  CollectionId,
  GenericIdentifiableItem,
  GenericIdentifiableItem,
  InMemoryIdentifiableItem2IndexByName,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  InMemoryIdentifiableItem3CollectionStreamable<any>
>;

export class InMemoryIdentifiableItem3Collection<
  TStreamMetatype extends GenericInMemoryIdentifiableItem3StreamMetatype,
> extends BaseInMemoryIdentifiableItem2Collection<
  GenericInMemoryIdentifiableItem3StreamMetatype,
  TStreamMetatype
> {
  constructor({
    continueOnDuplicate = false,
    ...input
  }: BaseInMemoryIdentifiableItem2CollectionInput<TStreamMetatype>) {
    super({
      continueOnDuplicate,
      ...input,
    });
  }

  protected dereferenceCollection(): TStreamMetatype['collectionStreamable'] {
    return {
      byId: this.itemEggById,
      list: this.itemTuple,
    };
  }
}
