import * as uuid from 'uuid';
import { getCollectionResourceLocator } from '../../../layer-agnostic-utilities/deprecated-id/getCollectionResourceLocator';
import { normalizeFilePathForFileName } from '../../../package-agnostic-utilities/file/normalizeFilePathForFileName';
import {
  ProgramFileCache,
  SerializedItem,
} from '../../../layer-agnostic-utilities/program/programFileCache';
import { serialize } from '../../../package-agnostic-utilities/one-way-serializer/serialize';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { AbstractAsymmetricInMemoryCollection2 } from '../in-memory-cache/abstractAsymmetricInMemoryVoictent2';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
  UnsafeProgramErrorVoque,
} from './programError';
import { LintAssertionError } from '../linting/reportFailedLintAssertion';
import { SourceTypeName } from '../linting/source/sourceTypeName';
import { Source } from '../linting/source/source';

type ProgramErrorVoictentConstructorInput = {
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
  UnsafeProgramErrorVoque,
  UnsafeProgramErrorVoque
> {
  private programFileCache: ProgramFileCache;

  constructor({ programFileCache }: ProgramErrorVoictentConstructorInput) {
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
    hubblepupPelue: GenericProgramErrorStreamMetatype['itemEggStreamable'],
  ): GenericProgramErrorStreamMetatype['itemStreamable'] {
    if (
      !(hubblepupPelue instanceof LintAssertionError) &&
      hubblepupPelue instanceof Error
    ) {
      return hubblepupPelue;
    }

    let id: string;
    let sourceLocatorFilePath: string | null;
    if (hubblepupPelue instanceof LintAssertionError) {
      id = hubblepupPelue.lintAssertion.id.forHuman;

      const { lintSource } = hubblepupPelue.lintAssertion;

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
          case SourceTypeName.EstinantSource: {
            return source.filePath;
          }
          case SourceTypeName.RequestSource: {
            return getSourceLocatorFilePath(source.requestee);
          }
        }
      })(lintSource);
    } else {
      id = getCollectionResourceLocator([
        hubblepupPelue.reporterLocator.name,
        hubblepupPelue.name,
        hubblepupPelue.sourceLocator?.filePath ?? '',
      ]);

      sourceLocatorFilePath = hubblepupPelue.sourceLocator?.filePath ?? '';
    }

    const normalizedZorn = normalizeFilePathForFileName(id);
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
        extensionlessFileName: normalizedZorn,
        fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Yaml,
      });

    if (hubblepupPelue instanceof LintAssertionError) {
      // hubblepupPelue.setContextFilePath(contextFilePath);
      return hubblepupPelue;
    }

    const hubblepupPelie: GenericProgramErrorStreamMetatype['itemStreamable'] =
      {
        id,
        name: hubblepupPelue.name,
        message: hubblepupPelue.error.message,
        stackTrace: (hubblepupPelue.error.stack ?? '').split('\n').slice(1),
        reporterLocator: hubblepupPelue.reporterLocator,
        sourceLocator: hubblepupPelue.sourceLocator,
        context: hubblepupPelue.context,
        serializedContextFilePath: `${this.programFileCache.collectionsDirectoryPath}/by-source/${normalizedSourcePath}`,
        normalizedId: normalizedZorn,
        byReporterDirectoryPath,
        bySourceDirectoryPath,
        contextFilePath,
      };

    return hubblepupPelie;
  }

  protected onTransformedItem(
    hubblepup: GenericProgramErrorStreamMetatype['itemStreamable'],
    index: number,
  ): void {
    const serializedHubblepup: SerializedItem = {
      text: serialize(hubblepup),
      fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Yaml,
    };

    if (hubblepup instanceof Error) {
      this.programFileCache.writeSerializedItem({
        collectionCollectionId: this.collectionId,
        nestedPath: 'error',
        serializedItem: serializedHubblepup,
        extensionlessFileName: `${index}`.padStart(2, '0'),
      });

      if (hubblepup instanceof LintAssertionError) {
        const contextFilePath =
          this.programFileCache.getNamespacedCollectionsFilePath({
            collectionCollectionId: this.collectionId,
            nestedPath: 'error',
            extensionlessFileName: `${index}`.padStart(2, '0'),
            fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Yaml,
          });

        hubblepup.setContextFilePath(contextFilePath);
      }

      // TODO: serialize all errors
      return;
    }

    this.programFileCache.writeSerializedItem({
      collectionCollectionId: this.collectionId,
      nestedPath: hubblepup.byReporterDirectoryPath,
      serializedItem: serializedHubblepup,
      extensionlessFileName: hubblepup.normalizedId,
    });

    // TODO: again, put this logic in a utility or something
    this.programFileCache.writeSerializedItem({
      collectionCollectionId: this.collectionId,
      nestedPath: hubblepup.bySourceDirectoryPath,
      serializedItem: serializedHubblepup,
      extensionlessFileName: hubblepup.normalizedId,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected getIndexByName(
    hubblepup: GenericProgramErrorStreamMetatype['itemStreamable'],
  ): GenericProgramErrorStreamMetatype['indexByName'] {
    if (hubblepup instanceof Error) {
      return {
        // TODO: an id should not be random
        id: uuid.v4(),
      };
    }

    return {
      id: hubblepup.id,
    };
  }
}
