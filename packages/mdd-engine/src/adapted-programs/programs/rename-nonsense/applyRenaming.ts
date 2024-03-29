import chalk from 'chalk';
import { SpawnSyncReturns } from 'child_process';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import {
  DIRECTORY_COLLECTION_ID,
  Directory,
  DirectoryStreamMetatype,
} from '../../programmable-units/file/directory';
import { applyFileSystemNodeChange } from './applyFileSystemNodeChange';
import { applySymbolRename } from './applySymbolRename';
import {
  FILE_SYSTEM_NODE_RENAME_CONFIGURATION_COLLECTION_ID,
  FileSystemNodeRenameConfiguration,
  FileSystemNodeRenameConfigurationStreamMetatype,
} from './fileSystemNodeRenameConfiguration';
import {
  RENAME_CONFIGURATION_COLLECTION_ID,
  RenameConfiguration,
  RenameConfigurationStreamMetatype,
} from './renameConfiguration';
import { progressLog } from './progressLog';
import { formatTable } from '../../../package-agnostic-utilities/table-formatter/formatTable';

const COMMON_ROOT = 'packages/mdd-engine/src' as const;

const isWriteEnabled = process.env.ENABLE_WRITE !== undefined;

const log: typeof console.log = (...args) => {
  // eslint-disable-next-line no-console
  console.log(...args);
};

type ConfigurationGroup = {
  directory: Directory;
  directoryChange: FileSystemNodeRenameConfiguration | null;
  fileNameChangeList: FileSystemNodeRenameConfiguration[];
  identifierChangeList: RenameConfiguration[];
};

/**
 * Groups directory, file, and symbol rename operations by directory, sorts
 * groups from most nested to least nested directory, and then applies one
 * operation.
 *
 * The program associated with this transform will have to run multiple times.
 */
