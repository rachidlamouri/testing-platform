import * as uuid from 'uuid';
import { getVoictentResourceLocator } from '../../../layer-agnostic-utilities/deprecated-zorn/getVoictentResourceLocator';
import { normalizeFilePathForFileName } from '../../../package-agnostic-utilities/file/normalizeFilePathForFileName';
import {
  ProgramFileCache,
  SerializedHubblepup,
} from '../../../layer-agnostic-utilities/program/programFileCache';
import { serialize } from '../../../package-agnostic-utilities/one-way-serializer/serialize';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { AbstractAsymmetricInMemoryVoictent2 } from '../in-memory-cache/abstractAsymmetricInMemoryVoictent2';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
  UnsafeProgramErrorVoque,
} from './programError';

type ProgramErrorVoictentConstructorInput = {
  programFileCache: ProgramFileCache;
};

/**
 * A collection for handling all program errors. It serializes errors into a
 * readable form and then uses a program file cache to write them to disk.
 *
 * It also enhances the error object with a context path, so that downstream
 * transforms can emit where to find more error context
 */
export class ProgramErrorVoictent extends AbstractAsymmetricInMemoryVoictent2<
  UnsafeProgramErrorVoque,
  UnsafeProgramErrorVoque
> {
  private programFileCache: ProgramFileCache;

  constructor({ programFileCache }: ProgramErrorVoictentConstructorInput) {
    super({
      gepp: PROGRAM_ERROR_GEPP,
      initialHubblepupPelueTuple: [],
    });

    this.programFileCache = programFileCache;

    this.programFileCache.deleteVoictentDirectory({
      voictentGepp: this.gepp,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected transformHubblepup(
    hubblepupPelue: GenericProgramErrorVoque['hubblepupPelue'],
  ): GenericProgramErrorVoque['hubblepupPelie'] {
    if (hubblepupPelue instanceof Error) {
      return hubblepupPelue;
    }

    const zorn = getVoictentResourceLocator([
      hubblepupPelue.reporterLocator.name,
      hubblepupPelue.name,
      hubblepupPelue.sourceLocator?.filePath ?? '',
    ]);

    const normalizedZorn = normalizeFilePathForFileName(zorn);
    const normalizedReporterPath = normalizeFilePathForFileName(
      hubblepupPelue.sourceLocator?.filePath ?? '',
    );
    const normalizedSourcePath = normalizeFilePathForFileName(
      hubblepupPelue.sourceLocator?.filePath ?? '',
    );

    const byReporterDirectoryPath = `by-reporter/${normalizedReporterPath}`;
    const bySourceDirectoryPath = `by-source/${normalizedSourcePath}`;

    const hubblepupPelie: GenericProgramErrorVoque['hubblepupPelie'] = {
      zorn,
      name: hubblepupPelue.name,
      message: hubblepupPelue.error.message,
      stackTrace: (hubblepupPelue.error.stack ?? '').split('\n').slice(1),
      reporterLocator: hubblepupPelue.reporterLocator,
      sourceLocator: hubblepupPelue.sourceLocator,
      context: hubblepupPelue.context,
      serializedContextFilePath: `${this.programFileCache.voictentsDirectoryPath}/by-source/${normalizedSourcePath}`,
      normalizedZorn,
      byReporterDirectoryPath,
      bySourceDirectoryPath,
      contextFilePath: this.programFileCache.getNamespacedVoictentsFilePath({
        voictentGepp: this.gepp,
        nestedPath: bySourceDirectoryPath,
        extensionlessFileName: normalizedZorn,
        fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Yaml,
      }),
    };

    return hubblepupPelie;
  }

  protected onTransformedHubblepup(
    hubblepup: GenericProgramErrorVoque['hubblepupPelie'],
    index: number,
  ): void {
    const serializedHubblepup: SerializedHubblepup = {
      text: serialize(hubblepup),
      fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Yaml,
    };

    if (hubblepup instanceof Error) {
      this.programFileCache.writeSerializedHubblepup({
        voictentGepp: this.gepp,
        nestedPath: 'error',
        serializedHubblepup,
        extensionlessFileName: `${index}`.padStart(2, '0'),
      });

      // TODO: serialize all errors
      return;
    }

    this.programFileCache.writeSerializedHubblepup({
      voictentGepp: this.gepp,
      nestedPath: hubblepup.byReporterDirectoryPath,
      serializedHubblepup,
      extensionlessFileName: hubblepup.normalizedZorn,
    });

    // TODO: again, put this logic in a utility or something
    this.programFileCache.writeSerializedHubblepup({
      voictentGepp: this.gepp,
      nestedPath: hubblepup.bySourceDirectoryPath,
      serializedHubblepup,
      extensionlessFileName: hubblepup.normalizedZorn,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected getIndexByName(
    hubblepup: GenericProgramErrorVoque['hubblepupPelie'],
  ): GenericProgramErrorVoque['indexByName'] {
    if (hubblepup instanceof Error) {
      return {
        // TODO: a zorn should not be random
        zorn: uuid.v4(),
      };
    }

    return {
      zorn: hubblepup.zorn,
    };
  }
}
