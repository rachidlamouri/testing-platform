import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportListVoictent,
} from '../../type-script-file/typeScriptFileImportList';
import {
  EXTERNAL_MODULE_GEPP,
  ExternalModuleOdeshin,
  ExternalModuleVoictent,
} from './externalModule';
import { getTextDigest } from '../../../../utilities/getTextDigest';

/**
 * Gets all external module file paths at once in order to deduplicate them and
 * assign each one a unique id.
 */
export const getExternalModuleCollection = buildEstinant({
  name: 'getExternalModuleCollection',
})
  .fromOdeshinVoictent<TypeScriptFileImportListVoictent>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  })
  .toHubblepupTuple<ExternalModuleVoictent>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .onPinbe((importListList) => {
    const externalSourcePathList = importListList
      .flat()
      .filter((importItem) => {
        return !importItem.isInternal;
      })
      .map((importItem) => {
        return importItem.sourcePath;
      });

    const externalSourcePathSet = new Set(externalSourcePathList);

    const outputList = [...externalSourcePathSet].map<ExternalModuleOdeshin>(
      (sourcePath) => {
        return {
          zorn: sourcePath,
          grition: {
            instanceId: getTextDigest(sourcePath),
            sourcePath,
          },
        };
      },
    );

    return outputList;
  })
  .assemble();
