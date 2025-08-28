import { spawn, ChildProcess } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';
import { SubprocessConfiguration } from './subprocessConfiguration';
import { ForegroundColor, colorList } from '../color/colorList';
import { assertNotUndefined } from '../nil/assertNotUndefined';
import { LineLabeler } from './transforms/lineLabeler';
import { TextSanitizer } from './transforms/textSanitizer';
import { TextTransform } from './transforms/textTransform';
import { formatTable } from '../table-formatter/formatTable';
import { Valve } from './transforms/valve';
import { assertNotNull } from '../nil/assertNotNull';

// TODO: make this cast more robust
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8')) as {
  scripts: { program: string };
};

const EMPTY_WHITESPACE_REGEX = /^$/;
const SPACE_DELIMITED_INTEGERS_REGEX = /^(\d+\s*)+$/;
const FOCUS_ONE_REGEX = /^f\d+$/;
const FOCUS_ALL_REGEX = /^a$/;
const RETURN_REGEX = /^x$/;

const mutableColorList = colorList.slice();

const useKnowledgeGraphDeveloper = process.env.DEV_KG !== undefined;

const runProgram = packageJson.scripts.program;

const knowledgeGraphProgramLabel = useKnowledgeGraphDeveloper
  ? 'develop-knowledge-graph'
  : 'render-knowledge-graph';
const runKnowledgeGraph = useKnowledgeGraphDeveloper
  ? `${runProgram} packages/mdd-engine/src/adapted-programs/programs/develop-knowledge-graph/developKnowledgeGraph.ts`
  : `${runProgram} packages/mdd-engine/src/adapted-programs/programs/render-knowledge-graph/renderKnowledgeGraph.ts`;
const serveKnowledgeGraph = useKnowledgeGraphDeveloper
  ? 'npx http-server debug/develop-knowledge-graph/collections/output-file'
  : 'npx http-server debug/render-knowledge-graph/collections/output-file';

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
    {
      label: 'typecheck',
      script:
        'nodemon --ext ts,tsx --ignore debug --ignore **/generated/** --exec tsc --pretty -p packages/mdd-engine',
      isInitiallyVisible: true,
    },
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
  ] satisfies Omit<SubprocessConfiguration, 'color'>[]
).map((partialConfiguration) => {
  const color = mutableColorList.pop();
  assertNotUndefined(color);

  return {
    ...partialConfiguration,
    color,
  };
});

enum SubprocessStatus {
  Unknown = 'Unknown',
  Running = 'Running',
  Failed = 'Failed',
  Done = 'Done',
}

type SubprocessState = {
  configuration: SubprocessConfiguration;
  childProcess: ChildProcess;
  valve: Valve;
  status: {
    value: SubprocessStatus;
  };
};

const maxLabelLength = Math.max(
  ...subprocessConfigurationList.map((configuration) => {
    return configuration.label.length;
  }),
);

const subprocessStateList: SubprocessState[] = subprocessConfigurationList.map(
  (configuration) => {
    const [command, ...args] = configuration.script.split(' ');

    const childProcess = spawn(command, args, {
      env: {
        ...process.env,
        FORCE_COLOR: '1',
      },
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    });

    const valve = new Valve();

    assertNotNull(childProcess.stdout);
    assertNotNull(childProcess.stderr);

    childProcess.stdout.pipe(valve);
    childProcess.stderr.pipe(valve);

    valve
      .pipe(
        new LineLabeler({
          label: configuration.label,
          color: configuration.color,
        }),
      )
      .pipe(new TextSanitizer())
      .pipe(process.stdout);

    const mutableStatus = {
      value: SubprocessStatus.Unknown,
    };

    childProcess.on('message', (event) => {
      if (
        typeof event !== 'object' ||
        !('type' in event) ||
        typeof event.type !== 'string'
      ) {
        throw new Error('Unknown message');
      }

      if (event.type === 'start') {
        mutableStatus.value = SubprocessStatus.Running;
      } else if (event.type === 'exit') {
        mutableStatus.value = SubprocessStatus.Done;
      } else if (event.type === 'crash') {
        mutableStatus.value = SubprocessStatus.Failed;
      }
    });

    return {
      configuration,
      childProcess,
      valve,
      status: mutableStatus,
    };
  },
);

const subprocessStateByLabel = new Map(
  subprocessStateList.map((state) => {
    return [state.configuration.label, state];
  }),
);