export const applyRenaming = buildProgrammedTransform({
  name: 'applyRenaming',
})
  .fromCollection2<DirectoryStreamMetatype>({
    collectionId: DIRECTORY_COLLECTION_ID,
  })
  .andFromCollection2<FileSystemNodeRenameConfigurationStreamMetatype>({
    collectionId: FILE_SYSTEM_NODE_RENAME_CONFIGURATION_COLLECTION_ID,
  })
  .andFromCollection2<RenameConfigurationStreamMetatype>({
    collectionId: RENAME_CONFIGURATION_COLLECTION_ID,
  })
  .onTransform(
    (
      directoryCollection,
      fileSystemNodeConfigurationCollection,
      identifierConfigurationCollection,
    ) => {
      const mutableGroupList: ConfigurationGroup[] =
        directoryCollection.list.map((directory) => {
          const group: ConfigurationGroup = {
            directory,
            directoryChange: null,
            fileNameChangeList: [],
            identifierChangeList: [],
          };
          return group;
        });

      // note: sort from largest to smallest directories (most nested to least nested)
      mutableGroupList.sort((groupA, groupB) => {
        if (
          groupA.directory.directoryPath.serialized <
          groupB.directory.directoryPath.serialized
        ) {
          return 1;
        }

        // note: directory paths will never be the same

        return -1;
      });

      const mutableGroupByDirectoryPath = new Map(
        mutableGroupList.map((group) => {
          return [group.directory.directoryPath.serialized, group];
        }),
      );

      fileSystemNodeConfigurationCollection.list.forEach((configuration) => {
        const key = configuration.isDirectory
          ? configuration.oldNodePath.serialized
          : configuration.oldNodePath.parentDirectoryPath;

        const group = mutableGroupByDirectoryPath.get(key);
        assertNotUndefined(group);

        if (configuration.isDirectory) {
          group.directoryChange = configuration;
        } else {
          group.fileNameChangeList.push(configuration);
        }
      });

      identifierConfigurationCollection.list.forEach((configuration) => {
        const key =
          configuration.identifierLocator.filePath.parentDirectoryPath;

        const group = mutableGroupByDirectoryPath.get(key);
        assertNotUndefined(group);

        group.identifierChangeList.push(configuration);
      });

      const groupList = mutableGroupList.filter((group) => {
        const isFinished =
          group.directoryChange === null &&
          group.fileNameChangeList.length === 0 &&
          group.identifierChangeList.length === 0;

        return !isFinished;
      });

      const [group] = groupList;

      if (group === undefined) {
        // eslint-disable-next-line no-console
        console.log('ALL DONE!');
        return;
      }

      const countOperations = (groupToCount: ConfigurationGroup): number => {
        const count =
          (groupToCount.directoryChange !== null ? 1 : 0) +
          groupToCount.fileNameChangeList.length +
          groupToCount.identifierChangeList.length;

        return count;
      };

      const groupsRemaining = groupList.length;

      let totalOperations = 0;
      groupList.forEach((nextGroup) => {
        totalOperations += countOperations(nextGroup);
      });

      const currentGroupOperationsRemaining = countOperations(group);

      const table = formatTable([
        ['Name', 'Count'],
        ['Groups Remaining', `${groupsRemaining}`],
        ['Total operations remaining', `${totalOperations}`],
        [
          'Current group operations remaining',
          `${currentGroupOperationsRemaining}`,
        ],
      ]);
      log();
      log(table);

      const {
        directory,
        directoryChange,
        fileNameChangeList: [fileNameChange],
        identifierChangeList: [identifierChange],
      } = group;

      const activeDirectoryPath = directory.directoryPath.serialized.replace(
        `${COMMON_ROOT}/`,
        '',
      );
      if (progressLog.getActiveDirectoryPath() === null) {
        progressLog.setActiveDirectoryPath(activeDirectoryPath);
      } else if (progressLog.getActiveDirectoryPath() !== activeDirectoryPath) {
        log();
        log(
          chalk.yellow('Commit and clear the latest progress log to continue'),
        );
        log();

        return;
      }

      let oldName: string;
      let newName: string;
      let apply: () => SpawnSyncReturns<string>;
      if (fileNameChange !== undefined) {
        log();
        log(
          [
            chalk.blue(`Renaming file:`),
            `  Old: ${fileNameChange.oldNodePath.serialized}`,
            `  New: ${fileNameChange.relativeNewPath}`,
          ].join('\n'),
        );
        log();

        oldName = fileNameChange.oldNodePath.serialized;
        newName = fileNameChange.relativeNewPath;
        apply = (): SpawnSyncReturns<string> => {
          return applyFileSystemNodeChange(fileNameChange);
        };
      } else if (identifierChange !== undefined) {
        log();
        log(
          [
            chalk.blue(`Renaming symbol:`),
            `  File: ${identifierChange.identifierLocator.filePath.serialized}`,
            `  Line: ${identifierChange.oneBasedLineNumber}`,
            `  Col : ${identifierChange.oneBasedLineOffset}`,
            `  Old : ${identifierChange.originalName}`,
            `  New : ${identifierChange.newName}`,
          ].join('\n'),
        );
        log();

        oldName = `${identifierChange.identifierLocator.filePath.serialized}:${identifierChange.originalName}`;
        newName = `${identifierChange.identifierLocator.filePath.serialized}:${identifierChange.newName}`;
        apply = (): SpawnSyncReturns<string> => {
          return applySymbolRename(identifierChange);
        };
      } else if (directoryChange !== null) {
        log();
        log(
          [
            chalk.blue(`Renaming directory:`),
            `  Old: ${directoryChange.oldNodePath.serialized}`,
            `  New: ${directoryChange.relativeNewPath}`,
          ].join('\n'),
        );
        log();

        oldName = directoryChange.oldNodePath.serialized;
        newName = directoryChange.relativeNewPath;
        apply = (): SpawnSyncReturns<string> => {
          return applyFileSystemNodeChange(directoryChange);
        };
      } else {
        throw Error('Reached the unreachable');
      }

      if (!isWriteEnabled) {
        log();
        log(
          `ENABLE_WRITE env var is unset. ${chalk.yellow(
            'Aborting "applyRename"',
          )}`,
        );
        log();
        return;
      }

      progressLog.appendToCommitMessage([
        // keep multiline
        `- ${oldName}`,
        `+ ${newName}`,
        '',
        '',
      ]);

      const result = apply();
      const isSuccessful = result.status === 0;
      const applyColor = isSuccessful ? chalk.green : chalk.red;

      log();
      log(applyColor('Applied renaming!'));
      log();

      if (!isSuccessful) {
        const error = new Error(
          `Received status exit code "${result.status ?? 'null'}"`,
        );

        // TODO: make an error object that takes context
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        (error as any).context = {
          result,
        };

        throw error;
      }
    },
  )
  .assemble();
