import { Gepp } from '../../core/engine-shell/voictent/gepp';
import { Voictent2 } from '../../core/engine/voictent2';
import { Voque } from '../../core/engine/voque';
import { FileExtensionSuffixIdentifier } from '../../custom/programmable-units/file/fileExtensionSuffixIdentifier';
import { ProgramFileCache } from '../../utilities/programFileCache';

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
  initialHubblepupTuple: TVoque['receivedHubblepup'][];
};

export class SerializableErrorVoictent<
  TVoque extends GenericSerializableErrorVoque,
> implements Voictent2<GenericSerializableErrorVoque, TVoque>
{
  private errorCount = 0;

  public readonly gepp: TVoque['gepp'];

  public readonly programFileCache: ProgramFileCache;

  private initialHubblepupTuple: TVoque['emittedHubblepup'][];

  constructor({
    gepp,
    programFileCache,
    initialHubblepupTuple,
  }: SerializableErrorVoictentInput<TVoque>) {
    this.gepp = gepp;
    this.programFileCache = programFileCache;
    this.initialHubblepupTuple = initialHubblepupTuple;
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

    this.initialHubblepupTuple.forEach((hubblepup) => {
      this.addHubblepup(hubblepup);
    });
  }

  addHubblepup(hubblepup: Error): void {
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