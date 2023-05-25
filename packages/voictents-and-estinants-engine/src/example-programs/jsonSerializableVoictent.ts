import { jsonUtils } from '../utilities/json';
import { serializeError } from '../utilities/serializeError';
import {
  GenericAbstractSerializableVoque,
  AbstractSerializableVoictent,
} from './abstractSerializableVoictent';
import { FileExtensionSuffixIdentifier } from '../custom/programmable-units/file/fileExtensionSuffixIdentifier';
import {
  ProgramFileCache,
  SerializedHubblepup,
} from '../utilities/programFileCache';
import { GenericHubbleup } from '../core/engine-shell/quirm/hubblepup';

export type JsonSerializableVoictentConstructorInput<
  TVoque extends GenericAbstractSerializableVoque,
> = {
  gepp: TVoque['gepp'];
  programFileCache: ProgramFileCache;
  initialHubblepupTuple: TVoque['receivedHubblepup'][];
};

export class JsonSerializableVoictent<
  TVoque extends GenericAbstractSerializableVoque,
> extends AbstractSerializableVoictent<TVoque> {
  constructor({
    gepp,
    programFileCache,
    initialHubblepupTuple,
  }: JsonSerializableVoictentConstructorInput<TVoque>) {
    super({
      gepp,
      programFileCache,
      initialHubblepupTuple,
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
