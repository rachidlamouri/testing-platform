import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../../programmable-units/file/directory';
import { BOUNDARY_GEPP, BoundaryVoque } from '../boundary/boundary';
import {
  COMMON_BOUNDARY_ROOT_GEPP,
  CommonBoundaryRootInstance,
  CommonBoundaryRootVoque,
} from './commonBoundaryRoot';

/**
 * See CommonBoundaryRoot for more details
 */
export const getCommonBoundaryRoot = buildEstinant({
  name: 'getCommonBoundaryRoot',
})
  .fromVoictent2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .andFromVoictent2<DirectoryVoque>({
    gepp: DIRECTORY_GEPP,
  })
  .toHubblepup2<CommonBoundaryRootVoque>({
    gepp: COMMON_BOUNDARY_ROOT_GEPP,
  })
  .onPinbe((boundaryList, directoryVoictent) => {
    const boundaryDirectoryList = boundaryList.map((boundary) => {
      const directory = directoryVoictent.byNodePath.get(
        boundary.directory.directoryPath,
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
        directory.directoryPathPartList.length < shortestPathPartList.length
      ) {
        shortestPathPartList = directory.directoryPathPartList;
      }
    });

    if (shortestPathPartList === null) {
      throw Error('Unexpected missing common root boundary');
    }

    const partListCopy = (shortestPathPartList as string[]).slice();

    // Remove the last path since that corresponds to a boundary and we want the root of all boundary directories
    partListCopy.pop();

    return new CommonBoundaryRootInstance({
      directoryPath: partListCopy.join(posix.sep),
    });
  })
  .assemble();
