import { spawn } from 'child_process';
import fs from 'fs';
import { TextTransform } from '../subprocess-orchestrator/transforms/textTransform';
import { JsonObject, JsonList, jsonUtils, Json } from '../json/json';
import {
  CustomDatumTypeName,
  getCustomTypedDatum,
} from '../typed-datum/customTypedDatum';

const isDebugEnabled = process.env.DEBUG_RENAME !== undefined;

const log: typeof console.log = (...args) => {
  if (isDebugEnabled) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

const [oldFileSystemNodePath, newFileSystemNodePath] = process.argv.slice(2);

if (
  oldFileSystemNodePath === undefined ||
  newFileSystemNodePath === undefined
) {
  throw Error('One or more parameters is missing');
}

log({
  oldFileSystemNodePath,
  newFileSystemNodePath,
});

type IncomingMessageHandlerInput = {
  onMessage: (data: unknown) => void;
};

class IncomingMessageHandler extends TextTransform {
  buffer: string[] = [];

  private readRpcMessage(message: string): Json {
    const partList = message.split('\r\n');
    const jsonPart = partList[partList.length - 1];
    const data = jsonUtils.parse(jsonPart);

    return data;
  }

  constructor({ onMessage }: IncomingMessageHandlerInput) {
    super({
      onTransform: (text): string => {
        this.buffer.push(text);

        const fullMessage = this.buffer.join('');

        try {
          const data = this.readRpcMessage(fullMessage);
          onMessage(data);
          this.buffer = [];
        } catch {
          // no op
        }

        return text;
      },
    });
  }
}

type MessageInput = {
  command: string;
  arguments: JsonObject | JsonList;
};

const buildMessage = (input: MessageInput): string => {
  const request = {
    seq: 0,
    type: 'request',
    command: input.command,
    arguments: input.arguments,
  };

  const serializedRequest = JSON.stringify(request);

  const message = `${serializedRequest}\r\n`;

  return message;
};

const childProcess = spawn('npx', ['tsserver']);

const loadProject = (): void => {
  const openProjectMessage = buildMessage({
    command: 'open',
    arguments: {
      file: oldFileSystemNodePath,
    },
  });

  childProcess.stdin.write(openProjectMessage);
};

const getFileSystemNodePathEdits = (): void => {
  const renameMessage = buildMessage({
    command: 'getEditsForFileRename',
    arguments: {
      oldFilePath: oldFileSystemNodePath,
      newFilePath: newFileSystemNodePath,
    },
  });

  childProcess.stdin.write(renameMessage);
};

type Position = {
  line: number;
  offset: number;
};

type ChangeMetadata = {
  zeroBasedLineNumber: number;
  zeroBasedStartingColumnNumber: number;
  zeroBasedEndingColumnNumber: number;
  newText: string;
};

type ReplacementMetadata = {
  filePath: string;
  changeList: ChangeMetadata[];
};

/**
 * Renames a file or directory, and makes sure that all TypeScript code
 * references to it are refactored as well (which means it doesn't work for
 * string literals outside of an import declaration).
 */
const renameFileSystemNode = (list: ReplacementMetadata[]): void => {
  log(`Replaceing ${list.length} locations`);

  list.forEach(({ filePath, changeList }) => {
    const fileText = fs.readFileSync(filePath, 'utf-8');
    const fileLineList = fileText.split('\n');

    changeList.forEach(
      ({
        zeroBasedLineNumber,
        zeroBasedStartingColumnNumber,
        zeroBasedEndingColumnNumber,
        newText,
      }) => {
        const line = fileLineList[zeroBasedLineNumber];
        const lineCharacterList = line.split('');
        const totalReplaceLength =
          zeroBasedEndingColumnNumber - zeroBasedStartingColumnNumber;

        lineCharacterList.splice(
          zeroBasedStartingColumnNumber,
          totalReplaceLength,
          newText,
        );

        const newLine = lineCharacterList.join('');
        fileLineList[zeroBasedLineNumber] = newLine;
      },
    );

    const newFileText = fileLineList.join('\n');
    fs.writeFileSync(filePath, newFileText);
  });

  fs.renameSync(oldFileSystemNodePath, newFileSystemNodePath);
};

childProcess.stdout.pipe(
  new IncomingMessageHandler({
    onMessage: (inputDatum): void => {
      const typedDatum = getCustomTypedDatum(inputDatum);

      if (typedDatum.typeName !== CustomDatumTypeName.RootObjectInstance) {
        throw Error('data must be an object');
      }

      const { datum } = typedDatum;

      log('Handling response');
      log(datum);
      log();

      if ('success' in datum && !datum.success) {
        process.exit(1);
      }

      if (datum.type === 'event' && datum.event === 'projectLoadingFinish') {
        log('Project finished loading');
        log();
        getFileSystemNodePathEdits();
        return;
      }

      if (
        datum.type === 'response' &&
        datum.command === 'getEditsForFileRename'
      ) {
        log('Received edits for file rename response');
        log();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { body } = datum as {
          body: {
            fileName: string;
            textChanges: {
              start: Position;
              end: Position;
              newText: string;
            }[];
          }[];
        };

        const replacementList: ReplacementMetadata[] = body.map(
          ({ fileName, textChanges }) => {
            textChanges.forEach((textChange) => {
              if (textChange.start.line !== textChange.end.line) {
                throw Error('Unhandled mismatched start and end line');
              }
            });

            // note: applying changes in reverse order guarantees that initial changes do not shift later changes
            const reverseChangeList = textChanges.slice().reverse();

            return {
              filePath: fileName,
              changeList: reverseChangeList.map((textChange) => {
                return {
                  zeroBasedLineNumber: textChange.start.line - 1,
                  zeroBasedStartingColumnNumber: textChange.start.offset - 1,
                  zeroBasedEndingColumnNumber: textChange.end.offset - 1,
                  newText: textChange.newText,
                };
              }),
            };
          },
        );

        renameFileSystemNode(replacementList);

        log('Done!');
        process.exit(0);
      }
    },
  }),
);

loadProject();
