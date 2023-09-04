import fs from 'fs';
import {
  buildVoictentByGepp,
  digikikify,
} from '../../../type-script-adapter/digikikify';
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

type ScriptInput = {
  filePath: string | undefined;
  typeName: string | undefined;
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

const [filePath, typeName] = process.argv.slice(2);
const scriptInput: ScriptInput = {
  filePath,
  typeName,
};

assertScriptInputIsValid(scriptInput);

/**
 * Given a file path, it populates that file with a template for defining a
 * collection type and all related types
 */
digikikify({
  explicitVoictentTuple: [
    new InMemoryVoictent<ScaffoldConfigurationVoque>({
      gepp: SCAFFOLD_CONFIGURATION_GEPP,
      initialHubblepupPelueTuple: [scriptInput],
    }),
  ] as const,
  fileSystemNodeGeppCombination: defaultFileGeppCombination,
  uninferableVoictentByGepp: buildVoictentByGepp([] as const),
  estinantTuple: [scaffoldFile] as const,
  programFileCache: new ProgramFileCache({
    namespace: 'assembleScaffoldedFile',
  }),
});
