import { ItemStream2 } from '../../core/types/stream/stream';
import {
  AbstractInMemoryCollection,
  DereferenceError,
} from './abstractInMemoryCollection';
import { GenericStandardInMemoryStreamMetatype } from '../stream-metatype/inMemoryStreamMetatype';

/**
 * A collection that can store any hubblepup in an in-memory array.
 *
 * @readableName InMemoryCollection
 *
 * @canonicalDeclaration
 */
export class InMemoryCollection<
  TStreamMetatype extends GenericStandardInMemoryStreamMetatype,
> extends AbstractInMemoryCollection<
  GenericStandardInMemoryStreamMetatype,
  TStreamMetatype
> {
  protected dereferenceCollection(): TStreamMetatype['collectionStreamable'] {
    return this.itemTuple;
  }

  protected dereferenceItem(
    stream: ItemStream2<GenericStandardInMemoryStreamMetatype, TStreamMetatype>,
  ): TStreamMetatype['indexedItemStreamable'] {
    const listIndex = this.getStreamIndex(stream);

    if (listIndex === AbstractInMemoryCollection.minimumInclusiveIndex) {
      throw new DereferenceError(stream);
    }

    const item = this.itemTuple[listIndex];
    return {
      item,
      indexByName: {
        serializableId: `${listIndex}`,
        listIndex,
      },
    };
  }
}
