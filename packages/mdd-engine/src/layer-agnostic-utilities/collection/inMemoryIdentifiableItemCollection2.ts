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

type BaseInMemoryIdentifiableItem2CollectionInput<
  TVoque extends GenericInMemoryIdentifiableItem2StreamMetatype,
> = SpreadN<
  [
    InMemoryCollectionConstructorInput<TVoque>,
    {
      continueOnDuplicate?: boolean;
    },
  ]
>;

export abstract class BaseInMemoryIdentifiableItem2Collection<
  TRestrictingVoque extends GenericInMemoryIdentifiableItem2StreamMetatype,
  TVoque extends TRestrictingVoque,
> extends AbstractInMemoryCollection<TRestrictingVoque, TVoque> {
  continueOnDuplicate: boolean;

  protected hubblepupPelueByZorn = new Map<
    string,
    TVoque['itemEggStreamable']
  >();

  constructor({
    continueOnDuplicate = false,
    ...input
  }: BaseInMemoryIdentifiableItem2CollectionInput<TVoque> & {
    continueOnDuplicate: boolean;
  }) {
    super(input);

    this.continueOnDuplicate = continueOnDuplicate;
  }

  addItem(hubblepup: TVoque['itemEggStreamable']): void {
    const hubblepupZornLike = getIdLike(hubblepup);
    const humanReadableZorn = hubblepupZornLike.forHuman;

    if (this.hubblepupPelueByZorn.has(humanReadableZorn)) {
      if (this.continueOnDuplicate) {
        return;
      }

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
      super.addItem(hubblepup);
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

type InMemoryIdentifiableItem3CollectionStreamable<
  TIdentifiableItemStreamable,
> = {
  byId: Map<string, TIdentifiableItemStreamable>;
  list: TIdentifiableItemStreamable[];
};

export type InMemoryIdentifiableItem3StreamMetatype<
  TGepp extends CollectionId,
  TIdentifiableItem extends GenericIdentifiableItem,
> = InMemoryIdentifiableItem2StreamMetatype<
  TGepp,
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
  TVoque extends GenericInMemoryIdentifiableItem3StreamMetatype,
> extends BaseInMemoryIdentifiableItem2Collection<
  GenericInMemoryIdentifiableItem3StreamMetatype,
  TVoque
> {
  constructor({
    continueOnDuplicate = true,
    ...input
  }: BaseInMemoryIdentifiableItem2CollectionInput<TVoque>) {
    super({
      continueOnDuplicate,
      ...input,
    });
  }

  protected dereferenceCollection(): TVoque['collectionStreamable'] {
    return {
      byId: this.hubblepupPelueByZorn,
      list: this.itemTuple,
    };
  }
}
