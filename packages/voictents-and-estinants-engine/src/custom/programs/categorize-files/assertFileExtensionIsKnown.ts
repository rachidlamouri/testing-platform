import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  GenericProgramError2Voque,
  PROGRAM_ERROR_2_GEPP,
  ProgramError2ElementLocatorTypeName,
  ReportedProgramError2,
  ReportingEstinantLocator,
} from '../../programmable-units/error/programError';
import { FILE_GEPP, FileVoque } from '../../programmable-units/file/file';
import { FileExtensionSuffixIdentifier } from '../../programmable-units/file/fileExtensionSuffixIdentifier';

const ESTINANT_NAME = 'assertFileExtensionIsKnown' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramError2ElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Creates a ProgramError if the file extension was marked as unknown by "enumerateFileSystemObjects"
 */
export const assertFileExtensionIsKnown = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<FileVoque>({
    gepp: FILE_GEPP,
  })
  .toHubblepupTuple2<GenericProgramError2Voque>({
    gepp: PROGRAM_ERROR_2_GEPP,
  })
  .onPinbe((file) => {
    if (
      file.extension.suffixIdentifier === FileExtensionSuffixIdentifier.Unknown
    ) {
      const output: ReportedProgramError2<ReportingLocator> = {
        name: 'file-extension-is-unknown',
        error: new Error(`Unknown file extension "${file.extension.suffix}"`),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramError2ElementLocatorTypeName.SourceFileLocator,
          filePath: file.filePath,
        },
        context: null,
      };

      return [output];
    }

    return [];
  })
  .assemble();
