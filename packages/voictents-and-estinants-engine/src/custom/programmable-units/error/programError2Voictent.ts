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
  GenericProgramError2Voque,
  PROGRAM_ERROR_2_GEPP,
  UnsafeProgramError2Voque,
} from './programError2';

export type ProgramError2VoictentConstructorInput = {
  programFileCache: ProgramFileCache;
};

export class ProgramError2Voictent extends AbstractAsymmetricInMemoryVoictent2<
  UnsafeProgramError2Voque,
  UnsafeProgramError2Voque
> {
  private programFileCache: ProgramFileCache;

  constructor({ programFileCache }: ProgramError2VoictentConstructorInput) {
    super({
      gepp: PROGRAM_ERROR_2_GEPP,
      initialHubblepupTuple: [],
    });

    this.programFileCache = programFileCache;

    this.programFileCache.deleteVoictentDirectory({
      voictentGepp: this.gepp,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected transformHubblepup(
    receivedHubblepup: GenericProgramError2Voque['receivedHubblepup'],
  ): GenericProgramError2Voque['emittedHubblepup'] {
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

    const emittedHubblepup: GenericProgramError2Voque['emittedHubblepup'] = {
      zorn,
      name: receivedHubblepup.name,
      message: receivedHubblepup.error.message,
      stackTrace: (receivedHubblepup.error.stack ?? '').split('\n').slice(1),
      reporterLocator: receivedHubblepup.reporterLocator,
      sourceLocator: receivedHubblepup.sourceLocator,
      context: receivedHubblepup.context,
      serializedContextFilePath: `${this.programFileCache.voictentsDirectory}/by-source/${normalizedSourcePath}`,
      normalizedZorn,
      byReporterDirectoryPath,
      bySourceDirectoryPath,
      contextFilePath: this.programFileCache.getNamespacedFilePath({
        voictentGepp: this.gepp,
        nestedPath: bySourceDirectoryPath,
        extensionlessFileName: normalizedZorn,
        fileExtensionSuffixIdentifier: FileExtensionSuffixIdentifier.Yaml,
      }),
    };

    return emittedHubblepup;
  }

  protected onTransformedHubblepup(
    hubblepup: GenericProgramError2Voque['emittedHubblepup'],
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
    hubblepup: GenericProgramError2Voque['emittedHubblepup'],
  ): GenericProgramError2Voque['indexByName'] {
    return {
      zorn: hubblepup.zorn,
    };
  }
}
