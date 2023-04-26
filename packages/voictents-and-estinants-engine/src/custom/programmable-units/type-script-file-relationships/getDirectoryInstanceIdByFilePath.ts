import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { DIRECTORY_GEPP, DirectoryVoictent } from '../file/directory';
import {
  DIRECTORY_INSTANCE_ID_BY_FILE_PATH_GEPP,
  DirectoryInstanceIdByDirectoryPath,
  DirectoryInstanceIdByDirectoryPathVoictent,
} from './directoryInstanceIdByDirectoryPath';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from './typeScriptFileRelationshipGraphZorn';

/**
 * Consumes the entire Directory collection in order to index Directory object
 * ids by their directory path. This allows later transforms to associate File
 * items to Directory items via their directory path.
 */
export const getDirectoryInstanceIdByDirectoryPath = buildEstinant({
  name: 'getDirectoryInstanceIdByDirectoryPath',
})
  .fromOdeshinVoictent<DirectoryVoictent>({
    gepp: DIRECTORY_GEPP,
  })
  .toHubblepup<DirectoryInstanceIdByDirectoryPathVoictent>({
    gepp: DIRECTORY_INSTANCE_ID_BY_FILE_PATH_GEPP,
  })
  .onPinbe((directoryList) => {
    const directoryInstanceIdByDirectoryPath: DirectoryInstanceIdByDirectoryPath =
      new Map();
    directoryList.forEach((directory) => {
      directoryInstanceIdByDirectoryPath.set(
        directory.directoryPath,
        directory.instanceId,
      );
    });

    return {
      zorn: TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
      grition: directoryInstanceIdByDirectoryPath,
    };
  })
  .assemble();
