import { posix } from 'path';
import fs from 'fs';
import { Hubblepup } from '../core/engine-shell/quirm/hubblepup';
import { Gepp } from '../core/engine-shell/voictent/gepp';
import { Voictent2 } from '../core/engine/voictent2';
import { Voque } from '../core/engine/voque';
import { jsonUtils } from '../utilities/json';
import { serializeError } from '../utilities/serializeError';

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

export type JsonSerializableIndexByName = {
  serializableId: string;
};

export type JsonSerializable = {
  gepp: string;
  serializableId: string;
  datum: unknown;
};

export type GenericJsonSerializableSourceVoque = Voque<
  Gepp,
  Hubblepup,
  Hubblepup,
  JsonSerializableIndexByName,
  Hubblepup[]
>;

export type JsonSerializableVoque<TGepp extends Gepp> = Voque<
  TGepp,
  JsonSerializable,
  JsonSerializable,
  JsonSerializableIndexByName,
  JsonSerializable[]
>;

export type GenericJsonSerializableVoque = JsonSerializableVoque<Gepp>;

export type JsonSerializableVoictentConstructorInput<
  TVoque extends GenericJsonSerializableVoque,
> = {
  nameSpace: string;
  gepp: TVoque['gepp'];
  initialHubblepupTuple: TVoque['receivedHubblepup'][];
};

export class JsonSerializableVoictent<
  TVoque extends GenericJsonSerializableVoque,
> implements Voictent2<GenericJsonSerializableVoque, TVoque>
{
  public readonly nameSpace: string;

  public readonly gepp: TVoque['gepp'];

  constructor({
    nameSpace,
    gepp,
    initialHubblepupTuple,
  }: JsonSerializableVoictentConstructorInput<TVoque>) {
    this.nameSpace = nameSpace;
    this.gepp = gepp;

    const voictentDirectoryPath = posix.join(ROOT_DIRECTORY, this.nameSpace);
    fs.rmSync(voictentDirectoryPath, { recursive: true, force: true });

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

  addHubblepup(hubblepup: JsonSerializable): void {
    const serializedResult = jsonUtils.lossyMultilineSerialize(hubblepup.datum);
    const text =
      typeof serializedResult === 'string'
        ? serializedResult
        : serializeError(serializedResult);

    const extensionSuffix =
      typeof serializedResult === 'string' ? 'json' : 'txt';

    const directoryPath = posix.join(
      ROOT_DIRECTORY,
      this.nameSpace,
      this.gepp,
      hubblepup.gepp,
    );

    createDirectory(directoryPath);

    const filePath = posix.join(
      directoryPath,
      `${hubblepup.serializableId}.${extensionSuffix}`,
    );

    fs.writeFileSync(filePath, text);
  }
}
