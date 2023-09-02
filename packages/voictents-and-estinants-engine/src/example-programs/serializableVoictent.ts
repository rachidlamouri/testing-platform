import { GenericHubbleup } from '../core/engine-shell/quirm/hubblepup';
import {
  GenericAbstractSerializableVoque,
  AbstractSerializableVoictent,
} from './abstractSerializableVoictent';
import {
  ProgramFileCache,
  SerializedHubblepup,
} from '../utilities/programFileCache';
import { FileExtensionSuffixIdentifier } from '../custom/programmable-units/file/fileExtensionSuffixIdentifier';
import { serialize } from '../utilities/typed-datum/serializer/serialize';

type SerializableVoictentConstructorInput<
  TVoque extends GenericAbstractSerializableVoque,
> = {
  gepp: TVoque['gepp'];
  initialHubblepupPelueTuple: TVoque['hubblepupPelue'][];
  programFileCache: ProgramFileCache;
};

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
