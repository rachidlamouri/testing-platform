import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ErrorLocatorTypeName,
  PROGRAM_ERROR_GEPP,
  ProgramError,
  ProgramErrorVoque,
} from '../../programmable-units/error/programError';
import { FILE_GEPP, FileVoque } from '../../programmable-units/file/file';
import { FileExtensionSuffixIdentifier } from '../../programmable-units/file/fileExtensionSuffixIdentifier';

/**
 * Creates a ProgramError if the file extension was marked as unknown by "enumerateFileSystemObjects"
 */
export const assertFileExtensionIsKnown = buildEstinant({
  name: 'assertFileExtensionIsKnown',
})
  .fromHubblepup2<FileVoque>({
    gepp: FILE_GEPP,
  })
  .toHubblepupTuple2<ProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((file) => {
    if (
      file.extension.suffixIdentifier === FileExtensionSuffixIdentifier.Unknown
    ) {
      return [
        {
          errorId: 'assertFileExtensionIsKnown/file-extension-is-unknown',
          message: 'Unknown file extension',
          locator: {
            typeName: ErrorLocatorTypeName.FileErrorLocator,
            filePath: file.filePath,
          },
          metadata: null,
        } satisfies ProgramError,
      ];
    }

    return [];
  })
  .assemble();
