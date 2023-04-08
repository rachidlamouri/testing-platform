import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  EXTERNAL_MODULE_INSTANCE_ID_BY_SOURCE_PATH_GEPP,
  ExternalModuleInstanceIdBySourcePath,
  ExternalModuleInstanceIdBySourcePathVoictent,
} from './externalModuleInstanceIdBySourcePath';
import {
  EXTERNAL_MODULE_GEPP,
  ExternalModuleVoictent,
} from './graph-element/externalModule';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from './typeScriptFileRelationshipGraphZorn';

export const getExternalModuleInstanceIdBySourcePath = buildEstinant({
  name: 'getExternalModuleInstanceIdBySourcePath',
})
  .fromOdeshinVoictent<ExternalModuleVoictent>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .toGrition<ExternalModuleInstanceIdBySourcePathVoictent>({
    gepp: EXTERNAL_MODULE_INSTANCE_ID_BY_SOURCE_PATH_GEPP,
    getZorn: () => TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
  })
  .onPinbe((externalModuleList) => {
    const externalModuleInstanceIdBySourcePath: ExternalModuleInstanceIdBySourcePath =
      new Map();

    externalModuleList.forEach((externalModule) => {
      externalModuleInstanceIdBySourcePath.set(
        externalModule.sourcePath,
        externalModule.instanceId,
      );
    });

    return externalModuleInstanceIdBySourcePath;
  })
  .assemble();
