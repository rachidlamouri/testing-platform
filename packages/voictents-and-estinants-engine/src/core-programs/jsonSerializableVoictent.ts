import { jsonUtils } from '../utilities/json/json';
import { serializeError } from '../utilities/error/serializeError';
import {
  GenericAbstractSerializableVoque,
  AbstractSerializableVoictent,
} from './abstractSerializableVoictent';
import { FileExtensionSuffixIdentifier } from '../adapted-programs/programmable-units/file/fileExtensionSuffixIdentifier';
import {
  ProgramFileCache,
  SerializedHubblepup,
} from '../utilities/program/programFileCache';
import { GenericHubbleup } from '../core/engine-shell/hubblepup/hubblepup';

type JsonSerializableVoictentConstructorInput<
  TVoque extends GenericAbstractSerializableVoque,
> = {
  gepp: TVoque['gepp'];
  programFileCache: ProgramFileCache;
  initialHubblepupPelueTuple: TVoque['hubblepupPelue'][];
};

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
