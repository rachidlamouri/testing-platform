import * as uuid from 'uuid';
import { getCollectionResourceLocator } from '../../../layer-agnostic-utilities/deprecated-id/getCollectionResourceLocator';
import { normalizeFilePathForFileName } from '../../../package-agnostic-utilities/file/normalizeFilePathForFileName';
import {
  ProgramFileCache,
  SerializedItem,
} from '../../../layer-agnostic-utilities/program/programFileCache';
import { serialize } from '../../../package-agnostic-utilities/one-way-serializer/serialize';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { AbstractAsymmetricInMemoryCollection2 } from '../in-memory-cache/abstractAsymmetricInMemoryCollection2';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
  UnsafeProgramErrorStreamMetatype,
} from './programError';
import { LintAssertionError } from '../linting/reportFailedLintAssertion';
import { SourceTypeName } from '../linting/source/sourceTypeName';
import { Source } from '../linting/source/source';
import { LocatableError } from './locatableError';

type ProgramErrorCollectionConstructorInput = {
  programFileCache: ProgramFileCache;
};

/**
 * A collection for handling all program errors. It serializes errors into a
 * readable form and then uses a program file cache to write them to disk.
 *
 * It also enhances the error object with a context path, so that downstream
 * transforms can emit where to find more error context
 *
 * @readableName ProgramErrorCollection
 *
 * @canonicalDeclaration
 */
export class ProgramErrorCollection extends AbstractAsymmetricInMemoryCollection2<
  UnsafeProgramErrorStreamMetatype,
  UnsafeProgramErrorStreamMetatype
> {
  private programFileCache: ProgramFileCache;

  constructor({ programFileCache }: ProgramErrorCollectionConstructorInput) {
    super({
      collectionId: PROGRAM_ERROR_COLLECTION_ID,
      initialItemEggTuple: [],
    });

    this.programFileCache = programFileCache;

    this.programFileCache.deleteCollectionDirectory({
      collectionCollectionId: this.collectionId,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected transformItem(
    itemEgg: GenericProgramErrorStreamMetatype['itemEggStreamable'],
  ): GenericProgramErrorStreamMetatype['itemStreamable'] {
    if (!(itemEgg instanceof LintAssertionError) && itemEgg instanceof Error) {
      return itemEgg;
    }

    let id: string;
    let sourceLocatorFilePath: string | null;
    if (itemEgg instanceof LintAssertionError) {
      id = itemEgg.lintAssertion.id.forHuman;

      const { lintSource } = itemEgg.lintAssertion;

      sourceLocatorFilePath = (function getSourceLocatorFilePath(
        source: Source,
      ): string {
        switch (source.typeName) {
          case SourceTypeName.FileSource: {
            return source.filePath;
          }
          case SourceTypeName.FileLineSource: {
            return source.filePath;
          }
          case SourceTypeName.FileLineColumnSource: {
            return source.filePath;
          }
          case SourceTypeName.ImportedIdentifierSource: {
            return source.importingFilePath;
          }
          case SourceTypeName.ExportedIdentifierSource: {
            return source.filePath;
          }
          case SourceTypeName.ProgrammedTransformSource: {
            return source.filePath;
          }
          case SourceTypeName.RequestSource: {
            return getSourceLocatorFilePath(source.requestee);
          }
        }
      })(lintSource);
    } else {
      id = getCollectionResourceLocator([
        itemEgg.reporterLocator.name,
        itemEgg.name,
        itemEgg.sourceLocator?.filePath ?? '',
      ]);

      sourceLocatorFilePath = itemEgg.sourceLocator?.filePath ?? '';
    }

    const normalizedId = normalizeFilePathForFileName(id);
    const normalizedReporterPath = normalizeFilePathForFileName(
      sourceLocatorFilePath,
    );
    const normalizedSourcePath = normalizeFilePathForFileName(
      sourceLocatorFilePath,
    );

    const byReporterDirectoryPath = `by-reporter/${normalizedReporterPath}`;
    const bySourceDirectoryPath = `by-source/${normalizedSourcePath}`;

    const contextFilePath =
      this.programFileCache.getNamespacedCollectionsFilePath({
        collectionCollectionId: this.collectionId,
        nestedPath: bySourceDirectoryPath,
        extensionlessFileName: normalizedId,
        fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Yaml,
      });

    if (itemEgg instanceof LintAssertionError) {
      // hubblepupPelue.setContextFilePath(contextFilePath);
      return itemEgg;
    }

    const item: GenericProgramErrorStreamMetatype['itemStreamable'] = {
      id,
      name: itemEgg.name,
      message: itemEgg.error.message,
      stackTrace: (itemEgg.error.stack ?? '').split('\n').slice(1),
      reporterLocator: itemEgg.reporterLocator,
      sourceLocator: itemEgg.sourceLocator,
      context: itemEgg.context,
      serializedContextFilePath: `${this.programFileCache.collectionsDirectoryPath}/by-source/${normalizedSourcePath}`,
      normalizedId,
      byReporterDirectoryPath,
      bySourceDirectoryPath,
      contextFilePath,
    };

    return item;
  }

  protected onTransformedItem(
    item: GenericProgramErrorStreamMetatype['itemStreamable'],
    index: number,
  ): void {
    const serializedItem: SerializedItem = {
      text: serialize(item),
      fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Yaml,
    };

    if (item instanceof Error) {
      this.programFileCache.writeSerializedItem({
        collectionCollectionId: this.collectionId,
        nestedPath: 'error',
        serializedItem,
        extensionlessFileName: `${index}`.padStart(2, '0'),
      });

      if (
        item instanceof LintAssertionError ||
        item instanceof LocatableError
      ) {
        const contextFilePath =
          this.programFileCache.getNamespacedCollectionsFilePath({
            collectionCollectionId: this.collectionId,
            nestedPath: 'error',
            extensionlessFileName: `${index}`.padStart(2, '0'),
            fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Yaml,
          });

        item.setContextFilePath(contextFilePath);
      }

      // TODO: serialize all errors
      return;
    }

    this.programFileCache.writeSerializedItem({
      collectionCollectionId: this.collectionId,
      nestedPath: item.byReporterDirectoryPath,
      serializedItem,
      extensionlessFileName: item.normalizedId,
    });

    // TODO: again, put this logic in a utility or something
    this.programFileCache.writeSerializedItem({
      collectionCollectionId: this.collectionId,
      nestedPath: item.bySourceDirectoryPath,
      serializedItem,
      extensionlessFileName: item.normalizedId,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected getIndexByName(
    item: GenericProgramErrorStreamMetatype['itemStreamable'],
  ): GenericProgramErrorStreamMetatype['indexByName'] {
    if (item instanceof Error) {
      return {
        // TODO: an id should not be random
        id: uuid.v4(),
      };
    }

    return {
      id: item.id,
    };
  }
}
