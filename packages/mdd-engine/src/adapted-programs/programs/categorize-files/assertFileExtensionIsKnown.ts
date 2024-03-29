import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorElementLocatorTypeName,
  ReportedProgramError,
  ReportingProgrammedTransformLocator,
} from '../../programmable-units/error/programError';
import {
  FILE_COLLECTION_ID,
  FileStreamMetatype,
} from '../../programmable-units/file/file';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';

const PROGRAMMED_TRANSFORM_NAME = 'assertFileExtensionIsKnown' as const;
type ProgrammedTransformName = typeof PROGRAMMED_TRANSFORM_NAME;
type ReportingLocator =
  ReportingProgrammedTransformLocator<ProgrammedTransformName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: PROGRAMMED_TRANSFORM_NAME,
  filePath: __filename,
};

/**
 * Creates a ProgramError if the file extension was marked as unknown by "enumerateFileSystemObjects"
 */
export const assertFileExtensionIsKnown = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<FileStreamMetatype>({
    collectionId: FILE_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
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
