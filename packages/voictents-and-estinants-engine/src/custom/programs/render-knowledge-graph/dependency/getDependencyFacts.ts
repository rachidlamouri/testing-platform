import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportListVoque,
} from '../../../programmable-units/type-script-file/typeScriptFileImportList';
import { FILE_FACT_GEPP, FileFactVoque } from '../file/fileFact';
import {
  DEPENDENCY_FACT_GEPP,
  DependencyFactInstance,
  DependencyFactVoque,
} from './dependencyFact';

/**
 * Get graph metadata for relationships between TypeScript files
 */
export const getDependencyFacts = buildEstinant({
  name: 'getDependencyFacts',
})
  .fromHubblepup2<TypeScriptFileImportListVoque>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  })
  .andFromHubblepupTuple2<FileFactVoque, [string, ...string[]]>({
    gepp: FILE_FACT_GEPP,
    framate: (importList) => {
      return [
        // TODO: replace "zorn" with filepath
        importList.hubblepup.zorn,
        ...importList.hubblepup.list
          .filter((importItem) => importItem.isInternal)
          .map((importItem) => {
            return importItem.sourcePath;
          }),
      ];
    },
    croard: (fileFact) => {
      return fileFact.hubblepup.file.filePath;
    },
  })
  .toHubblepupTuple2<DependencyFactVoque>({
    gepp: DEPENDENCY_FACT_GEPP,
  })
  .onPinbe((importList, [importingFact, ...importedFileFactList]) => {
    const outputList = importedFileFactList.map((importedFact) => {
      return new DependencyFactInstance({
        importingFact,
        importedFact,
      });
    });

    return outputList;
  })
  .assemble();
