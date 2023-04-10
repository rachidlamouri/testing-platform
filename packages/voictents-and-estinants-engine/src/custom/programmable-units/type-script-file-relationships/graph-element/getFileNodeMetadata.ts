import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { ERROR_GEPP, ErrorVoictent } from '../../error/error';
import { Shape } from '../../graph-visualization/directed-graph/attribute';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoictent,
} from '../../type-script-file/typeScriptFile';
import {
  DIRECTORY_INSTANCE_ID_BY_FILE_PATH_GEPP,
  DirectoryInstanceIdByDirectoryPathVoictent,
} from '../directoryInstanceIdByDirectoryPath';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoictent,
} from './boundaryMetadata';
import { FONT_SIZE, COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';
import {
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadata,
  FileNodeMetadataVoictent,
} from './fileNodeMetadata';

export const getFileNodeMetadata = buildEstinant({
  name: 'getFileNodeMetadata',
})
  .fromHubblepup<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromGritionTuple<DirectoryInstanceIdByDirectoryPathVoictent, [string]>({
    gepp: DIRECTORY_INSTANCE_ID_BY_FILE_PATH_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromOdeshinVoictent<BoundaryMetadataVoictent>({
    gepp: BOUNDARY_METADATA_GEPP,
  })
  .toHubblepupTuple<ErrorVoictent>({
    gepp: ERROR_GEPP,
  })
  .toHubblepupTuple<FileNodeMetadataVoictent>({
    gepp: FILE_NODE_METADATA_GEPP,
  })
  .onPinbe((leftInput, [directoryInstanceIdByDirectoryPath], boundaryList) => {
    const file = leftInput.grition;

    const directoryId = directoryInstanceIdByDirectoryPath.get(
      file.directoryPath,
    );

    const foundBoundary = boundaryList.find(
      (boundary) =>
        boundary.isInternal && file.filePath.startsWith(boundary.directoryPath),
    );

    if (directoryId === undefined || foundBoundary === undefined) {
      return {
        [ERROR_GEPP]: [
          {
            zorn: `getFileNodeMetadata/${leftInput.zorn}`,
            grition: {
              message: 'Unable to find directory id or boundary id',
              directoryId,
              boundaryId: foundBoundary?.id,
              file,
            },
          },
        ],
        [FILE_NODE_METADATA_GEPP]: [],
      };
    }

    return {
      [ERROR_GEPP]: [],
      [FILE_NODE_METADATA_GEPP]: [
        {
          zorn: leftInput.zorn,
          grition: {
            id: file.instanceId,
            directoryId,
            boundaryId: foundBoundary.id,
            filePath: file.filePath,
            attributeByKey: {
              label: file.onDiskFileName.pascalCase,
              shape: Shape.Box,
              fontsize: FONT_SIZE.node,
              color: 'gray',
              ...COMMON_ATTRIBUTE_BY_KEY,
            },
          } satisfies FileNodeMetadata,
        },
      ],
    };
  })
  .assemble();
