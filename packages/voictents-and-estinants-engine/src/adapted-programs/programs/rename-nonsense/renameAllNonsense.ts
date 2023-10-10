/**
 * A script that runs rename-nonsense iteratively until there is nothing left to
 * refactor. It runs CI checks and commits modified files when everything in a
 * directory is refactored.
 *
 * @noCanonicalDeclaration
 */

import { spawnSync, SpawnSyncReturns } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';
import { progressLog } from './progressLog';
import { serialize } from '../../../package-agnostic-utilities/one-way-serializer/serialize';

const log: typeof console.log = (...args) => {
  // eslint-disable-next-line no-console
  console.log(...args);
};

type Command = [string, ...string[]];

type CommandRunnerInput = {
  title: string;
  command: Command;
  environmentVariables?: Record<string, string>;
  errorCode: number;
};

const runCommand = ({
  title,
  command,
  environmentVariables = {},
  errorCode,
}: CommandRunnerInput): SpawnSyncReturns<string> => {
  log(chalk.cyan(title));
  const result = spawnSync(command[0], command.slice(1), {
    encoding: 'utf-8',
    env: {
      ...process.env,
      FORCE_COLOR: '1',
      ...environmentVariables,
    },
  });

  if (result.stdout) {
    log('STDOUT');
    log(result.stdout);
  } else {
    log('NO-STDOUT');
  }

  if (result.stderr) {
    log();
    log('STDERR');
  }

  log();

  if (result.status !== 0) {
    const filePath =
      'packages/voictents-and-estinants-engine/src/adapted-programs/programs/rename-nonsense/errorLog.txt';
    log(chalk.cyan('Error'));
    log(`${chalk.red('Error log:')} ${filePath}`);
    log();
    fs.writeFileSync(filePath, serialize(result));
    process.exit(errorCode);
  }

  return result;
};

// eslint-disable-next-line no-constant-condition
while (true) {
  runCommand({
    title: 'Dry Run',
    command: [
      'npx',
      'ts-node',
      'packages/voictents-and-estinants-engine/src/adapted-programs/programs/rename-nonsense/renameNonsense.ts',
    ],
    errorCode: 1,
  });

  const progressLogBefore = progressLog.read();

  runCommand({
    title: 'Execute Write',
    command: [
      'npx',
      'ts-node',
      'packages/voictents-and-estinants-engine/src/adapted-programs/programs/rename-nonsense/renameNonsense.ts',
    ],
    errorCode: 2,
    environmentVariables: {
      ENABLE_WRITE: '',
    },
  });

  const progressLogAfter = progressLog.read();

  if (progressLogAfter !== progressLogBefore) {
    // eslint-disable-next-line no-continue
    continue;
  }

  runCommand({
    title: 'Stage All Changes',
    command: [
      // keep multiline
      'git',
      'add',
      '.',
    ],
    errorCode: 6,
  });

  const commitMessage = progressLog.read();

  if (commitMessage.includes('"')) {
    throw Error('Unhandled quote in message');
  }

  runCommand({
    title: 'Commit',
    command: ['git', 'commit', '-m', commitMessage],
    errorCode: 7,
  });

  runCommand({
    title: 'Typecheck',
    command: [
      'npx',
      'tsc',
      '--pretty',
      '-p',
      'packages/voictents-and-estinants-engine',
    ],
    errorCode: 3,
  });

  runCommand({
    title: 'Lint',
    command: [
      // keep multiline
      'npm',
      'run',
      'lint:ts:all',
    ],
    errorCode: 4,
  });

  runCommand({
    title: 'Run ci.sh',
    command: [
      // keep multiline
      'bash',
      'packages/voictents-and-estinants-engine/ci.sh',
    ],
    errorCode: 5,
  });

  progressLog.clear();
}
