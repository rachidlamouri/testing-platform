import fs from 'fs';
import { posix } from 'path';
import chalk from 'chalk';
import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import {
  SCAFFOLD_CONFIGURATION_COLLECTION_ID,
  ScaffoldConfiguration,
  ScaffoldConfigurationStreamMetatype,
  validTypeNameList,
} from './scaffoldConfiguration';
import { scaffoldFile } from './scaffoldFile';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { defaultFileCollectionIdCombination } from '../../programmable-units/file/defaultFileGeppCombination';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
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

/**
 * Given a file path, it populates that file with a template for defining a
 * collection type and all related types
 *
 * @canonicalComment
 */
runEngine({
  explicitCollectionTuple: [
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationStreamMetatype>(
      {
        collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
        initialItemEggTuple: [
          {
            directoryPath: posix.dirname(filePath),
            ignoredNodePathConfigurationList: [],
          },
        ],
      },
    ),
    new InMemoryCollection<ScaffoldConfigurationStreamMetatype>({
      collectionId: SCAFFOLD_CONFIGURATION_COLLECTION_ID,
      initialItemEggTuple: [scriptInput],
    }),
  ] as const,
  fileSystemNodeCollectionIdCombination: defaultFileCollectionIdCombination,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId(
    [] as const,
  ),
  programmedTransformTuple: [enumerateFileSystemObjects, scaffoldFile] as const,
  programFileCache: new ProgramFileCache({
    namespace: 'assembleScaffoldedFile',
  }),
});
