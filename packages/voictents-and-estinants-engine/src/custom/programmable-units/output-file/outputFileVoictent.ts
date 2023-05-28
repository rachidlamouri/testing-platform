import { ProgramFileCache } from '../../../utilities/programFileCache';
import {
  KnownFileExtensionSuffixIdentifier,
  getFileExtensionSuffixIdentifier,
} from '../file/fileExtensionSuffixIdentifier';
import { AbstractAsymmetricInMemoryVoictent2 } from '../in-memory-cache/abstractInMemoryVoictent2';
import { OUTPUT_FILE_GEPP, OutputFile, OutputFileVoque } from './outputFile';

export type OutputFileVoictentConstructorInput = {
  programFileCache: ProgramFileCache;
};

export class OutputFileVoictent extends AbstractAsymmetricInMemoryVoictent2<
  OutputFileVoque,
  OutputFileVoque
> {
  private programFileCache: ProgramFileCache;

  constructor({ programFileCache }: OutputFileVoictentConstructorInput) {
    super({
      gepp: OUTPUT_FILE_GEPP,
      initialHubblepupTuple: [],
    });

    this.programFileCache = programFileCache;

    this.programFileCache.deleteVoictentDirectory({
      voictentGepp: this.gepp,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  protected transformHubblepup(hubblepup: OutputFile): OutputFile {
    return hubblepup;
  }

  // eslint-disable-next-line class-methods-use-this
  protected getIndexByName(): OutputFileVoque['indexByName'] {
    throw new Error('Unsupported operation');
  }

  protected onTransformedHubblepup(
    hubblepup: OutputFileVoque['emittedHubblepup'],
  ): void {
    this.programFileCache.writeSerializedHubblepup({
      voictentGepp: this.gepp,
      nestedPath: '',
      extensionlessFileName: hubblepup.fileName,
      serializedHubblepup: {
        // TODO: update OutputFile to store the suffix identifier and remove this backwards logic
        fileExtensionSuffixIdentifier: getFileExtensionSuffixIdentifier(
          hubblepup.fileExtensionSuffix,
        ) as KnownFileExtensionSuffixIdentifier,
        text: hubblepup.text,
      },
    });
  }
}
