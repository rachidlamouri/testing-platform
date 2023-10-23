import { posix } from 'path';
import { CollectionId } from '../../core/types/collection/collectionId';
import {
  FileExtensionSuffixIdentifier,
  KnownFileExtensionSuffixIdentifier,
} from '../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { serializeRuntimeStatistics } from './serializeRuntimeStatistics';
import { FileCache } from '../../package-agnostic-utilities/file/fileCache';
import { RuntimeStatistics } from '../../core/engine/tickSeriesManager';

enum TopLevelDirectoryName {
  Root = '',
  Collections = 'collections',
}

const RUNTIME_SNAPSHOT_FILE_BASE_NAME = 'runtimeSnapshot';
const RUNTIME_SNAPSHOT_FILE_EXTENSION_SUFFIX_IDENTIFIER =
  FileExtensionSuffixIdentifier.Text;

type ProgramFileCacheInput = {
  namespace: string;
};

export type SerializedItem = {
  text: string;
  fileExtensionSuffixIdentifier: KnownFileExtensionSuffixIdentifier;
};

type SerializedItemWriterInput = {
  collectionCollectionId: CollectionId;
  nestedPath: string;
  extensionlessFileName: string;
  serializedItem: SerializedItem;
};

type CollectionDirectoryDeleterInput = {
  collectionCollectionId: CollectionId;
};

type NamespacedFilePathAccessorInput = {
  topLevelDirectoryName: TopLevelDirectoryName;
  nestedPath: string;
  extensionlessFileName: string;
  fileExtensionSuffixIdentifier: KnownFileExtensionSuffixIdentifier;
};

type NamespacedCollectionFilePathAccessorInput = {
  collectionCollectionId: CollectionId;
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

/**
 * A file cache specifically for engine programs. It understands engine-specific
 * concepts like collections and the class itself provides a standard cache
 * directory path
 */
export class ProgramFileCache extends FileCache {
  static CACHE_DIRECTORY_PATH = 'debug';

  // public readonly collectionsDirectory;

  // public readonly runtimeSnapshotFilePath;

  constructor({ namespace }: ProgramFileCacheInput) {
    super({
      rootDirectoryPath: ProgramFileCache.CACHE_DIRECTORY_PATH,
      namespace,
    });

    // eslint-disable-next-line no-console
    console.log(`Program Namespace: ${this.namespaceDirectoryPath}`);
  }

  get collectionsDirectoryPath(): string {
    return posix.join(
      this.namespaceDirectoryPath,
      TopLevelDirectoryName.Collections,
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

  getNamespacedCollectionsFilePath({
    collectionCollectionId,
    nestedPath,
    extensionlessFileName,
    fileExtensionSuffixIdentifier,
  }: NamespacedCollectionFilePathAccessorInput): string {
    return this.getProgramNamespacedFilePath({
      topLevelDirectoryName: TopLevelDirectoryName.Collections,
      nestedPath: posix.join(collectionCollectionId, nestedPath),
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

  writeSerializedItem({
    collectionCollectionId,
    nestedPath,
    extensionlessFileName,
    serializedItem,
  }: SerializedItemWriterInput): void {
    this.writeNamespacedFile({
      topLevelDirectoryName: TopLevelDirectoryName.Collections,
      nestedPath: posix.join(collectionCollectionId, nestedPath),
      extensionlessFileName,
      fileExtensionSuffixIdentifier:
        serializedItem.fileExtensionSuffixIdentifier,
      text: serializedItem.text,
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

  deleteCollectionDirectory({
    collectionCollectionId,
  }: CollectionDirectoryDeleterInput): void {
    this.deleteNamespacedFileNode({
      nestedPath: posix.join(
        TopLevelDirectoryName.Collections,
        collectionCollectionId,
      ),
    });
  }
}
