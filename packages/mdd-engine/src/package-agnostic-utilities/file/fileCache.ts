import { posix } from 'path';
import fs from 'fs';
import {
  KnownFileExtensionSuffixIdentifier,
  getFileExtensionSuffix,
} from './fileExtensionSuffixIdentifier';

// TODO: replace the namespace regex with lowercase and hyphens
// const NAMESPACE_REGEX = /^[a-z-]+$/;
const NAMESPACE_REGEX = /^[A-Za-z-]+$/;

type FileCacheInput = {
  rootDirectoryPath: string;
  namespace: string;
};

type NamespacedFilePathAccessorInput = {
  nestedPath: string;
  extensionlessFileName: string;
  fileExtensionSuffixIdentifier: KnownFileExtensionSuffixIdentifier;
};

type NamespacedSubdirectoryPathAccessorInput = {
  nestedPath: string;
};

type NamespacedFilePathWriterInput = {
  nestedPath: string;
  extensionlessFileName: string;
  fileExtensionSuffixIdentifier: KnownFileExtensionSuffixIdentifier;
  text: string;
};

type NamespacedFileNodeDeleterInput = {
  nestedPath: string;
};

/**
 * Provides a convention for caching files on disk by abstracting how a file
 * gets written, and how to manage writing files to the cache.
 *
 * @todo a file cache should provide a means to get a nested FileCache.
 * Basically another FileCache instance on a nested filepath of the current file
 * cache. Then in the ProgramFileCache we can add semantics to these subcaches.
 */
export class FileCache {
  public readonly rootDirectoryPath: string;

  public readonly namespace: string;

  // public readonly voictentsDirectory;

  // public readonly runtimeSnapshotFilePath;

  constructor({ rootDirectoryPath, namespace }: FileCacheInput) {
    if (!NAMESPACE_REGEX.test(namespace)) {
      throw Error(`Namespace must match regex: ${NAMESPACE_REGEX.toString()}`);
    }

    this.rootDirectoryPath = rootDirectoryPath;
    this.namespace = namespace;

    this.createDirectory(this.rootDirectoryPath);
    this.createDirectory(this.namespaceDirectoryPath);
  }

  get namespaceDirectoryPath(): string {
    return posix.join(this.rootDirectoryPath, this.namespace);
  }

  // eslint-disable-next-line class-methods-use-this
  private createDirectory(directoryPath: string): void {
    if (!fs.existsSync(directoryPath)) {
      // eslint-disable-next-line no-console
      console.log(`NEW: ${directoryPath}`);

      // Provide some visual padding for long directory paths
      if (directoryPath.length > 80) {
        // eslint-disable-next-line no-console
        console.log();
      }
    }

    fs.mkdirSync(directoryPath, { recursive: true });
  }

  // eslint-disable-next-line class-methods-use-this
  getNamespacedFileNodePath({
    nestedPath,
  }: NamespacedSubdirectoryPathAccessorInput): string {
    return posix.join(this.namespaceDirectoryPath, nestedPath);
  }

  // eslint-disable-next-line class-methods-use-this
  getNamespacedFilePath({
    nestedPath,
    extensionlessFileName,
    fileExtensionSuffixIdentifier,
  }: NamespacedFilePathAccessorInput): string {
    const fileExtensionSuffix = getFileExtensionSuffix(
      fileExtensionSuffixIdentifier,
    );

    return this.getNamespacedFileNodePath({
      nestedPath: posix.join(
        nestedPath,
        `${extensionlessFileName}.${fileExtensionSuffix}`,
      ),
    });
  }

  writeNamespacedFile({
    nestedPath,
    extensionlessFileName,
    fileExtensionSuffixIdentifier,
    text,
  }: NamespacedFilePathWriterInput): void {
    const filePath = this.getNamespacedFilePath({
      nestedPath,
      extensionlessFileName,
      fileExtensionSuffixIdentifier,
    });

    const directoryPath = posix.dirname(filePath);

    this.createDirectory(directoryPath);
    fs.writeFileSync(filePath, text);
  }

  deleteNamespacedFileNode({
    nestedPath,
  }: NamespacedFileNodeDeleterInput): void {
    const fileNodePath = this.getNamespacedFileNodePath({ nestedPath });
    fs.rmSync(fileNodePath, { recursive: true, force: true });
  }
}