function assertEndsInNewLine(text: string): void {
  if (!/\n$/.test(text)) {
    throw Error(`Expected text "${text}" to end in new line`);
  }
}

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

  type CachedSubprocessState = {
    label: string;
    isVisible: boolean;
    color: ForegroundColor;
    status: { value: SubprocessStatus };
  };

  let cachedSubprocessStateList: CachedSubprocessState[] = [];

  const onIdle = (): string | null => {
    cachedSubprocessStateList.forEach((cachedState) => {
      const subprocessState = subprocessStateByLabel.get(cachedState.label);
      assertNotUndefined(subprocessState);

      subprocessState.valve.isVisible = cachedState.isVisible;
    });

    return null;
  };

  const onMenu = (previousStdInState: StdinState): string => {
    if (previousStdInState !== StdinState.Menu) {
      cachedSubprocessStateList = subprocessStateList.map((state) => {
        return {
          label: state.configuration.label,
          isVisible: state.valve.isVisible,
          color: state.configuration.color,
          status: state.status,
        };
      });

      subprocessStateList.forEach((state) => {
        // eslint-disable-next-line no-param-reassign
        state.valve.isVisible = false;
      });
    }

    const table = formatTable([
      ['Index', 'Status', 'Label', 'Is Visible'],
      ...cachedSubprocessStateList.map((cachedState, index) => {
        const isVisibleColor: ForegroundColor | undefined =
          cachedState.isVisible ? 'green' : undefined;

        return [
          `${index}`,
          {
            text: cachedState.status.value,
            color: ((): ForegroundColor => {
              switch (cachedState.status.value) {
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
            text: cachedState.label,
            color: cachedState.color,
          },
          {
            text: cachedState.isVisible.toString(),
            color: isVisibleColor,
          },
        ];
      }),
    ]);

    const returnRegexText = chalk.blue(RETURN_REGEX.toString());

    const emptyWhitespaceRegexText = chalk.blue(
      EMPTY_WHITESPACE_REGEX.toString(),
    );

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
      `    - enter text matching ${emptyWhitespaceRegexText} to refresh`,
      `    - enter text with indices matching ${spaceDelimitedIntegersRegexText} to toggle subprocess visibility`,
      `    - enter text with one index matching ${focusOneRegexText} to enable visibility for one subprocess`,
      `    - enter text matching ${focusAllRegexText} to enable visibility for all subprocesses`,
    ].join('\n');

    return outputText;
  };

  const onMenuInput = (input: NormalizedInput): StdinState => {
    if (input.isBlank) {
      return StdinState.Menu;
    }

    if (RETURN_REGEX.test(input.text)) {
      return StdinState.Idle;
    }

    if (SPACE_DELIMITED_INTEGERS_REGEX.test(input.text)) {
      const indexList = input.text
        .split(/\s+/)
        .map((text) => parseInt(text, 10))
        .filter(
          (index) => index >= 0 && index < cachedSubprocessStateList.length,
        );

      indexList.forEach((index) => {
        const cachedSubprocessState = cachedSubprocessStateList[index];
        assertNotUndefined(cachedSubprocessState);

        cachedSubprocessState.isVisible = !cachedSubprocessState.isVisible;
      });
    } else if (FOCUS_ONE_REGEX.test(input.text)) {
      const numericText = input.text.slice(1);
      const selectedIndex = Number.parseInt(numericText, 10);

      cachedSubprocessStateList.forEach((cachedSubprocessState, index) => {
        // eslint-disable-next-line no-param-reassign
        cachedSubprocessState.isVisible = index === selectedIndex;
      });
    } else if (FOCUS_ALL_REGEX.test(input.text)) {
      cachedSubprocessStateList.forEach((cachedSubprocessState) => {
        // eslint-disable-next-line no-param-reassign
        cachedSubprocessState.isVisible = true;
      });
    }

    return StdinState.Menu;
  };

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
        outputText = onMenu(currentStdInState);
        break;
      }
    }

    if (outputText !== null) {
      // eslint-disable-next-line no-console
      console.log(outputText);
    }

    currentStdInState = nextStdInState;
  };

  process.stdin.pipe(
    new TextTransform({
      onTransform: (text): string => {
        assertEndsInNewLine(text);

        const input = text.slice(0, text.length - 1).toLowerCase();

        const normalizedText = input.trim();

        const normalizedInput: NormalizedInput = {
          isBlank: EMPTY_WHITESPACE_REGEX.test(normalizedText),
          text: normalizedText,
        };

        onStdIn(normalizedInput);

        return text;
      },
    }),
  );
};

orchestrateSubprocessList();
