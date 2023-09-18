import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { DIRECTORY_GEPP, DirectoryVoque } from '../file/directory';
import { ROOT_DIRECTORY_GEPP, RootDirectoryVoque } from './rootDirectory';

/**
 * Processes all Directory items at once in order to find the largest shared
 * directory path among them
 */
export const getRootDirectory = buildEstinant({
  name: 'getRootDirectory',
})
  .fromVoictent2<DirectoryVoque>({
    gepp: DIRECTORY_GEPP,
  })
  .toHubblepup2<RootDirectoryVoque>({
    gepp: ROOT_DIRECTORY_GEPP,
  })
  .onPinbe((directoryVoictent) => {
    let rootDirectory = directoryVoictent.list[0];

    directoryVoictent.list.forEach((directory) => {
      if (
        directory.directoryPath.partList.length <
        rootDirectory.directoryPath.partList.length
      ) {
        rootDirectory = directory;
      }
    });

    return rootDirectory;
  })
  .assemble();
