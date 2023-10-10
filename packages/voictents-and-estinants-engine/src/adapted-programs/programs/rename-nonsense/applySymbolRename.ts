import { spawnSync, SpawnSyncReturns } from 'child_process';
import { RenameConfiguration } from './renameConfiguration';

/**
 * TypeScript function wrapper on the renameSymbol CLI script
 */
export const applySymbolRename = (
  change: RenameConfiguration,
): SpawnSyncReturns<string> => {
  const result = spawnSync(
    'npx',
    [
      'ts-node',
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/rename-symbol/renameSymbol.ts',
      change.absoluteFilePath,
      `${change.oneBasedLineNumber}`,
      `${change.oneBasedLineOffset}`,
      change.newName,
    ],
    {
      stdio: 'inherit',
      encoding: 'utf-8',
    },
  );

  return result;
};
