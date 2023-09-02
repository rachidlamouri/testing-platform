import { Gepp } from '../core/engine-shell/voictent/gepp';
import { Voictent2 } from '../core/engine/voictent2';
import { Voque } from '../core/engine/voque';
import {
  GenericHubbleup,
  Hubblepup,
} from '../core/engine-shell/quirm/hubblepup';
import {
  ProgramFileCache,
  SerializedHubblepup,
} from '../utilities/programFileCache';

export type AbstractSerializableIndexByName = {
  serializableId: string;
};

export type AbstractSerializable = {
  sourceGepp: string;
  serializableId: string;
  datum: unknown;
};

export type GenericAbstractSerializableSourceVoque = Voque<
  Gepp,
  Hubblepup,
  Hubblepup,
  AbstractSerializableIndexByName,
  unknown
>;

export type AbstractSerializableVoque<
  TGepp extends Gepp,
  TVoictentPelie = unknown,
> = Voque<
  TGepp,
  AbstractSerializable,
  AbstractSerializable,
  AbstractSerializableIndexByName,
  TVoictentPelie
>;

export type GenericAbstractSerializableVoque = AbstractSerializableVoque<Gepp>;

export type IndexedAbstractSerializable =
  GenericAbstractSerializableVoque['indexedHubblepupPelie'];

type AbstractSerializableVoictentConstructorInput<
  TVoque extends GenericAbstractSerializableVoque,
> = {
  gepp: TVoque['gepp'];
  programFileCache: ProgramFileCache;
  initialHubblepupPelueTuple: TVoque['hubblepupPelue'][];
};

export abstract class AbstractSerializableVoictent<
  TVoque extends GenericAbstractSerializableVoque,
> implements Voictent2<GenericAbstractSerializableVoque, TVoque>
{
  public readonly gepp: TVoque['gepp'];

  public readonly programFileCache: ProgramFileCache;

  private initialHubblepupPelueTuple: TVoque['hubblepupPelie'][];

  public readonly duplicateCountByCheckId = new Map<string, number>();

  private hasReceivedItem = false;

  constructor({
    gepp,
    programFileCache,
    initialHubblepupPelueTuple,
  }: AbstractSerializableVoictentConstructorInput<TVoque>) {
    this.gepp = gepp;
    this.programFileCache = programFileCache;
    this.initialHubblepupPelueTuple = initialHubblepupPelueTuple;
  }

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

  addHubblepup(metahubblepup: AbstractSerializable): void {
    this.hasReceivedItem = true;

    const metavoictentGepp = this.gepp;
    const serializedHubblepupGepp = metahubblepup.sourceGepp;
    const extensionlessFileName = metahubblepup.serializableId.replaceAll(
      '/',
      ' | ',
    );
    const serializedHubblepup = this.serialize(metahubblepup.datum);

    const duplicateCheckId = `${serializedHubblepupGepp}:${extensionlessFileName}`;
    const previousCount =
      this.duplicateCountByCheckId.get(duplicateCheckId) ?? 0;

    const nextCount = previousCount + 1;
    this.duplicateCountByCheckId.set(duplicateCheckId, nextCount);

    if (nextCount > 1) {
      const fileName = this.programFileCache.getNamespacedVoictentsFilePath({
        voictentGepp: metavoictentGepp,
        nestedPath: serializedHubblepupGepp,
        extensionlessFileName,
        fileExtensionSuffixIdentifier:
          serializedHubblepup.fileExtensionSuffixIdentifier,
      });

      const error = new Error(`Duplicate file name: ${fileName}`);
      Object.assign(error, {
        voictentGepp: metavoictentGepp,
        nestedPath: serializedHubblepupGepp,
        extensionlessFileName,
        fileExtensionSuffixIdentifier:
          serializedHubblepup.fileExtensionSuffixIdentifier,
      });

      throw error;

      // eslint-disable-next-line no-console
      console.log();
    } else {
      this.programFileCache.writeSerializedHubblepup({
        voictentGepp: metavoictentGepp,
        nestedPath: serializedHubblepupGepp,
        extensionlessFileName,
        serializedHubblepup,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected serialize(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hubblepup: GenericHubbleup,
  ): SerializedHubblepup {
    throw Error('Not implemented');
  }
}
