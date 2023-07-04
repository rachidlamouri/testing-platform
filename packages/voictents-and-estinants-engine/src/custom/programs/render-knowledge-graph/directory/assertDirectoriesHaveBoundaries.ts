import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  ReportingEstinantLocator,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
  ReceivedProgramError,
} from '../../../programmable-units/error/programError';
import {
  DIRECTORY_WITH_FILE_GEPP,
  DirectoryWithFileVoque,
} from './directoryWithFile';
import {
  BOUNDARY_SUBDIRECTORY_SET_GEPP,
  BoundarySubdirectorySetVoque,
} from './boundarySubdirectorySet';

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
  .andFromVoictent2<BoundarySubdirectorySetVoque>({
    gepp: BOUNDARY_SUBDIRECTORY_SET_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((directoryList, boundarySubdirectorySetList) => {
    const boundaryDirectoryPathSet = new Set(
      boundarySubdirectorySetList.map((boundarySubdirectorySet) => {
        return boundarySubdirectorySet.boundaryDirectoryPath;
      }),
    );

    const boundedDirectoryPathSet = new Set(
      boundarySubdirectorySetList.flatMap((boundarySubdirectorySet) => {
        return boundarySubdirectorySet.subdirectoryPathList;
      }),
    );

    const unboundedDirectoryList = directoryList.filter((directory) => {
      const isBoundaryDirectory = boundaryDirectoryPathSet.has(
        directory.directoryPath,
      );
      const isBoundarySubdirectory = boundedDirectoryPathSet.has(
        directory.directoryPath,
      );
      const isBounded = isBoundaryDirectory || isBoundarySubdirectory;

      return !isBounded;
    });

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
          directory,
        },
      } satisfies ReceivedProgramError<ReportingLocator>;
    });

    return outputList;
  })
  .assemble();
