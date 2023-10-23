import { BaseInMemoryIdentifiableItem2Collection } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { BoundedFile } from '../file/boundedFile';
import {
  FileDependency,
  FILE_DEPENDENCY_COLLECTION_ID,
  FileDependencyCollectionStreamable,
  FileDependencyStreamMetatype,
} from './fileDependency';

class BoundedFileCombination extends Map<string, BoundedFile> {}

/**
 * Creates mappings between files and the files they import, and between files
 * and the files that import them. These mappings are available via the
 * collection streamable
 *
 * @readableName FileDependencyCollection
 */
export class FileDependencyCollection extends BaseInMemoryIdentifiableItem2Collection<
  FileDependencyStreamMetatype,
  FileDependencyStreamMetatype
> {
  private importedFileListByImportingFilePath = new Map<
    string,
    BoundedFileCombination
  >();

  private importingFileListByImportedFilePath = new Map<
    string,
    BoundedFileCombination
  >();

  constructor() {
    super({
      collectionId: FILE_DEPENDENCY_COLLECTION_ID,
      initialItemEggTuple: [],
      continueOnDuplicate: false,
    });
  }

  addItem(item: FileDependency): void {
    const { importingFile } = item;
    const importingFilePath = importingFile.file.filePath.serialized;

    const { importedFile } = item;
    const importedFilePath = importedFile.file.filePath.serialized;

    {
      const combination =
        this.importedFileListByImportingFilePath.get(importingFilePath) ??
        new BoundedFileCombination();
      combination.set(importedFilePath, importedFile);
      this.importedFileListByImportingFilePath.set(
        importingFilePath,
        combination,
      );
    }

    {
      const combination =
        this.importingFileListByImportedFilePath.get(importedFilePath) ??
        new BoundedFileCombination();
      combination.set(importingFilePath, importingFile);
      this.importingFileListByImportedFilePath.set(
        importedFilePath,
        combination,
      );
    }

    super.addItem(item);
  }

  protected dereferenceCollection(): FileDependencyCollectionStreamable {
    const importedFileListByImportingFilePath = new Map(
      [...this.importedFileListByImportingFilePath.entries()].map(
        ([importingFilePath, combination]) => {
          const importedFileList = [...combination.values()];
          return [importingFilePath, importedFileList] as const;
        },
      ),
    );

    const importingFileListByImportedFilePath = new Map(
      [...this.importingFileListByImportedFilePath.entries()].map(
        ([importedFilePath, combination]) => {
          const importingFileList = [...combination.values()];
          return [importedFilePath, importingFileList] as const;
        },
      ),
    );

    return {
      importedFileListByImportingFilePath,
      importingFileListByImportedFilePath,
      list: this.itemTuple,
    };
  }
}
