import fs from 'fs';
import { posix } from 'path';
import chalk from 'chalk';
import {
  buildVoictentByGepp,
  digikikify,
} from '../../../adapter/engine/digikikify';
import {
  SCAFFOLD_CONFIGURATION_GEPP,
  ScaffoldConfiguration,
  ScaffoldConfigurationVoque,
  fileTypeNameByDeprecatedFileTypeName,
  isDeprecatedFileTypeName,
  validTypeNameList,
} from './scaffoldConfiguration';
import { scaffoldFile } from './scaffoldFile';
import { InMemoryVoictent } from '../../../layer-agnostic-utilities/voictent/inMemoryVoictent';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
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
    const directoryPath = posix.dirname(input.filePath);
    fs.mkdirSync(directoryPath, { recursive: true });
    fs.writeFileSync(input.filePath, '');
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
      '',
      `${chalk.cyan('Usage')}: npm run scaffold <typeName> <filePath>`,
      '',
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

if (isDeprecatedFileTypeName(scriptInput.typeName)) {
  const formattedExclamation = chalk.yellow('AYE YAI YAI');

  const formattedInputTypeName = chalk.cyan(scriptInput.typeName);

  const replacementName =
    fileTypeNameByDeprecatedFileTypeName[scriptInput.typeName];

  const formattedSuggestion = chalk.green(replacementName);

  /* eslint-disable no-console */
  console.log();
  console.log(
    '=============================================================================',
  );
  console.log();
  console.log(
    `${formattedExclamation}: the option ${formattedInputTypeName} is deprecated, use ${formattedSuggestion} instead.`,
  );
  console.log();
  console.log(
    '=============================================================================',
  );
  console.log();
  /* eslint-enable no-console */
}

/**
 * Given a file path, it populates that file with a template for defining a
 * collection type and all related types
 *
 * @canonicalComment
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
