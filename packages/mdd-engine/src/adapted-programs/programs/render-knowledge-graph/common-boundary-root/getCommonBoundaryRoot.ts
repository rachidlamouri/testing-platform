import { posix } from 'path';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  DIRECTORY_COLLECTION_ID,
  DirectoryStreamMetatype,
} from '../../../programmable-units/file/directory';
import {
  BOUNDARY_COLLECTION_ID,
  BoundaryStreamMetatype,
} from '../boundary/boundary';
import {
  COMMON_BOUNDARY_ROOT_COLLECTION_ID,
  CommonBoundaryRootInstance,
  CommonBoundaryRootStreamMetatype,
} from './commonBoundaryRoot';
import {
  BOUNDARY_FACT_COLLECTION_ID,
  BoundaryFactInstance,
  BoundaryFactStreamMetatype,
} from '../boundary/boundaryFact';

/**
 * See CommonBoundaryRoot for more details
 */
export const getCommonBoundaryRoot = buildProgrammedTransform({
  name: 'getCommonBoundaryRoot',
})
  .fromCollection2<BoundaryStreamMetatype>({
    collectionId: BOUNDARY_COLLECTION_ID,
  })
  .andFromCollection2<DirectoryStreamMetatype>({
    collectionId: DIRECTORY_COLLECTION_ID,
  })
  .toItem2<CommonBoundaryRootStreamMetatype>({
    collectionId: COMMON_BOUNDARY_ROOT_COLLECTION_ID,
  })
  .toItemTuple2<BoundaryFactStreamMetatype>({
    collectionId: BOUNDARY_FACT_COLLECTION_ID,
  })
  .onTransform((boundaryCollection, directoryCollection) => {
    const boundaryDirectoryList = boundaryCollection.list.map((boundary) => {
      const directory = directoryCollection.byNodePath.get(
        boundary.directory.directoryPath.serialized,
      );
      if (directory === undefined) {
        throw Error(
          'Unexpected undefined directory: All boundary directories come from the directory collection',
        );
      }

      return directory;
    });

    let shortestPathPartList: string[] | null = null;

    boundaryDirectoryList.forEach((directory) => {
      if (
        shortestPathPartList === null ||
        directory.directoryPath.partList.length < shortestPathPartList.length
      ) {
        shortestPathPartList = directory.directoryPath.partList;
      }
    });

    if (shortestPathPartList === null) {
      throw Error('Unexpected missing common root boundary');
    }

    const partListCopy = (shortestPathPartList as string[]).slice();

    // Remove the last path since that corresponds to a boundary and we want the root of all boundary directories
    partListCopy.pop();

    const commonBoundaryRoot = new CommonBoundaryRootInstance({
      directoryPath: partListCopy.join(posix.sep),
    });

    const boundaryFactList = boundaryCollection.list.map((boundary) => {
      return new BoundaryFactInstance({
        boundary,
        commonBoundaryRoot,
      });
    });

    return {
      [COMMON_BOUNDARY_ROOT_COLLECTION_ID]: commonBoundaryRoot,
      [BOUNDARY_FACT_COLLECTION_ID]: boundaryFactList,
    };
  })
  .assemble();
