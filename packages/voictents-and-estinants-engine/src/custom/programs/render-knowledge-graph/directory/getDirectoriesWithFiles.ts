import { buildEstinant } from '../../../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTORY_GEPP,
  DirectoryVoque,
} from '../../../programmable-units/file/directory';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoque,
} from '../../../programmable-units/type-script-file/typeScriptFile';
import {
  DIRECTORY_WITH_FILE_GEPP,
  DirectoryWithFileVoque,
} from './directoryWithFile';

/**
 * Filters the set of directories to just those with TypeScript files
 */
export const getDirectoriesWithFiles = buildEstinant({
  name: 'getDirectoriesWithFiles',
})
  .fromVoictent2<DirectoryVoque>({
    gepp: DIRECTORY_GEPP,
  })
  .andFromVoictent2<TypeScriptFileVoque>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .toHubblepupTuple2<DirectoryWithFileVoque>({
    gepp: DIRECTORY_WITH_FILE_GEPP,
  })
  .onPinbe((directoryVoictent, typeScriptFileVoictent) => {
    const mutableDirectoryStateByDirectoryPath = new Map(
      directoryVoictent.list.map((directory) => {
        const mutableState = {
          directory,
          hasFile: false,
        };

        return [directory.directoryPath.serialized, mutableState] as const;
      }),
    );

    typeScriptFileVoictent.list.forEach((typeScriptFile) => {
      const directoryState = mutableDirectoryStateByDirectoryPath.get(
        typeScriptFile.filePath.parentDirectoryPath,
      );

      if (directoryState === undefined) {
        throw Error(
          `Unexpected missing directory for path "${typeScriptFile.filePath.parentDirectoryPath}". All TypeScript files should correspond to a parent Directory object, so something is very wrong.`,
        );
      }

      directoryState.hasFile = true;
    });

    const outputList = [...mutableDirectoryStateByDirectoryPath.values()]
      .filter(({ hasFile }) => hasFile)
      .map(({ directory }) => directory);

    return outputList;
  })
  .assemble();
