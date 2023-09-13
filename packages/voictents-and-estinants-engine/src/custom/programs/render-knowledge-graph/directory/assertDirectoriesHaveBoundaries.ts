import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  ReportingEstinantLocator,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
  ProgramErrorPelue,
} from '../../../programmable-units/error/programError';
import {
  DIRECTORY_WITH_FILE_GEPP,
  DirectoryWithFileVoque,
} from './directoryWithFile';
import {
  BOUNDED_DIRECTORY_GEPP,
  BoundedDirectoryVoque,
} from './boundedDirectory';

const ESTINANT_NAME = 'assertCiModelHasAllPrograms' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Flags any directories that do not fall under a boundary
 *
 * @todo This should really check that all directories with TypeScript files (or other files of interest) fall under a boundary
 */
export const assertDirectoriesHaveBoundaries = buildEstinant({
  name: 'assertDirectoriesHaveBoundaries',
})
  .fromVoictent2<DirectoryWithFileVoque>({
    gepp: DIRECTORY_WITH_FILE_GEPP,
  })
  .andFromVoictent2<BoundedDirectoryVoque>({
    gepp: BOUNDED_DIRECTORY_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((directoryWithFileVoictent, boundedDirectoryVoictent) => {
    const unboundedDirectoryList = directoryWithFileVoictent.filter(
      (directory) => {
        const boundedDirectory = boundedDirectoryVoictent.byNodePath.get(
          directory.directoryPath,
        );
        return boundedDirectory === undefined;
      },
    );

    const outputList = unboundedDirectoryList.map((directory) => {
      return {
        name: 'unbounded-directory',
        error: new Error(
          `Directory ${directory.directoryPath} is not under a boundary`,
        ),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
          filePath: directory.directoryPath,
        },
        context: {
          directoryPath: directory.directoryPath,
          directory,
        },
      } satisfies ProgramErrorPelue<ReportingLocator>;
    });

    return outputList;
  })
  .assemble();
