import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { DIRECTORY_GEPP, DirectoryVoque } from '../file/directory';
import { ROOT_DIRECTORY_GEPP, RootDirectoryVoque } from './rootDirectory';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from './typeScriptFileRelationshipGraphZorn';

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
  .onPinbe((directoryList) => {
    let rootDirectory = directoryList[0];

    directoryList.forEach((directory) => {
      if (
        directory.directoryPathPartList.length <
        rootDirectory.directoryPathPartList.length
      ) {
        rootDirectory = directory;
      }
    });

    // TODO: this zorn doesn't make sense
    return {
      ...rootDirectory,
      zorn: TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
    };
  })
  .assemble();
