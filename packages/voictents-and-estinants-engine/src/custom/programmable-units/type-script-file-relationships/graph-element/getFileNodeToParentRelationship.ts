import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { ERROR_GEPP, ErrorVoictent } from '../../error/error';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoictent,
} from '../../type-script-file/typeScriptFile';
import {
  DIRECTORY_INSTANCE_ID_BY_FILE_PATH_GEPP,
  DirectoryInstanceIdByDirectoryPathVoictent,
} from '../directoryInstanceIdByDirectoryPath';
import {
  NODE_TO_GRAPH_RELATIONSHIP_GEPP,
  NodeToGraphRelationshipVoictent,
} from '../nodeToGraphRelationship';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';

export const getFileNodeToParentRelationship = buildEstinant({
  name: 'getFileNodeToParentRelationship',
})
  .fromHubblepup<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromGritionTuple<DirectoryInstanceIdByDirectoryPathVoictent, [string]>({
    gepp: DIRECTORY_INSTANCE_ID_BY_FILE_PATH_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.zorn,
  })
  .toHubblepupTuple<ErrorVoictent>({
    gepp: ERROR_GEPP,
  })
  .toHubblepupTuple<NodeToGraphRelationshipVoictent>({
    gepp: NODE_TO_GRAPH_RELATIONSHIP_GEPP,
  })
  .onPinbe((leftInput, [directoryInstanceIdByFilePath]) => {
    const file = leftInput.grition;

    const directoryId = directoryInstanceIdByFilePath.get(file.directoryPath);

    if (directoryId === undefined) {
      return {
        [ERROR_GEPP]: [
          {
            zorn: `getFileNodeToParentRelationship/${leftInput.zorn}`,
            grition: {
              filePath: file.filePath,
            },
          },
        ],
        [NODE_TO_GRAPH_RELATIONSHIP_GEPP]: [],
      };
    }

    return {
      [ERROR_GEPP]: [],
      [NODE_TO_GRAPH_RELATIONSHIP_GEPP]: [
        {
          zorn: leftInput.zorn,
          grition: {
            parentId: directoryId,
            childId: file.instanceId,
          },
        },
      ],
    };
  })
  .assemble();
