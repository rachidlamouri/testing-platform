import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ImportRelationshipListVoictent,
  IMPORT_RELATIONSHIP_LIST_GEPP,
} from '../type-script-file/typeScriptImportRelationshipList';
import {
  TypeScriptFileVoictent,
  TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/typeScriptFile';
import {
  CustomGraphElement,
  CustomGraphElementVoictent,
  CUSTOM_GRAPH_ELEMENT_GEPP,
} from './graph-element/customGraphElement';
import { ExternalModuleVoictent, EXTERNAL_MODULE_GEPP } from './externalModule';

export const getStuff = buildEstinant()
  .fromVoictent<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromOdeshinVoictent<ImportRelationshipListVoictent>({
    gepp: IMPORT_RELATIONSHIP_LIST_GEPP,
  })
  .andFromOdeshinVoictent<ExternalModuleVoictent>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .toHubblepupTuple<CustomGraphElementVoictent>({
    gepp: CUSTOM_GRAPH_ELEMENT_GEPP,
  })
  .onPinbe(
    (typeScriptFileTuple, importRelationshipListTuple, externalModuleTuple) => {
      const graphElement: CustomGraphElement = {
        typeName: CustomGraphElementTypName.Boundary,
        metadata: {
          directoryPath: input.directoryPath,
        },
      };

      return graphElement;
    },
  )
  .assemble();
