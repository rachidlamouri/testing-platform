import fs from 'fs';
import { posix } from 'path';
import { Gepp } from '../core/engine-shell/voictent/gepp';
import { Voictent2 } from '../core/engine/voictent2';
import { serialize } from '../utilities/typed-datum/serializer/serialize';
import { VoictentConfiguration } from '../core/engine/voque';
import { Hubblepup } from '../core/engine-shell/quirm/hubblepup';

const createDirectory = (directoryPath: string): void => {
  if (!fs.existsSync(directoryPath)) {
    // eslint-disable-next-line no-console
    console.log(`NEW: ${directoryPath}`);
  }

  fs.mkdirSync(directoryPath, { recursive: true });
};

// TODO: make the root a generic on-disk cache location that is shared by any on-disk voictent
const ROOT_DIRECTORY = 'debug';
createDirectory(ROOT_DIRECTORY);

export type SerializableIndexByName = {
  serializableId: string;
};

export type Serializable = {
  gepp: string;
  serializableId: string;
  datum: unknown;
};

export type GenericSerializableSourceVoictentConfiguration =
  VoictentConfiguration<
    Gepp,
    Hubblepup,
    Hubblepup,
    SerializableIndexByName,
    Hubblepup[]
  >;

export type SerializableVoictentConfiguration<TGepp extends Gepp> =
  VoictentConfiguration<
    TGepp,
    Serializable,
    Serializable,
    SerializableIndexByName,
    Serializable[]
  >;

export type GenericSerializableVoictentConfiguration =
  SerializableVoictentConfiguration<Gepp>;

export type IndexedSerializable =
  GenericSerializableVoictentConfiguration['indexedEmittedHubblepup'];

export type SerializableVoictentConstructorInput<
  TVoictentConfiguration extends GenericSerializableVoictentConfiguration,
> = {
  nameSpace: string;
  gepp: TVoictentConfiguration['gepp'];
  initialHubblepupTuple: TVoictentConfiguration['receivedHubblepup'][];
};

export class SerializableVoictent<
  TVoictentConfiguration extends GenericSerializableVoictentConfiguration,
> implements Voictent2<TVoictentConfiguration>
{
  public readonly nameSpace: string;

  public readonly gepp: TVoictentConfiguration['gepp'];

  constructor({
    nameSpace,
    gepp,
    initialHubblepupTuple,
  }: SerializableVoictentConstructorInput<TVoictentConfiguration>) {
    this.nameSpace = nameSpace;
    this.gepp = gepp;

    const voictentGeppDirectoryPath = posix.join(
      ROOT_DIRECTORY,
      this.nameSpace,
      this.gepp,
    );
    fs.rmSync(voictentGeppDirectoryPath, { recursive: true, force: true });

    initialHubblepupTuple.forEach((hubblepup) => {
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

  addHubblepup(hubblepup: Serializable): void {
    const directoryPath = posix.join(
      ROOT_DIRECTORY,
      this.nameSpace,
      this.gepp,
      hubblepup.gepp,
    );

    createDirectory(directoryPath);

    const filePath = posix.join(
      directoryPath,
      `${hubblepup.serializableId}.yml`,
    );

    const text = serialize(hubblepup.datum);

    fs.writeFileSync(filePath, text);
  }
}
