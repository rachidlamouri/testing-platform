import { posix } from 'path';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  DirectedGraphMetadataById,
  DirectedGraphMetadataByIdVoictent,
} from '../graph-visualization/directedGraphMetadataById';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoictent,
} from '../type-script-file/typeScriptFile';
import { ROOT_DIRECTORY_GEPP, RootDirectoryVoictent } from './rootDirectory';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from './typeScriptFileRelationshipGraphZorn';
import { DIRECTORY_GEPP, DirectoryVoictent } from '../file/directory';

export const getGraphMetadataById = buildEstinant({
  name: 'getGraphMetadataById',
})
  .fromGrition<RootDirectoryVoictent>({
    gepp: ROOT_DIRECTORY_GEPP,
  })
  .andFromOdeshinVoictent<DirectoryVoictent>({
    gepp: DIRECTORY_GEPP,
  })
  .andFromOdeshinVoictent<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .toGrition<DirectedGraphMetadataByIdVoictent>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
    getZorn: () => TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
  })
  .onPinbe(
    (
      rootDirectory,
      directoryList,
      typeScriptFileList,
      // TODO: add more inputs
    ) => {
      const metadataById: DirectedGraphMetadataById = {};

      directoryList.forEach((directory) => {
        metadataById[directory.instanceId] = {
          title: posix.basename(directory.directoryPath),
          fieldList: [
            {
              label: 'Type',
              value: 'Directory',
            },
            {
              label: 'Root Directory Path',
              value: rootDirectory.directoryPath,
            },
            {
              label: 'Directory Path',
              value: directory.directoryPath.replace(
                rootDirectory.directoryPath,
                '<root>',
              ),
            },
          ],
        };
      });

      typeScriptFileList.forEach((file) => {
        metadataById[file.instanceId] = {
          title: file.onDiskFileName.camelCase,
          fieldList: [
            {
              label: 'Type',
              value: 'File',
            },
            {
              label: 'Root Directory Path',
              value: rootDirectory.directoryPath,
            },
            {
              label: 'Parent Directory Path',
              value: posix
                .dirname(file.filePath)
                .replace(rootDirectory.directoryPath, '<root>'),
            },
            {
              label: 'File Path',
              value: file.filePath.replace(
                rootDirectory.directoryPath,
                '<root>',
              ),
            },
          ],
        };
      });

      return metadataById;
    },
  )
  .assemble();
