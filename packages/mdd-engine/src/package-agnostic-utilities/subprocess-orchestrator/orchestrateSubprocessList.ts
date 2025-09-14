import { spawn, ChildProcess } from 'child_process';
import { Readable } from 'stream';
import chalk from 'chalk';
import fs from 'fs';
import { posix } from 'path';
import { glob } from 'glob';
import { Merge } from 'type-fest';
import { SubprocessConfiguration } from './subprocessConfiguration';
import { ForegroundColor, colorList } from '../color/colorList';
import { assertNotUndefined } from '../nil/assertNotUndefined';
import { LineLabeler } from './transforms/lineLabeler';
import { TextSanitizer } from './transforms/textSanitizer';
import { TextTransform } from './transforms/textTransform';
import { Cell, Row, formatTable } from '../table-formatter/formatTable';
import { Valve } from './transforms/valve';
import { assertNotNull } from '../nil/assertNotNull';
import { getFileSystemNodePathPartList } from '../../adapted-programs/programmable-units/file/getFileSystemNodePathPartList';
import { MemoryUsageStream } from './memoryUsageStream';
import { MemoryUsageEmitter, MemoryUsageEventName } from './memoryUsageEmitter';
import { bytes } from '../byte/bytes';
import { Nanoseconds } from '../time/nanoseconds';
import { Seconds } from '../time/seconds';
import { getCurrentTimeInNanoseconds } from '../time/getCurrentTimeInNanoseconds';
import { convertNanosecondsToSeconds } from '../time/convertNanosecondsToSeconds';
import { isNotNull } from '../nil/isNotNull';

const memoryUsageEmitter = new MemoryUsageEmitter(bytes`10GB`);

memoryUsageEmitter.on(MemoryUsageEventName.LimitReached, (usage, limit) => {
  process.stdout.write(chalk.red(`MEMORY USAGE EXCEEDS LIMIT: ${limit}\n`));
  process.stdout.write(usage);
  process.exit(1);
});

memoryUsageEmitter.start();

// TODO: make this cast more robust
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8')) as {
  scripts: { program: string };
};

const EMPTY_WHITESPACE_REGEX = /^$/;
const SPACE_DELIMITED_INTEGERS_REGEX = /^(\d+\s*)+$/;
const FOCUS_ONE_REGEX = /^f\d+$/;
const FOCUS_ALL_REGEX = /^a$/;
const RETURN_REGEX = EMPTY_WHITESPACE_REGEX;

class ColorNode {
  private nextNode?: ColorNode;

  constructor(public color: ForegroundColor) {}

  setNextNode(nextNode: ColorNode): void {
    this.nextNode = nextNode;
  }

  getNextNode(): ColorNode {
    assertNotUndefined(this.nextNode);
    return this.nextNode;
  }
}

const colorNodeList = colorList.slice().map((color) => {
  return new ColorNode(color);
});

const [firstColorNode] = colorNodeList;
colorNodeList.forEach((colorNode, index) => {
  const nextNode = colorNodeList[index + 1];

  if (nextNode !== undefined) {
    colorNode.setNextNode(nextNode);
  } else {
    colorNode.setNextNode(firstColorNode);
  }
});

const useKnowledgeGraphDeveloper = process.env.DEV_KG !== undefined;

const runProgram = packageJson.scripts.program;

const typescriptConfigurationJsonFilePaths = glob.sync(
  'packages/mdd-engine/**/tsconfig.json',
);
const typeCheckSubprocessConfigurationList =
  typescriptConfigurationJsonFilePaths.map(
    (typeScriptConfigurationFilePath) => {
      const pathPartList = getFileSystemNodePathPartList(
        typeScriptConfigurationFilePath,
      );

      const parentDirectories = pathPartList.slice(-4, -1);

      return {
        label: `type-check | ${posix.join(...parentDirectories)}`,
        script: `nodemon --ext ts,tsx,json --ignore debug --ignore **/generated/** --exec tsc --pretty -p ${typeScriptConfigurationFilePath}`,
        isInitiallyVisible: true,
      };
    },
  );

const knowledgeGraphProgramLabel = useKnowledgeGraphDeveloper
  ? 'develop-knowledge-graph'
  : 'render-knowledge-graph';
