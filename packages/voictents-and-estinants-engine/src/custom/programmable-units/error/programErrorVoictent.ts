import { getVoictentResourceLocator } from '../../../utilities/getVoictentResourceLocator';
import { normalizeFilePathForFileName } from '../../../utilities/normalizeFilePathForFileName';
import {
  ProgramFileCache,
  SerializedHubblepup,
} from '../../../utilities/programFileCache';
import { serialize } from '../../../utilities/typed-datum/serializer/serialize';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';
import { AbstractAsymmetricInMemoryVoictent2 } from '../in-memory-cache/abstractInMemoryVoictent2';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
  UnsafeProgramErrorVoque,
} from './programError';

export type ProgramErrorVoictentConstructorInput = {
  programFileCache: ProgramFileCache;
};

export class ProgramErrorVoictent extends AbstractAsymmetricInMemoryVoictent2<
  UnsafeProgramErrorVoque,
  UnsafeProgramErrorVoque
> {
  private programFileCache: ProgramFileCache;

  constructor({ programFileCache }: ProgramErrorVoictentConstructorInput) {
    super({
      gepp: PROGRAM_ERROR_GEPP,
      initialHubblepupTuple: [],
    });

    this.programFileCache = programFileCache;

    this.programFileCache.deleteVoictentDirectory({
      voictentGepp: this.gepp,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected transformHubblepup(
    receivedHubblepup: GenericProgramErrorVoque['receivedHubblepup'],
  ): GenericProgramErrorVoque['emittedHubblepup'] {
    const zorn = getVoictentResourceLocator([
      receivedHubblepup.reporterLocator.name,
      receivedHubblepup.name,
      receivedHubblepup.sourceLocator.filePath,
    ]);

    const normalizedZorn = normalizeFilePathForFileName(zorn);
    const normalizedReporterPath = normalizeFilePathForFileName(
      receivedHubblepup.sourceLocator.filePath,
    );
    const normalizedSourcePath = normalizeFilePathForFileName(
      receivedHubblepup.sourceLocator.filePath,
    );

    const byReporterDirectoryPath = `by-reporter/${normalizedReporterPath}`;
    const bySourceDirectoryPath = `by-source/${normalizedSourcePath}`;

    const emittedHubblepup: GenericProgramErrorVoque['emittedHubblepup'] = {
      zorn,
      name: receivedHubblepup.name,
      message: receivedHubblepup.error.message,
      stackTrace: (receivedHubblepup.error.stack ?? '').split('\n').slice(1),
      reporterLocator: receivedHubblepup.reporterLocator,
      sourceLocator: receivedHubblepup.sourceLocator,
      context: receivedHubblepup.context,
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

    return emittedHubblepup;
  }

  protected onTransformedHubblepup(
    hubblepup: GenericProgramErrorVoque['emittedHubblepup'],
  ): void {
    const serializedHubblepup: SerializedHubblepup = {
      text: serialize(hubblepup),
      fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Yaml,
    };

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
    hubblepup: GenericProgramErrorVoque['emittedHubblepup'],
  ): GenericProgramErrorVoque['indexByName'] {
    return {
      zorn: hubblepup.zorn,
    };
  }
}
