import { Gepp } from '../../core/types/voictent/gepp';
import { Voictent2 } from '../../core/types/voictent/voictent2';
import { Voque } from '../../core/types/voque/voque';
import { FileExtensionSuffixIdentifier } from '../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { ProgramFileCache } from '../program/programFileCache';

export type SerializableErrorVoque<TGepp extends Gepp> = Voque<
  TGepp,
  Error,
  Error,
  never,
  never
>;

type GenericSerializableErrorVoque = SerializableErrorVoque<Gepp>;

type SerializableErrorVoictentInput<
  TVoque extends GenericSerializableErrorVoque,
> = {
  gepp: TVoque['gepp'];
  programFileCache: ProgramFileCache;
  initialHubblepupPelueTuple: TVoque['hubblepupPelue'][];
};

/**
 * A collection that writes errors to disk. It's not as complex as ProgramErrorVoictent
 *
 * @readableName SerializableErrorCollection
 */
export class SerializableErrorVoictent<
  TVoque extends GenericSerializableErrorVoque,
> implements Voictent2<GenericSerializableErrorVoque, TVoque>
{
  private errorCount = 0;

  public readonly gepp: TVoque['gepp'];

  public readonly programFileCache: ProgramFileCache;

  private initialHubblepupPelueTuple: TVoque['hubblepupPelie'][];

  private hasReceivedItem = false;

  constructor({
    gepp,
    programFileCache,
    initialHubblepupPelueTuple,
  }: SerializableErrorVoictentInput<TVoque>) {
    this.gepp = gepp;
    this.programFileCache = programFileCache;
    this.initialHubblepupPelueTuple = initialHubblepupPelueTuple;
  }

  // eslint-disable-next-line class-methods-use-this
  createVoictentLanbe(): null {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  createVoictentItemLanbe(): null {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  onTickStart(): void {
    // no op
  }

  // eslint-disable-next-line class-methods-use-this
  initialize(): void {
    this.programFileCache.deleteVoictentDirectory({
      voictentGepp: this.gepp,
    });

    this.initialHubblepupPelueTuple.forEach((hubblepup) => {
      this.addHubblepup(hubblepup);
    });
  }

  get isEmpty(): boolean {
    return !this.hasReceivedItem;
  }

  addHubblepup(hubblepup: Error): void {
    this.hasReceivedItem = true;
    const currentErrorIndex = this.errorCount;

    this.programFileCache.writeSerializedHubblepup({
      voictentGepp: this.gepp,
      nestedPath: '',
      extensionlessFileName: `${currentErrorIndex}`.padStart(2, '0'),
      serializedHubblepup: {
        text: hubblepup.message,
        fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Text,
      },
    });

    this.errorCount += 1;
  }
}
