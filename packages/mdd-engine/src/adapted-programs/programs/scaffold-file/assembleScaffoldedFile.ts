import fs from 'fs';
import { posix } from 'path';
import chalk from 'chalk';
import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import {
  FileTypeName,
  SCAFFOLD_CONFIGURATION_COLLECTION_ID,
  ScaffoldConfiguration,
  ScaffoldConfigurationStreamMetatype,
  validTypeNameList,
} from './scaffoldConfiguration';
import { scaffoldFile } from './scaffoldFile';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { buildDefaultFileCollectionTuple } from '../../programmable-units/file/buildDefaultFileCollectionTuple';

type ScriptInput = {
  typeName: string | undefined;
  filePath: string | undefined;
  args: string[];
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

const [typeName, ...args] = process.argv.slice(2);
const filePath =
  typeName === FileTypeName.Feature
    ? 'packages/mdd-engine/features.yaml'
    : args[0];
const scriptInput: ScriptInput = {
  typeName,
  filePath,
  args: typeName === FileTypeName.Feature ? args : args.slice(1),
};

assertScriptInputIsValid(scriptInput);

/**
 * Given a file path, it populates that file with a template for defining a
 * collection type and all related types
 *
 * @canonicalComment
 *
 * @implements Y8RO
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
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    ...buildDefaultFileCollectionTuple(),
  ] as const),
  programmedTransformTuple: [enumerateFileSystemObjects, scaffoldFile] as const,
  programFileCache: new ProgramFileCache({
    namespace: 'assembleScaffoldedFile',
  }),
});
