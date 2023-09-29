import { posix } from 'path';
import { Gepp } from '../../core/types/voictent/gepp';
import {
  FileExtensionSuffixIdentifier,
  KnownFileExtensionSuffixIdentifier,
} from '../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { RuntimeStatistics } from '../../core/engine/digikikify';
import { serializeRuntimeStatistics } from './serializeRuntimeStatistics';
import { FileCache } from '../../package-agnostic-utilities/file/fileCache';

enum TopLevelDirectoryName {
  Root = '',
  Voictents = 'voictents',
}

const RUNTIME_SNAPSHOT_FILE_BASE_NAME = 'runtimeSnapshot';
const RUNTIME_SNAPSHOT_FILE_EXTENSION_SUFFIX_IDENTIFIER =
  FileExtensionSuffixIdentifier.Text;

type ProgramFileCacheInput = {
  namespace: string;
};

export type SerializedHubblepup = {
  text: string;
  fileExtensionSuffixIdentifier: KnownFileExtensionSuffixIdentifier;
};

type SerializedHubblepupWriterInput = {
  voictentGepp: Gepp;
  nestedPath: string;
  extensionlessFileName: string;
  serializedHubblepup: SerializedHubblepup;
};

type VoictentDirectoryDeleterInput = {
  voictentGepp: Gepp;
};

type NamespacedFilePathAccessorInput = {
  topLevelDirectoryName: TopLevelDirectoryName;
  nestedPath: string;
  extensionlessFileName: string;
  fileExtensionSuffixIdentifier: KnownFileExtensionSuffixIdentifier;
};

type NamespacedVoictentFilePathAccessorInput = {
  voictentGepp: Gepp;
  nestedPath: string;
  extensionlessFileName: string;
  fileExtensionSuffixIdentifier: KnownFileExtensionSuffixIdentifier;
};

type NamespacedFilePathWriterInput = {
  topLevelDirectoryName: TopLevelDirectoryName;
  nestedPath: string;
  extensionlessFileName: string;
  fileExtensionSuffixIdentifier: KnownFileExtensionSuffixIdentifier;
  text: string;
};

export class ProgramFileCache extends FileCache {
  static CACHE_DIRECTORY_PATH = 'debug';

  // public readonly voictentsDirectory;

  // public readonly runtimeSnapshotFilePath;

  constructor({ namespace }: ProgramFileCacheInput) {
    super({
      rootDirectoryPath: ProgramFileCache.CACHE_DIRECTORY_PATH,
      namespace,
    });

    // eslint-disable-next-line no-console
    console.log(`Program Namespace: ${this.namespaceDirectoryPath}`);
  }

  get voictentsDirectoryPath(): string {
    return posix.join(
      this.namespaceDirectoryPath,
      TopLevelDirectoryName.Voictents,
    );
  }

  getProgramNamespacedFilePath({
    topLevelDirectoryName,
    nestedPath,
    extensionlessFileName,
    fileExtensionSuffixIdentifier,
  }: NamespacedFilePathAccessorInput): string {
    return super.getNamespacedFilePath({
      nestedPath: posix.join(topLevelDirectoryName, nestedPath),
      extensionlessFileName,
      fileExtensionSuffixIdentifier,
    });
  }

  getNamespacedVoictentsFilePath({
    voictentGepp,
    nestedPath,
    extensionlessFileName,
    fileExtensionSuffixIdentifier,
  }: NamespacedVoictentFilePathAccessorInput): string {
    return this.getProgramNamespacedFilePath({
      topLevelDirectoryName: TopLevelDirectoryName.Voictents,
      nestedPath: posix.join(voictentGepp, nestedPath),
      extensionlessFileName,
      fileExtensionSuffixIdentifier,
    });
  }

  writeNamespacedFile({
    topLevelDirectoryName,
    nestedPath,
    extensionlessFileName,
    fileExtensionSuffixIdentifier,
    text,
  }: NamespacedFilePathWriterInput): void {
    super.writeNamespacedFile({
      nestedPath: posix.join(topLevelDirectoryName, nestedPath),
      extensionlessFileName,
      fileExtensionSuffixIdentifier,
      text,
    });
  }

  writeSerializedHubblepup({
    voictentGepp,
    nestedPath,
    extensionlessFileName,
    serializedHubblepup,
  }: SerializedHubblepupWriterInput): void {
    this.writeNamespacedFile({
      topLevelDirectoryName: TopLevelDirectoryName.Voictents,
      nestedPath: posix.join(voictentGepp, nestedPath),
      extensionlessFileName,
      fileExtensionSuffixIdentifier:
        serializedHubblepup.fileExtensionSuffixIdentifier,
      text: serializedHubblepup.text,
    });
  }

  writeRuntimeSnapshot(statistics: RuntimeStatistics): void {
    const text = serializeRuntimeStatistics(statistics);

    const runtimeSnapshotFilePath = this.getProgramNamespacedFilePath({
      topLevelDirectoryName: TopLevelDirectoryName.Root,
      nestedPath: '',
      extensionlessFileName: RUNTIME_SNAPSHOT_FILE_BASE_NAME,
      fileExtensionSuffixIdentifier:
        RUNTIME_SNAPSHOT_FILE_EXTENSION_SUFFIX_IDENTIFIER,
    });

    // eslint-disable-next-line no-console
    console.log(`SNAPSHOT: ${runtimeSnapshotFilePath}`);

    this.writeNamespacedFile({
      topLevelDirectoryName: TopLevelDirectoryName.Root,
      nestedPath: '',
      extensionlessFileName: RUNTIME_SNAPSHOT_FILE_BASE_NAME,
      fileExtensionSuffixIdentifier:
        RUNTIME_SNAPSHOT_FILE_EXTENSION_SUFFIX_IDENTIFIER,
      text,
    });
  }

  deleteVoictentDirectory({
    voictentGepp,
  }: VoictentDirectoryDeleterInput): void {
    this.deleteNamespacedFileNode({
      nestedPath: posix.join(TopLevelDirectoryName.Voictents, voictentGepp),
    });
  }
}