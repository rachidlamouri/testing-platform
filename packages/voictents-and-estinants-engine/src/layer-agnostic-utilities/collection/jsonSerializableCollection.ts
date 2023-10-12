import { jsonUtils } from '../../package-agnostic-utilities/json/json';
import { serializeError } from '../../package-agnostic-utilities/error/serializeError';
import {
  GenericAbstractSerializableStreamMetatype,
  AbstractSerializableCollection,
} from './abstractSerializableCollection';
import { FileExtensionSuffixIdentifier } from '../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { ProgramFileCache, SerializedItem } from '../program/programFileCache';
import { GenericItem } from '../../core/types/hubblepup/hubblepup';

type JsonSerializableCollectionConstructorInput<
  TStreamMetatype extends GenericAbstractSerializableStreamMetatype,
> = {
  collectionId: TStreamMetatype['gepp'];
  programFileCache: ProgramFileCache;
  initialItemEggTuple: TStreamMetatype['hubblepupPelue'][];
};

/**
 * A collection that serializes data, or serializes an eror resulting from the
 * attempt to serialize the data. This collection cannot be consumed
 *
 * @readableName JsonSerializableCollection
 *
 * @canonicalDeclaration
 */
export class JsonSerializableCollection<
  TStreamMetatype extends GenericAbstractSerializableStreamMetatype,
> extends AbstractSerializableCollection<TStreamMetatype> {
  constructor({
    collectionId,
    programFileCache,
    initialItemEggTuple,
  }: JsonSerializableCollectionConstructorInput<TStreamMetatype>) {
    super({
      collectionId,
      programFileCache,
      initialItemEggTuple,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected serialize(item: GenericItem): SerializedItem {
    const jsonSerializationResult = jsonUtils.lossyMultilineSerialize(item);

    let serializedItem: SerializedItem;
    if (typeof jsonSerializationResult === 'string') {
      serializedItem = {
        text: jsonSerializationResult,
        fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Json,
      };
    } else {
      serializedItem = {
        text: serializeError(jsonSerializationResult),
        fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Text,
      };
    }

    return serializedItem;
  }
}