const runKnowledgeGraph = useKnowledgeGraphDeveloper
  ? `${runProgram} packages/mdd-engine/src/adapted-programs/programs/develop-knowledge-graph/developKnowledgeGraph.ts`
  : `${runProgram} packages/mdd-engine/src/adapted-programs/programs/render-knowledge-graph/renderKnowledgeGraph.ts`;
const serveKnowledgeGraph = useKnowledgeGraphDeveloper
  ? 'npx http-server debug/develop-knowledge-graph/collections/output-file'
  : 'npx http-server debug/render-knowledge-graph/collections/output-file';

let colorListPointer = firstColorNode;
const subprocessConfigurationList: SubprocessConfiguration[] = (
  [
    {
      label: 'model-programs',
      script: `${runProgram} packages/mdd-engine/src/adapted-programs/programs/model-programs/modelPrograms.ts`,
      isInitiallyVisible: true,
    },
    {
      label: knowledgeGraphProgramLabel,
      script: runKnowledgeGraph,
      isInitiallyVisible: true,
    },
    {
      label: 'lint-nonsense',
      script: `${runProgram} packages/mdd-engine/src/adapted-programs/programs/lint-nonsense/lintNonsense.ts`,
      isInitiallyVisible: true,
    },
    {
      label: 'rename-nonsense',
      script: `${runProgram} packages/mdd-engine/src/adapted-programs/programs/rename-nonsense/renameNonsense.ts`,
      isInitiallyVisible: true,
    },
    {
      label: 'find-unused-exports',
      script: `nodemon --ext html,ts,tsx,sh --ignore debug --ignore **/generated/** packages/mdd-engine/src/adapted-programs/programs/find-unused-exports/findUnusedExports.ts`,
      isInitiallyVisible: true,
    },
    {
      label: 'model-ci',
      script: `${runProgram} packages/mdd-engine/src/adapted-programs/programs/model-ci/modelCi.ts`,
      isInitiallyVisible: true,
    },
    {
      label: 'lint-file-system-node-path-literals',
      script: `${runProgram} packages/mdd-engine/src/adapted-programs/programs/lint-file-system-node-path-literals/lintFileSystemNodePathLiterals.ts`,
      isInitiallyVisible: true,
    },
    ...typeCheckSubprocessConfigurationList,
    {
      label: 'lint',
      script: `nodemon --ext ts,tsx --ignore debug --ignore **/generated/** --exec npm run lint:ts:engine`,
      isInitiallyVisible: true,
    },
    {
      label: 'serve-knowledge-graph',
      script: serveKnowledgeGraph,
      isInitiallyVisible: false,
    },
    {
      label: 'server-program-models',
      script: `npx http-server -p 8081 debug/modelPrograms/collections/output-file`,
      isInitiallyVisible: false,
    },
    {
      label: 'memory-usage',
      stream: new MemoryUsageStream(memoryUsageEmitter),
      isInitiallyVisible: true,
    },
  ] satisfies Omit<SubprocessConfiguration, 'color'>[]
).map((partialConfiguration) => {
  const nextColorNode = colorListPointer;
  colorListPointer = colorListPointer.getNextNode();

  return {
    ...partialConfiguration,
    color: nextColorNode.color,
  } satisfies SubprocessConfiguration;
});

enum SubprocessStatus {
  Unknown = 'Unknown',
  Running = 'Running',
  Failed = 'Failed',
  Done = 'Done',
}

const getElapsedSeconds = (
  earlierTime: Nanoseconds,
  laterTime: Nanoseconds,
): Seconds => {
  const elapsedNanoseconds = new Nanoseconds(
    laterTime.value - earlierTime.value,
  );
  const elapsedSeconds = convertNanosecondsToSeconds(elapsedNanoseconds);
  return new Seconds(Math.round(elapsedSeconds.value));
};

class RuntimeTracker {
  private startTime: Nanoseconds | null = null;

  private dataPoints: Seconds[] = [];

  restart(): void {
    this.startTime = getCurrentTimeInNanoseconds();
  }

