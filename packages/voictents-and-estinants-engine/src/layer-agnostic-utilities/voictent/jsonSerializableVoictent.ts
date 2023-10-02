import { jsonUtils } from '../../package-agnostic-utilities/json/json';
import { serializeError } from '../../package-agnostic-utilities/error/serializeError';
import {
  GenericAbstractSerializableVoque,
  AbstractSerializableVoictent,
} from './abstractSerializableVoictent';
import { FileExtensionSuffixIdentifier } from '../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import {
  ProgramFileCache,
  SerializedHubblepup,
} from '../program/programFileCache';
import { GenericHubbleup } from '../../core/types/hubblepup/hubblepup';

type JsonSerializableVoictentConstructorInput<
  TVoque extends GenericAbstractSerializableVoque,
> = {
  gepp: TVoque['gepp'];
  programFileCache: ProgramFileCache;
  initialHubblepupPelueTuple: TVoque['hubblepupPelue'][];
};

/**
 * A collection that serializes data, or serializes an eror resulting from the
 * attempt to serialize the data. This collection cannot be consumed
 */
export class JsonSerializableVoictent<
  TVoque extends GenericAbstractSerializableVoque,
> extends AbstractSerializableVoictent<TVoque> {
  constructor({
    gepp,
    programFileCache,
    initialHubblepupPelueTuple,
  }: JsonSerializableVoictentConstructorInput<TVoque>) {
    super({
      gepp,
      programFileCache,
      initialHubblepupPelueTuple,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected serialize(hubblepup: GenericHubbleup): SerializedHubblepup {
    const jsonSerializationResult =
      jsonUtils.lossyMultilineSerialize(hubblepup);

    let serializedHubblepup: SerializedHubblepup;
    if (typeof jsonSerializationResult === 'string') {
      serializedHubblepup = {
        text: jsonSerializationResult,
        fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Json,
      };
    } else {
      serializedHubblepup = {
        text: serializeError(jsonSerializationResult),
        fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Text,
      };
    }

    return serializedHubblepup;
  }
}
