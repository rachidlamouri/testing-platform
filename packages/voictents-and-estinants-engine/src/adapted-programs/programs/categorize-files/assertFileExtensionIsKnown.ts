import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  ReportedProgramError,
  ReportingEstinantLocator,
} from '../../programmable-units/error/programError';
import { FILE_GEPP, FileVoque } from '../../programmable-units/file/file';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';

const ESTINANT_NAME = 'assertFileExtensionIsKnown' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Creates a ProgramError if the file extension was marked as unknown by "enumerateFileSystemObjects"
 */
export const assertFileExtensionIsKnown = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<FileVoque>({
    collectionId: FILE_GEPP,
  })
  .toItemTuple2<GenericProgramErrorVoque>({
    collectionId: PROGRAM_ERROR_GEPP,
  })
  .onTransform((file) => {
    const { suffixIdentifier, suffix } = file.nodePath.name.extension;

    if (suffixIdentifier === FileExtensionSuffixIdentifier.Unknown) {
      const output: ReportedProgramError<ReportingLocator> = {
        name: 'file-extension-is-unknown',
        error: new Error(`Unknown file extension "${suffix}"`),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
          filePath: file.filePath.serialized,
        },
        context: null,
      };

      return [output];
    }

    return [];
  })
  .assemble();
