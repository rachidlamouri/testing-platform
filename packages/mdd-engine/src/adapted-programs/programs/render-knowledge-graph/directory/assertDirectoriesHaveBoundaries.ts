import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  ReportingProgrammedTransformLocator,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorEgg,
} from '../../../programmable-units/error/programError';
import {
  DIRECTORY_WITH_FILE_COLLECTION_ID,
  DirectoryWithFileStreamMetatype,
} from './directoryWithFile';
import {
  BOUNDED_DIRECTORY_COLLECTION_ID,
  BoundedDirectoryStreamMetatype,
} from './boundedDirectory';

const PROGRAMMED_TRANSFORM_NAME = 'assertCiModelHasAllPrograms' as const;
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
 * Flags any directories that do not fall under a boundary
 *
 * @todo This should really check that all directories with TypeScript files (or other files of interest) fall under a boundary
 */
export const assertDirectoriesHaveBoundaries = buildProgrammedTransform({
  name: 'assertDirectoriesHaveBoundaries',
})
  .fromCollection2<DirectoryWithFileStreamMetatype>({
    collectionId: DIRECTORY_WITH_FILE_COLLECTION_ID,
  })
  .andFromCollection2<BoundedDirectoryStreamMetatype>({
    collectionId: BOUNDED_DIRECTORY_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((directoryWithFileCollection, boundedDirectoryCollection) => {
    const unboundedDirectoryList = directoryWithFileCollection.filter(
      (directory) => {
        const boundedDirectory = boundedDirectoryCollection.byNodePath.get(
          directory.directoryPath.serialized,
        );
        return boundedDirectory === undefined;
      },
    );

    const outputList = unboundedDirectoryList.map((directory) => {
      return {
        name: 'unbounded-directory',
        error: new Error(
          `Directory ${directory.directoryPath.serialized} is not under a boundary`,
        ),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
          filePath: directory.directoryPath.serialized,
        },
        context: {
          directoryPath: directory.directoryPath.serialized,
          directory,
        },
      } satisfies ProgramErrorEgg<ReportingLocator>;
    });

    return outputList;
  })
  .assemble();
