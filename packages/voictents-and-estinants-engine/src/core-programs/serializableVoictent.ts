import { GenericHubbleup } from '../core/engine-shell/hubblepup/hubblepup';
import {
  GenericAbstractSerializableVoque,
  AbstractSerializableVoictent,
} from './abstractSerializableVoictent';
import {
  ProgramFileCache,
  SerializedHubblepup,
} from '../layer-agnostic-utilities/program/programFileCache';
import { FileExtensionSuffixIdentifier } from '../adapted-programs/programmable-units/file/fileExtensionSuffixIdentifier';
import { serialize } from '../package-agnostic-utilities/typed-datum/serializer/serialize';

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
