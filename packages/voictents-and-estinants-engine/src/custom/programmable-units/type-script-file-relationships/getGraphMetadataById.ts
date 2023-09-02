import { posix } from 'path';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoque,
} from '../type-script-file/typeScriptFile';
import { ROOT_DIRECTORY_GEPP, RootDirectoryVoque } from './rootDirectory';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from './typeScriptFileRelationshipGraphZorn';
import { DIRECTORY_GEPP, DirectoryVoque } from '../file/directory';
import {
  EXTERNAL_MODULE_GEPP,
  ExternalModuleVoque,
} from './graph-element/externalModule';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoque,
} from './graph-element/boundaryMetadata';
import {
  ROOT_METADATA_GEPP,
  RootMetadataVoque,
} from './graph-element/rootMetadata';
import {
  DirectedGraphMetadataByIdVoque,
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  DirectedGraphMetadataById,
} from '../graph-visualization/directedGraphMetadataById';
import { OdeshinZorn } from '../../adapter/odeshin2';

/**
 * Converts all TypeScript relationship metadata into a format that can be used
 * for presentation
 */
export const getGraphMetadataById = buildEstinant({
  name: 'getGraphMetadataById',
})
  .fromHubblepup2<RootMetadataVoque>({
    gepp: ROOT_METADATA_GEPP,
  })
  .andFromHubblepupTuple2<RootDirectoryVoque, [OdeshinZorn]>({
    gepp: ROOT_DIRECTORY_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .andFromVoictent2<BoundaryMetadataVoque>({
    gepp: BOUNDARY_METADATA_GEPP,
  })
  .andFromVoictent2<DirectoryVoque>({
    gepp: DIRECTORY_GEPP,
  })
  .andFromVoictent2<TypeScriptFileVoque>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromVoictent2<ExternalModuleVoque>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .toHubblepup2<DirectedGraphMetadataByIdVoque>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  })
  .onPinbe(
    (
      rootMetadata,
      [rootDirectory],
      boundaryList,
      directoryList,
      typeScriptFileVoictent,
      externalModuleList,
    ) => {
      const metadataById: DirectedGraphMetadataById = {
        zorn: rootMetadata.zorn,
        grition: {},
      };

      boundaryList.forEach((boundary) => {
        if (boundary.isInternal) {
          metadataById.grition[boundary.id] = {
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
        } else {
          metadataById.grition[boundary.id] = {
            title: boundary.attributeByKey.label,
            fieldList: [
              {
                label: 'Type',
                value: 'Boundary',
              },
              {
                label: 'Description',
                value: boundary.description,
              },
            ],
          };
        }
      });

      directoryList.forEach((directory) => {
        metadataById.grition[directory.instanceId] = {
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

      typeScriptFileVoictent.fileList.forEach((file) => {
        metadataById.grition[file.instanceId] = {
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
        metadataById.grition[externalModule.instanceId] = {
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
