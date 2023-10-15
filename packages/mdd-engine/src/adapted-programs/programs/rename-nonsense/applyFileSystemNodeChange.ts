import { spawnSync, SpawnSyncReturns } from 'child_process';
import { FileSystemNodeRenameConfiguration } from './fileSystemNodeRenameConfiguration';

/**
 * TypeScript function wrapper on the renameFileSystemNode CLI script
 */
export const applyFileSystemNodeChange = (
  change: FileSystemNodeRenameConfiguration,
): SpawnSyncReturns<string> => {
  const childProcess = spawnSync(
    'npx',
    [
      'ts-node',
      'packages/mdd-engine/src/package-agnostic-utilities/file/renameFileSystemNode.ts',
      change.oldAbsolutePath,
      change.newAbsolutePath,
    ],
    {
      stdio: 'inherit',
      encoding: 'utf-8',
    },
  );

  return childProcess;
};
