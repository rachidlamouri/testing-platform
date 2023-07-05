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
  DIRECTORY_BOUNDARY_RELATIONSHIP_GEPP,
  DirectoryBoundaryRelationshipVoque,
} from './directoryBoundaryRelationship';
import { BOUNDARY_GEPP, BoundaryVoque } from '../boundary/boundary';

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
  .andFromVoictent2<DirectoryBoundaryRelationshipVoque>({
    gepp: DIRECTORY_BOUNDARY_RELATIONSHIP_GEPP,
  })
  .andFromVoictent2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((directoryList, boundaryDirectoryRelationshipList, boundaryList) => {
    const boundaryDirectoryPathSet = new Set(
      boundaryList.map((boundary) => {
        return boundary.directoryPath;
      }),
    );

    const boundedDirectoryPathSet = new Set(
      boundaryDirectoryRelationshipList.map((relationship) => {
        return relationship.directory.directoryPath;
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
          directoryPath: directory.directoryPath,
          boundaryDirectoryPathSet,
          boundedDirectoryPathSet,
          directory,
        },
      } satisfies ReceivedProgramError<ReportingLocator>;
    });

    return outputList;
  })
  .assemble();
