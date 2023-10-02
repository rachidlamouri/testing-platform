import { GenericHubbleup } from '../../core/types/hubblepup/hubblepup';
import {
  GenericAbstractSerializableVoque,
  AbstractSerializableVoictent,
} from './abstractSerializableVoictent';
import {
  ProgramFileCache,
  SerializedHubblepup,
} from '../program/programFileCache';
import { FileExtensionSuffixIdentifier } from '../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { serialize } from '../../package-agnostic-utilities/one-way-serializer/serialize';

type SerializableVoictentConstructorInput<
  TVoque extends GenericAbstractSerializableVoque,
> = {
  gepp: TVoque['gepp'];
  initialHubblepupPelueTuple: TVoque['hubblepupPelue'][];
  programFileCache: ProgramFileCache;
};

/**
 * This collection specifically uses the custom one way serializer
 */
export class SerializableVoictent<
  TVoque extends GenericAbstractSerializableVoque,
> extends AbstractSerializableVoictent<TVoque> {
  constructor({
    gepp,
    initialHubblepupPelueTuple,
    programFileCache,
  }: SerializableVoictentConstructorInput<TVoque>) {
    super({
      gepp,
      initialHubblepupPelueTuple,
      programFileCache,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected serialize(hubblepup: GenericHubbleup): SerializedHubblepup {
    const text = serialize(hubblepup);

    return {
      text,
      fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Yaml,
    };
  }
}