  stop(): void {
    assertNotNull(this.startTime);

    const endTime = getCurrentTimeInNanoseconds();
    const elapsedTime = getElapsedSeconds(this.startTime, endTime);

    this.startTime = null;
    this.dataPoints.push(elapsedTime);
  }

  getIsRunning(): this is Merge<RuntimeTracker, { startTime: bigint }> {
    return this.startTime !== null;
  }

  private get average(): number | null {
    if (this.dataPoints.length === 0) {
      return null;
    }

    let sum = 0;
    this.dataPoints.forEach((seconds) => {
      sum += seconds.value;
    });

    const result = Math.round(sum / this.dataPoints.length);
    return result;
  }

  get elapsedPercentage(): number | null {
    if (this.average === null || this.elapsedTimeSeconds === null) {
      return null;
    }

    const result = Math.round(
      (100 * this.elapsedTimeSeconds.value) / this.average,
    );

    return result;
  }

  get elapsedTimeSeconds(): Seconds | null {
    const now = getCurrentTimeInNanoseconds();
    const latestDataPoint = this.dataPoints.at(-1);

    let result: Seconds | null;
    if (this.getIsRunning()) {
      result = getElapsedSeconds(this.startTime, now);
    } else if (latestDataPoint !== undefined) {
      result = latestDataPoint;
    } else {
      result = null;
    }

    return result;
  }
}

type SubprocessStateInput = {
  configuration: SubprocessConfiguration;
  valve: Valve;
  processId: null | number;
};

class SubprocessState implements SubprocessStateInput {
  configuration: SubprocessConfiguration;

  valve: Valve;

  private $status = SubprocessStatus.Unknown;

  runtimeTracker = new RuntimeTracker();

  cachedVisibility: boolean;

  processId: null | number;

  constructor(input: SubprocessStateInput) {
    this.configuration = input.configuration;
    this.valve = input.valve;
    this.cachedVisibility = this.configuration.isInitiallyVisible;
    this.processId = input.processId;
  }

  get status(): SubprocessStatus {
    return this.$status;
  }

  set status(status: SubprocessStatus) {
    this.$status = status;
  }

  setCachedVisibility(isVisible: boolean): void {
    this.cachedVisibility = isVisible;
  }

  toggleVisibility(): void {
    this.setCachedVisibility(!this.cachedVisibility);
  }

  applyCachedVisibility(): void {
    this.valve.isVisible = this.cachedVisibility;
  }

  cacheVisibility(): void {
    this.cachedVisibility = this.valve.isVisible;
  }

  get isVisibleInCache(): boolean {
    return this.cachedVisibility;
  }
}

const maxLabelLength = Math.max(
  ...subprocessConfigurationList.map((configuration) => {
    return configuration.label.length;
  }),
);

const subprocessStateList: SubprocessState[] = subprocessConfigurationList.map(
  (configuration) => {
    const valve = new Valve();

    valve
      .pipe(
        new LineLabeler({
          label: configuration.label,
          color: configuration.color,
        }),
      )
      .pipe(new TextSanitizer())
      .pipe(process.stdout);

    let childProcess: ChildProcess | null;
    let readableList: [Readable, ...Readable[]];
    if (configuration.script !== undefined) {
      const [command, ...args] = configuration.script.split(' ');

      childProcess = spawn(command, args, {
        env: {
          ...process.env,
          FORCE_COLOR: '1',
        },
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
      });

      assertNotNull(childProcess.stdout);
      assertNotNull(childProcess.stderr);

      readableList = [childProcess.stdout, childProcess.stderr];
    } else {
      childProcess = null;
      readableList = [configuration.stream];
    }

    const state = new SubprocessState({
      configuration,
      valve,
      processId: childProcess?.pid ?? null,
    });

    childProcess?.on('message', (event) => {
      if (
        typeof event !== 'object' ||
        !('type' in event) ||
        typeof event.type !== 'string'
      ) {
        throw new Error('Unknown message');
      }

      if (event.type === 'start') {
        state.status = SubprocessStatus.Running;
        state.runtimeTracker.restart();
      } else if (event.type === 'exit') {
        if (!('data' in event) || event.data !== 'SIGUSR2') {
          state.runtimeTracker.stop();
        }

        state.status = SubprocessStatus.Done;
      } else if (event.type === 'crash') {
        state.status = SubprocessStatus.Failed;
        state.runtimeTracker.stop();
      }
    });

    readableList.forEach((readable) => {
      readable.pipe(valve);
    });

    return state;
  },
);

