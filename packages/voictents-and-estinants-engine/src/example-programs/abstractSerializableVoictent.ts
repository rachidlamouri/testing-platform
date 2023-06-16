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
  Hubblepup[]
>;

export type AbstractSerializableVoque<TGepp extends Gepp> = Voque<
  TGepp,
  AbstractSerializable,
  AbstractSerializable,
  AbstractSerializableIndexByName,
  AbstractSerializable[]
>;

export type GenericAbstractSerializableVoque = AbstractSerializableVoque<Gepp>;

export type IndexedAbstractSerializable =
  GenericAbstractSerializableVoque['indexedEmittedHubblepup'];

type AbstractSerializableVoictentConstructorInput<
  TVoque extends GenericAbstractSerializableVoque,
> = {
  gepp: TVoque['gepp'];
  programFileCache: ProgramFileCache;
  initialHubblepupTuple: TVoque['receivedHubblepup'][];
};

export abstract class AbstractSerializableVoictent<
  TVoque extends GenericAbstractSerializableVoque,
> implements Voictent2<GenericAbstractSerializableVoque, TVoque>
{
  public readonly gepp: TVoque['gepp'];

  public readonly programFileCache: ProgramFileCache;

  private initialHubblepupTuple: TVoque['emittedHubblepup'][];

  constructor({
    gepp,
    programFileCache,
    initialHubblepupTuple,
  }: AbstractSerializableVoictentConstructorInput<TVoque>) {
    this.gepp = gepp;
    this.programFileCache = programFileCache;
    this.initialHubblepupTuple = initialHubblepupTuple;
  }

  initialize(): void {
    this.programFileCache.deleteVoictentDirectory({
      voictentGepp: this.gepp,
    });

    this.initialHubblepupTuple.forEach((hubblepup) => {
      this.addHubblepup(hubblepup);
    });
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
    const metavoictentGepp = this.gepp;
    const serializedHubblepupGepp = metahubblepup.sourceGepp;
    const extensionlessFileName = metahubblepup.serializableId.replaceAll(
      '/',
      ' | ',
    );
    const serializedHubblepup = this.serialize(metahubblepup.datum);

    this.programFileCache.writeSerializedHubblepup({
      voictentGepp: metavoictentGepp,
      nestedPath: serializedHubblepupGepp,
      extensionlessFileName,
      serializedHubblepup,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected serialize(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hubblepup: GenericHubbleup,
  ): SerializedHubblepup {
    throw Error('Not implemented');
  }
}
