import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  TypeScriptImportRelationshipListVoictent,
  TYPE_SCRIPT_IMPORT_RELATIONSHIP_LIST_GEPP,
} from '../type-script-file/typeScriptImportRelationshipList';
import {
  ExternalModuleOdeshin,
  ExternalModuleVoictent,
  EXTERNAL_MODULE_GEPP,
} from './externalModule';

export const getExternalModuleCollection = buildEstinant()
  .fromOdeshinVoictent<TypeScriptImportRelationshipListVoictent>({
    gepp: TYPE_SCRIPT_IMPORT_RELATIONSHIP_LIST_GEPP,
  })
  .toHubblepupTuple<ExternalModuleVoictent>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .onPinbe((input) => {
    const allModulePathList = input
      .flat()
      .map((relationship) => relationship.importee)
      .filter((importee) => !importee.isInternal)
      .map((externalImportee) => externalImportee.modulePath);

    const allModulePathSet = new Set(allModulePathList);

    const outputList = [...allModulePathSet].map<ExternalModuleOdeshin>(
      (modulePath) => {
        return {
          zorn: modulePath,
          grition: {
            modulePath,
          },
        };
      },
    );

    return outputList;
  })
  .assemble();