subprocessStateList
  .map((state) => state.processId)
  .filter(isNotNull)
  .forEach((processId) => {
    memoryUsageEmitter.watchSubprocess(processId);
  });

const subprocessStateByLabel = new Map(
  subprocessStateList.map((state) => {
    return [state.configuration.label, state];
  }),
);

// this clears away more than console.clear
const obliterateConsole = (): void => {
  process.stdout.write('\x1bc');
};

/**
 * A utility for running multiple subprocesses in parallel. It makes it easy to
 * run things like eslint, tsc, and various custom linting programs while
 * developing. It is particularly useful for catching errors that you
 * accidentally introduce in other files as a side effect of your changes. This
 * utility also has an interactive CLI t which subprocess output is displayed on
 * screenhat can be used to filter.
 */
const orchestrateSubprocessList = (): void => {
  obliterateConsole();

  subprocessConfigurationList.forEach((configuration) => {
    const subprocessState = subprocessStateByLabel.get(configuration.label);
    assertNotUndefined(subprocessState);

    const initialText = configuration.isInitiallyVisible
      ? 'Starting'
      : 'Starting in background';

    const offsetSpaces = ''.padStart(
      maxLabelLength - configuration.label.length,
      ' ',
    );

    subprocessState.valve.bypassBuffer(`${offsetSpaces}${initialText}\n`);
    subprocessState.valve.isVisible = configuration.isInitiallyVisible;
  });

  type NormalizedInput = {
    isBlank: boolean;
    text: string;
  };

  enum StdinState {
    Idle = 'Idle',
    Menu = 'Menu',
  }

  let currentStdInState: StdinState = StdinState.Idle;

  const onIdle = (): string | null => {
    subprocessStateList.forEach((state) => {
      state.applyCachedVisibility();
    });

    return null;
  };

  const onMenu = (previousStdInState: StdinState): void => {
    if (previousStdInState !== StdinState.Menu) {
      subprocessStateList.forEach((state) => {
        // eslint-disable-next-line no-param-reassign
        state.valve.isVisible = false;
      });
    }
  };

  let accumulatedInput = '';
  const renderMenu = (): void => {
    const table = formatTable([
      ['Index', 'Status', 'Time', 'Label', 'Is Visible'],
      ...subprocessStateList.map<Row>((state, index) => {
        const isVisibleColor: ForegroundColor | undefined =
          state.isVisibleInCache ? 'green' : undefined;

        const hasFinished = state.status !== SubprocessStatus.Running;

        let color: ForegroundColor;
        let timeText: string;
        if (state.status === SubprocessStatus.Unknown) {
          color = 'gray';
          timeText = ' -- ';
        } else if (
          state.runtimeTracker.elapsedPercentage !== null &&
          state.runtimeTracker.getIsRunning()
        ) {
          if (state.runtimeTracker.elapsedPercentage < 100) {
            color = 'white';
          } else if (state.runtimeTracker.elapsedPercentage === 100) {
            color = 'gray';
          } else if (state.runtimeTracker.elapsedPercentage <= 125) {
            color = 'yellow';
          } else {
            color = 'red';
          }
          timeText = `${state.runtimeTracker.elapsedPercentage}%`;
        } else {
          color = hasFinished ? 'gray' : 'white';
          assertNotNull(state.runtimeTracker.elapsedTimeSeconds);
          timeText = `${state.runtimeTracker.elapsedTimeSeconds.value}s`;
        }

        return [
          `${index}`.padStart(5, ' '),
          {
            text: state.status,
            color: ((): ForegroundColor => {
              switch (state.status) {
                case SubprocessStatus.Unknown: {
                  return 'cyan';
                }
                case SubprocessStatus.Running: {
                  return 'yellow';
                }
                case SubprocessStatus.Failed: {
                  return 'red';
                }
                case SubprocessStatus.Done: {
                  return 'green';
                }
              }
            })(),
          },
          {
            text: timeText.padStart(4, ' '),
            color,
          } satisfies Cell,
          {
            text: state.configuration.label,
            color: state.configuration.color,
          },
          {
            text: state.isVisibleInCache.toString(),
            color: isVisibleColor,
          },
        ] satisfies Row;
      }),
    ]);

    const returnRegexText = chalk.blue(RETURN_REGEX.toString());

    const spaceDelimitedIntegersRegexText = chalk.blue(
      SPACE_DELIMITED_INTEGERS_REGEX.toString(),
    );

    const focusOneRegexText = chalk.blue(FOCUS_ONE_REGEX);

    const focusAllRegexText = chalk.blue(FOCUS_ALL_REGEX);

    const outputText = [
      ...table.split('\n'),
      '',
      'Options',
      `    - enter text matching ${returnRegexText} to continue`,
      `    - enter text with indices matching ${spaceDelimitedIntegersRegexText} to toggle subprocess visibility`,
      `    - enter text with one index matching ${focusOneRegexText} to enable visibility for one subprocess`,
      `    - enter text matching ${focusAllRegexText} to enable visibility for all subprocesses`,
    ].join('\n');

    obliterateConsole();
    process.stdout.write(`${outputText}\n`);
    process.stdout.write(accumulatedInput);
  };

  const onMenuInput = (input: NormalizedInput): StdinState => {
    if (RETURN_REGEX.test(input.text)) {
      return StdinState.Idle;
    }

    if (SPACE_DELIMITED_INTEGERS_REGEX.test(input.text)) {
      const indexList = input.text
        .split(/\s+/)
        .map((text) => parseInt(text, 10))
        .filter((index) => index >= 0 && index < subprocessStateList.length);

      indexList.forEach((index) => {
        const state = subprocessStateList[index];
        assertNotUndefined(state);

        state.toggleVisibility();
      });
    } else if (FOCUS_ONE_REGEX.test(input.text)) {
      const numericText = input.text.slice(1);
      const selectedIndex = Number.parseInt(numericText, 10);

      subprocessStateList.forEach((state, index) => {
        state.setCachedVisibility(index === selectedIndex);
      });
    } else if (FOCUS_ALL_REGEX.test(input.text)) {
      subprocessStateList.forEach((state) => {
        state.setCachedVisibility(true);
      });
    }

    return StdinState.Menu;
  };

  setInterval(() => {
    if (currentStdInState === StdinState.Menu) {
      renderMenu();
    }
  }, 33);

  const onStdIn = (input: NormalizedInput): void => {
    const previousStdInState = currentStdInState;
    let nextStdInState: StdinState;

    switch (previousStdInState) {
      case StdinState.Idle: {
        nextStdInState = StdinState.Menu;
        break;
      }
      case StdinState.Menu: {
        nextStdInState = onMenuInput(input);
        break;
      }
    }

    obliterateConsole();

    let outputText: string | null;
    switch (nextStdInState) {
      case StdinState.Idle: {
        outputText = onIdle();
        break;
      }
      case StdinState.Menu: {
        onMenu(currentStdInState);
        outputText = null;
        break;
      }
    }

    if (outputText !== null) {
      // eslint-disable-next-line no-console
      console.log(outputText);
    }

    currentStdInState = nextStdInState;
  };

  process.stdin.setRawMode(true);

  process.stdin.pipe(
    new TextTransform({
      onTransform: (nextText): string => {
        if (nextText.includes('\u0003')) {
          process.exit(0);
        }

        const [textBeforeReturn, textAfterReturn] = nextText.split('\r');
        const hasReturn = textAfterReturn !== undefined;

        if (hasReturn) {
          accumulatedInput += textBeforeReturn;

          const normalizedText = accumulatedInput.trim();
          const normalizedInput: NormalizedInput = {
            isBlank: EMPTY_WHITESPACE_REGEX.test(normalizedText),
            text: normalizedText,
          };

          onStdIn(normalizedInput);

          accumulatedInput = '';
        } else {
          accumulatedInput += nextText;
          accumulatedInput = accumulatedInput.replaceAll(/.[\u007F]/g, '');
        }

        return nextText;
      },
    }),
  );
};

orchestrateSubprocessList();
