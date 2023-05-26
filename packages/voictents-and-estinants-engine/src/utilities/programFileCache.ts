import fs from 'fs';
import { posix } from 'path';
import { Gepp } from '../core/engine-shell/voictent/gepp';
import {
  KnownFileExtensionSuffixIdentifier,
  getFileExtensionSuffix,
} from '../custom/programmable-units/file/fileExtensionSuffixIdentifier';
import { RuntimeStatistics } from '../core/engine/digikikify';
import { serializeRuntimeStatistics } from './serializeRuntimeStatistic';

const CACHE_DIRECTORY_PATH = 'debug';
// TODO: replace the namespace regex with lowercase and hyphens
// const NAMESPACE_REGEX = /^[a-z-]+$/;
const NAMESPACE_REGEX = /^[A-Za-z-]+$/;
const VOICTENTS_DIRECTORY_NAME = 'voictents';
const RUNTIME_SNAPSHOT_FILE_NAME = 'runtimeSnapshot.txt';

const createDirectory = (directoryPath: string): void => {
  if (!fs.existsSync(directoryPath)) {
    // eslint-disable-next-line no-console
    console.log(`NEW: ${directoryPath}`);
  }

  fs.mkdirSync(directoryPath, { recursive: true });
};

createDirectory(CACHE_DIRECTORY_PATH);

export type ProgramFileCacheInput = {
  namespace: string;
};

export type SerializedHubblepup = {
  text: string;
  fileExtensionSuffixIdentifier: KnownFileExtensionSuffixIdentifier;
};

export type SerializedHubblepupWriterInput = {
  voictentGepp: Gepp;
  nestedPath: string;
  extensionlessFileName: string;
  serializedHubblepup: SerializedHubblepup;
};

export type VoictentDirectoryDeleterInput = {
  voictentGepp: Gepp;
};

export class ProgramFileCache {
  public readonly namespace;

  public readonly voictentsDirectory;

  public readonly runtimeSnapshotFilePath;

  constructor({ namespace }: ProgramFileCacheInput) {
    if (!NAMESPACE_REGEX.test(namespace)) {
      throw Error(`Namespace must match regex: ${NAMESPACE_REGEX.toString()}`);
    }

    this.namespace = namespace;
    this.voictentsDirectory = this.getNamespacedDirectory(
      VOICTENTS_DIRECTORY_NAME,
    );
    this.runtimeSnapshotFilePath = posix.join(
      this.getNamespacedDirectory(''),
      RUNTIME_SNAPSHOT_FILE_NAME,
    );

    createDirectory(this.namespaceDirectory);
    createDirectory(this.voictentsDirectory);
  }

  get namespaceDirectory(): string {
    return posix.join(CACHE_DIRECTORY_PATH, this.namespace);
  }

  getNamespacedDirectory(relativeDirectoryPath: string): string {
    return posix.join(this.namespaceDirectory, relativeDirectoryPath);
  }

  writeSerializedHubblepup({
    voictentGepp,
    nestedPath,
    extensionlessFileName,
    serializedHubblepup,
  }: SerializedHubblepupWriterInput): void {
    const fileExtensionSuffix = getFileExtensionSuffix(
      serializedHubblepup.fileExtensionSuffixIdentifier,
    );

    const hubblepupFilePath = posix.join(
      this.voictentsDirectory,
      voictentGepp,
      nestedPath,
      `${extensionlessFileName}.${fileExtensionSuffix}`,
    );
    const voictentDirectoryPath = posix.dirname(hubblepupFilePath);

    createDirectory(voictentDirectoryPath);
    fs.writeFileSync(hubblepupFilePath, serializedHubblepup.text);
  }

  writeRuntimeSnapshot(statistics: RuntimeStatistics): void {
    const text = serializeRuntimeStatistics(statistics);

    // eslint-disable-next-line no-console
    console.log(`SNAPSHOT: ${this.runtimeSnapshotFilePath}`);

    fs.writeFileSync(this.runtimeSnapshotFilePath, text);
  }

  deleteVoictentDirectory({
    voictentGepp,
  }: VoictentDirectoryDeleterInput): void {
    const voictentDirectoryPath = posix.join(
      this.voictentsDirectory,
      voictentGepp,
    );
    fs.rmSync(voictentDirectoryPath, { recursive: true, force: true });
  }
}
