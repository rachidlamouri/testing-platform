import { buildEstinant } from '../../../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportListVoque,
} from '../../type-script-file/typeScriptFileImportList';
import {
  EXTERNAL_MODULE_GEPP,
  ExternalModule,
  ExternalModuleVoque,
} from './externalModule';
import { getTextDigest } from '../../../../utilities/getTextDigest';

/**
 * Gets all external module file paths at once in order to deduplicate them and
 * assign each one a unique id.
 */
export const getExternalModuleCollection = buildEstinant({
  name: 'getExternalModuleCollection',
})
  .fromVoictent2<TypeScriptFileImportListVoque>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  })
  .toHubblepupTuple2<ExternalModuleVoque>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .onPinbe((importListList) => {
    const externalSourcePathList = importListList
      .flatMap((element) => element.list)
      .filter((importItem) => {
        return !importItem.isInternal;
      })
      .map((importItem) => {
        return importItem.sourcePath;
      });

    const externalSourcePathSet = new Set(externalSourcePathList);

    const outputList = [...externalSourcePathSet].map<ExternalModule>(
      (sourcePath) => {
        return {
          zorn: sourcePath,
          instanceId: getTextDigest(sourcePath),
          sourcePath,
        };
      },
    );

    return outputList;
  })
  .assemble();
