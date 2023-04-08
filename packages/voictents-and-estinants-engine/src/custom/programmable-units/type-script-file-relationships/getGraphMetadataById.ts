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
import {
  BoundaryConfigurationVoictent,
  BOUNDARY_CONFIGURATION_GEPP,
} from './boundaryConfiguration';
import { EXTERNAL_BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY } from './graph-element/externalBoundarySubgraph';
import {
  EXTERNAL_MODULE_GEPP,
  ExternalModuleVoictent,
} from './graph-element/externalModule';

export const getGraphMetadataById = buildEstinant({
  name: 'getGraphMetadataById',
})
  .fromGrition<RootDirectoryVoictent>({
    gepp: ROOT_DIRECTORY_GEPP,
  })
  .andFromOdeshinVoictent<BoundaryConfigurationVoictent>({
    gepp: BOUNDARY_CONFIGURATION_GEPP,
  })
  .andFromOdeshinVoictent<DirectoryVoictent>({
    gepp: DIRECTORY_GEPP,
  })
  .andFromOdeshinVoictent<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromOdeshinVoictent<ExternalModuleVoictent>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .toGrition<DirectedGraphMetadataByIdVoictent>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
    getZorn: () => TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
  })
  .onPinbe(
    (
      rootDirectory,
      boundaryList,
      directoryList,
      typeScriptFileList,
      externalModuleList,
    ) => {
      const metadataById: DirectedGraphMetadataById = {};

      boundaryList.forEach((boundary) => {
        metadataById[boundary.instanceId] = {
          title: posix.basename(boundary.directoryPath),
          fieldList: [
            {
              label: 'Type',
              value: 'Boundary',
            },
            {
              label: 'Root Directory Path',
              value: rootDirectory.directoryPath,
            },
            {
              label: 'Directory Path',
              value: boundary.directoryPath.replace(
                rootDirectory.directoryPath,
                '<root>',
              ),
            },
          ],
        };
      });

      metadataById[EXTERNAL_BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY.id] = {
        title: EXTERNAL_BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY.label,
        fieldList: [
          {
            label: 'Type',
            value: 'Boundary',
          },
        ],
      };

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

      externalModuleList.forEach((externalModule) => {
        metadataById[externalModule.instanceId] = {
          title: externalModule.sourcePath,
          fieldList: [
            {
              label: 'Type',
              value: 'External Module',
            },
          ],
        };
      });

      return metadataById;
    },
  )
  .assemble();
