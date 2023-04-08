import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoictent,
} from '../type-script-file/typeScriptFile';
import {
  TYPE_SCRIPT_FILE_INSTANCE_ID_BY_FILE_PATH_GEPP,
  TypeScriptFileInstanceIdByFilePathVoictent,
} from './typeScriptFileInstanceIdByFilePath';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from './typeScriptFileRelationshipGraphZorn';

export const getTypeScriptFileInstanceIdByFilePath = buildEstinant({
  name: 'getTypeScriptFileInstanceIdByFilePath',
})
  .fromOdeshinVoictent<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .toGrition<TypeScriptFileInstanceIdByFilePathVoictent>({
    gepp: TYPE_SCRIPT_FILE_INSTANCE_ID_BY_FILE_PATH_GEPP,
    getZorn: () => TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
  })
  .onPinbe((typeScriptFileList) => {
    const instanceIdByFilePath = new Map<string, string>();

    typeScriptFileList.forEach((file) => {
      instanceIdByFilePath.set(file.filePath, file.instanceId);
    });

    return instanceIdByFilePath;
  })
  .assemble();
