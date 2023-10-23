import { CollectionId } from '../../core/types/collection/collectionId';
import { Collection2 } from '../../core/types/collection/collection2';
import { StreamMetatype } from '../../core/types/stream-metatype/streamMetatype';
import { FileExtensionSuffixIdentifier } from '../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { ProgramFileCache } from '../program/programFileCache';

export type SerializableErrorStreamMetatype<
  TCollectionId extends CollectionId,
> = StreamMetatype<TCollectionId, Error, Error, never, never>;

type GenericSerializableErrorStreamMetatype =
  SerializableErrorStreamMetatype<CollectionId>;

type SerializableErrorCollectionInput<
  TStreamMetatype extends GenericSerializableErrorStreamMetatype,
> = {
  collectionId: TStreamMetatype['collectionId'];
  programFileCache: ProgramFileCache;
  initialItemEggTuple: TStreamMetatype['itemEggStreamable'][];
};

/**
 * A collection that writes errors to disk. It's not as complex as ProgramErrorCollection
 *
 * @readableName SerializableErrorCollection
 *
 * @canonicalDeclaration
 */
export class SerializableErrorCollection<
  TStreamMetatype extends GenericSerializableErrorStreamMetatype,
> implements
    Collection2<GenericSerializableErrorStreamMetatype, TStreamMetatype>
{
  private errorCount = 0;

  public readonly collectionId: TStreamMetatype['collectionId'];

  public readonly programFileCache: ProgramFileCache;

  private initialItemEggTuple: TStreamMetatype['itemStreamable'][];

  private hasReceivedItem = false;

  constructor({
    collectionId,
    programFileCache,
    initialItemEggTuple,
  }: SerializableErrorCollectionInput<TStreamMetatype>) {
    this.collectionId = collectionId;
    this.programFileCache = programFileCache;
    this.initialItemEggTuple = initialItemEggTuple;
  }

  // eslint-disable-next-line class-methods-use-this
  createCollectionStream(): null {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  createCollectionItemStream(): null {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  onTickStart(): void {
    // no op
  }

  // eslint-disable-next-line class-methods-use-this
  initialize(): void {
    this.programFileCache.deleteCollectionDirectory({
      collectionCollectionId: this.collectionId,
    });

    this.initialItemEggTuple.forEach((item) => {
      this.addItem(item);
    });
  }

  get isEmpty(): boolean {
    return !this.hasReceivedItem;
  }

  addItem(item: Error): void {
    this.hasReceivedItem = true;
    const currentErrorIndex = this.errorCount;

    this.programFileCache.writeSerializedItem({
      collectionCollectionId: this.collectionId,
      nestedPath: '',
      extensionlessFileName: `${currentErrorIndex}`.padStart(2, '0'),
      serializedItem: {
        text: item.message,
        fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Text,
      },
    });

    this.errorCount += 1;
  }
}
