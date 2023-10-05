import { BaseInMemoryOdeshin2Voictent } from '../../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { BoundedFile } from '../file/boundedFile';
import {
  FileDependency,
  FILE_DEPENDENCY_GEPP,
  FileDependencyVoictentPelie,
  FileDependencyVoque,
} from './fileDependency';

class BoundedFileCombination extends Map<string, BoundedFile> {}

/**
 * Creates mappings between files and the files they import, and between files
 * and the files that import them. These mappings are available via the
 * collection pelie
 *
 * @readableName FileDependencyCollection
 */
export class FileDependencyVoictent extends BaseInMemoryOdeshin2Voictent<
  FileDependencyVoque,
  FileDependencyVoque
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
      gepp: FILE_DEPENDENCY_GEPP,
      initialHubblepupPelueTuple: [],
    });
  }

  addHubblepup(hubblepup: FileDependency): void {
    const { importingFile } = hubblepup;
    const importingFilePath = importingFile.file.filePath.serialized;

    const { importedFile } = hubblepup;
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

    super.addHubblepup(hubblepup);
  }

  protected dereferenceVoictentPelie(): FileDependencyVoictentPelie {
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
      list: this.hubblepupPelieTuple,
    };
  }
}
