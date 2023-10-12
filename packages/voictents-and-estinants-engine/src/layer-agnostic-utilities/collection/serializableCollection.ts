import { GenericItem } from '../../core/types/hubblepup/hubblepup';
import {
  GenericAbstractSerializableStreamMetatype,
  AbstractSerializableCollection,
} from './abstractSerializableCollection';
import { ProgramFileCache, SerializedItem } from '../program/programFileCache';
import { FileExtensionSuffixIdentifier } from '../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { serialize } from '../../package-agnostic-utilities/one-way-serializer/serialize';

type SerializableCollectionConstructorInput<
  TStreamMetatype extends GenericAbstractSerializableStreamMetatype,
> = {
  collectionId: TStreamMetatype['collectionId'];
  initialItemEggTuple: TStreamMetatype['itemEggStreamable'][];
  programFileCache: ProgramFileCache;
};

/**
 * This collection specifically uses the custom one way serializer
 *
 * @readableName SerializableCollection
 *
 * @canonicalDeclaration
 */
export class SerializableCollection<
  TStreamMetatype extends GenericAbstractSerializableStreamMetatype,
> extends AbstractSerializableCollection<TStreamMetatype> {
  constructor({
    collectionId,
    initialItemEggTuple,
    programFileCache,
  }: SerializableCollectionConstructorInput<TStreamMetatype>) {
    super({
      collectionId,
      initialItemEggTuple,
      programFileCache,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected serialize(item: GenericItem): SerializedItem {
    const text = serialize(item);

    return {
      text,
      fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Yaml,
    };
  }
}
