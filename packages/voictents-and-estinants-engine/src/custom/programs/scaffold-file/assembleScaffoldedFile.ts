import fs from 'fs';
import { posix } from 'path';
import { buildVoictentByGepp, digikikify } from '../../adapter/digikikify';
import {
  SCAFFOLD_CONFIGURATION_GEPP,
  ScaffoldConfiguration,
  ScaffoldConfigurationVoque,
  validTypeNameList,
} from './scaffoldConfiguration';
import { scaffoldFile } from './scaffoldFile';
import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import { defaultFileGeppCombination } from '../../programmable-units/file/defaultFileGeppCombination';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';

type ScriptInput = {
  typeName: string | undefined;
  filePath: string | undefined;
};

function assertScriptInputIsValid(
  input: ScriptInput,
): asserts input is ScaffoldConfiguration {
  const errorMessageList: string[] = [];

  if (input.filePath === undefined) {
    errorMessageList.push('filePath is required');
  } else if (!fs.existsSync(input.filePath)) {
    errorMessageList.push(`"${input.filePath}" does not exist`);
  }

  if (input.typeName === undefined) {
    errorMessageList.push('typeName is required');
  } else if (!validTypeNameList.includes(input.typeName)) {
    errorMessageList.push(
      `typeName must be one of: ${validTypeNameList.join(', ')}`,
    );
  }

  if (errorMessageList.length > 0) {
    const errorMessage = [
      `Encountered ${errorMessageList.length} Error(s)`,
      ...errorMessageList.map((line) => `  ${line}`),
    ].join('\n');

    throw Error(errorMessage);
  }
}

const [typeName, filePath] = process.argv.slice(2);
const scriptInput: ScriptInput = {
  typeName,
  filePath,
};

assertScriptInputIsValid(scriptInput);

/**
 * Given a file path, it populates that file with a template for defining a
 * collection type and all related types
 */
digikikify({
  explicitVoictentTuple: [
    new InMemoryVoictent<FileSystemObjectEnumeratorConfigurationVoque>({
      gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialHubblepupPelueTuple: [
        {
          directoryPath: posix.dirname(filePath),
          ignoredNodePathConfigurationList: [],
        },
      ],
    }),
    new InMemoryVoictent<ScaffoldConfigurationVoque>({
      gepp: SCAFFOLD_CONFIGURATION_GEPP,
      initialHubblepupPelueTuple: [scriptInput],
    }),
  ] as const,
  fileSystemNodeGeppCombination: defaultFileGeppCombination,
  uninferableVoictentByGepp: buildVoictentByGepp([] as const),
  estinantTuple: [enumerateFileSystemObjects, scaffoldFile] as const,
  programFileCache: new ProgramFileCache({
    namespace: 'assembleScaffoldedFile',
  }),
});
