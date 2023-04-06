import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { DIRECTORY_GEPP, DirectoryVoictent } from '../file/directory';
import { ROOT_DIRECTORY_GEPP, RootDirectoryVoictent } from './rootDirectory';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from './typeScriptFileRelationshipGraphZorn';

export const getRootDirectory = buildEstinant({
  name: 'getRootDirectory',
})
  .fromOdeshinVoictent<DirectoryVoictent>({
    gepp: DIRECTORY_GEPP,
  })
  .toGrition<RootDirectoryVoictent>({
    gepp: ROOT_DIRECTORY_GEPP,
    getZorn: () => TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
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

    return rootDirectory;
  })
  .assemble();
