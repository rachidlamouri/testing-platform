import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoque,
} from '../../../programmable-units/type-script-file/typeScriptFile';
import {
  DIRECTORY_FACT_GEPP,
  DirectoryFactVoque,
} from '../directory/directoryFact';
import { FILE_FACT_GEPP, FileFactInstance, FileFactVoque } from './fileFact';

/**
 * Gets graph metadata for a file within a boundary. This helps set the ids of
 * edges
 */
export const getFileFact = buildEstinant({
  name: 'getFileFact',
})
  .fromHubblepup2<TypeScriptFileVoque>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromHubblepupTuple2<DirectoryFactVoque, [string]>({
    gepp: DIRECTORY_FACT_GEPP,
    framate: (typescriptFile) => {
      return [typescriptFile.hubblepup.directoryPath];
    },
    croard: (directoryFact) => directoryFact.hubblepup.directory.directoryPath,
  })
  .toHubblepup2<FileFactVoque>({
    gepp: FILE_FACT_GEPP,
  })
  .onPinbe((file, [directoryFact]) => {
    return new FileFactInstance({
      file,
      directoryFact,
    });
  })
  .assemble();
