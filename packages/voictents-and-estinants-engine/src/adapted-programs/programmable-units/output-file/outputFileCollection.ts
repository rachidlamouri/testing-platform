import fs from 'fs';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import {
  KnownFileExtensionSuffixIdentifier,
  getFileExtensionSuffixIdentifier,
} from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { AbstractAsymmetricInMemoryCollection2 } from '../in-memory-cache/abstractAsymmetricInMemoryCollection2';
import {
  OUTPUT_FILE_COLLECTION_ID,
  OutputFile,
  OutputFileStreamMetatype,
} from './outputFile';

type OutputFileCollectionConstructorInput = {
  programFileCache: ProgramFileCache;
};

/**
 * A collection of OutputFile objects. The collection only exists on disk, and
 * cannot be consumed. It uses a program file cache to immediately write files
 * and it handles all OutputFile types; see OutputFile for more details.
 *
 * @readableName OutputFileCollection
 *
 * @canonicalDeclaration
 */
export class OutputFileCollection extends AbstractAsymmetricInMemoryCollection2<
  OutputFileStreamMetatype,
  OutputFileStreamMetatype
> {
  private programFileCache: ProgramFileCache;

  constructor({ programFileCache }: OutputFileCollectionConstructorInput) {
    super({
      collectionId: OUTPUT_FILE_COLLECTION_ID,
      initialItemEggTuple: [],
    });

    this.programFileCache = programFileCache;

    this.programFileCache.deleteCollectionDirectory({
      collectionCollectionId: this.collectionId,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected transformItem(item: OutputFile): OutputFile {
    return item;
  }

  // eslint-disable-next-line class-methods-use-this
  protected getIndexByName(): OutputFileStreamMetatype['indexByName'] {
    throw new Error('Unsupported operation');
  }

  protected onTransformedItem(
    item: OutputFileStreamMetatype['itemStreamable'],
  ): void {
    if (item.filePath !== undefined) {
      fs.writeFileSync(item.filePath, item.text);
      return;
    }

    this.programFileCache.writeSerializedItem({
      collectionCollectionId: this.collectionId,
      nestedPath: '',
      extensionlessFileName: item.fileName,
      serializedItem: {
        // TODO: update OutputFile to store the suffix identifier and remove this backwards logic
        fileExtensionSuffixIdentifier: getFileExtensionSuffixIdentifier(
          item.fileExtensionSuffix,
        ) as KnownFileExtensionSuffixIdentifier,
        text: item.text,
      },
    });
  }
}
