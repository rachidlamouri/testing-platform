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
  continueOnError?: boolean;
  skipLog?: false;
};

const runCommand = ({
  title,
  command,
  environmentVariables = {},
  errorCode,
  continueOnError = false,
  skipLog = false,
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

  if (!skipLog && result.stdout) {
    log('STDOUT');
    log(result.stdout);
  } else {
    log('NO-STDOUT');
  }

  if (!skipLog && result.stderr) {
    log();
    log('STDERR');
  }

  if (!skipLog) {
    log();
  }

  if (result.status !== 0 && !continueOnError) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    oops();

    const filePath =
      'packages/mdd-engine/src/adapted-programs/programs/rename-nonsense/errorLog.txt';
    log(chalk.cyan('Error'));
    log(`${chalk.red('Error log:')} ${filePath}`);
    log();
    fs.writeFileSync(filePath, serialize(result));

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    process.exit(errorCode);
  }

  return result;
};

const beep = (): void => {
  runCommand({
    title: 'Beep',
    command: [
      // keep multiline
      'printf',
      '\\a',
    ],
    errorCode: 152,
    continueOnError: true,
  });
};

const delay = (milliseconds: number): void => {
  runCommand({
    title: 'Delay',
    command: [
      // keep multiline
      'node',
      '-e',
      `setTimeout(() => {}, ${milliseconds})`,
    ],
    errorCode: 122,
    continueOnError: true,
  });
};

const oops = (): void => {
  beep();
  delay(500);
  beep();
  delay(500);
  beep();
  delay(500);
  beep();
  delay(500);
  beep();
  delay(500);
  beep();
  delay(500);
  beep();
  delay(500);
  beep();
  delay(500);
  beep();
  delay(500);
  beep();
};

const stageAllChanges = (): void => {
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
};

// eslint-disable-next-line no-constant-condition
while (true) {
  // runCommand({
  //   title: 'Dry Run',
  //   command: [
  //     'npx',
  //     'ts-node',
  //     'packages/mdd-engine/src/adapted-programs/programs/rename-nonsense/renameNonsense.ts',
  //   ],
  //   errorCode: 1,
  // });

  runCommand({
    title: 'Typecheck',
    command: [
      // keep multiline
      'npx',
      'tsc',
      '--pretty',
      '-p',
      'packages/mdd-engine',
    ],
    errorCode: 39,
  });

  const progressLogBefore = progressLog.read();

  runCommand({
    title: 'Execute Write',
    command: [
      'npx',
      'ts-node',
      'packages/mdd-engine/src/adapted-programs/programs/rename-nonsense/renameNonsense.ts',
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

  stageAllChanges();

  const commitMessage = progressLog.read();

  if (commitMessage.includes('"')) {
    throw Error('Unhandled quote in message');
  }

  runCommand({
    title: 'Commit',
    command: ['git', 'commit', '-m', commitMessage],
    errorCode: 7,
    continueOnError: true,
  });

  runCommand({
    title: 'Typecheck',
    command: ['npx', 'tsc', '--pretty', '-p', 'packages/mdd-engine'],
    errorCode: 3,
  });

  runCommand({
    title: 'Lint',
    command: [
      // keep multiline
      'npx',
      'eslint',
      '--fix',
      '--color',
      '--max-warnings',
      '0',
      '--ext',
      'ts,tsx,js',
      '.',
    ],
    errorCode: 4,
  });

  stageAllChanges();

  runCommand({
    title: 'Ammend Commit',
    command: ['git', 'commit', '--amend', '--no-edit'],
    errorCode: 23,
    continueOnError: true,
  });

  runCommand({
    title: 'Run ci.sh',
    command: [
      // keep multiline
      'bash',
      'packages/mdd-engine/ci.sh',
    ],
    errorCode: 5,
  });

  progressLog.clear();
}
