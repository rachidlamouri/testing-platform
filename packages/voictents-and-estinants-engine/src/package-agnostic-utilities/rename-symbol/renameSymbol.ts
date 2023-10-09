/**
 * CLI tool for renaming all instances of an identifier across a TypeScript
 * project
 *
 * @canonicalComment
 *
 * @noCanonicalDeclaration
 */

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

const [absoluteFilePath, oneBasedLineNumberText, offsetText, newSymbol] =
  process.argv.slice(2);

const oneBasedLineNumber = Number.parseInt(oneBasedLineNumberText, 10);
const oneBasedColumnOffset = Number.parseInt(offsetText, 10);

if (
  absoluteFilePath === undefined ||
  Number.isNaN(oneBasedLineNumber) ||
  Number.isNaN(oneBasedColumnOffset) ||
  newSymbol === undefined
) {
  throw Error('One or more parameters is missing');
}

log({
  absoluteFilePath,
  oneBasedLineNumber,
  oneBasedColumnOffset,
  newSymbol,
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
      file: absoluteFilePath,
    },
  });

  childProcess.stdin.write(openProjectMessage);
};

const getSymbolReferenceList = (): void => {
  const renameMessage = buildMessage({
    command: 'rename',
    arguments: {
      file: absoluteFilePath,
      line: oneBasedLineNumber,
      offset: oneBasedColumnOffset,
    },
  });

  childProcess.stdin.write(renameMessage);
};

type Position = {
  line: number;
  offset: number;
};

type ReplacementMetadata = {
  filePath: string;
  zeroBasedLineNumber: number;
  zeroBasedStartOffset: number;
  replaceLength: number;
};

const replaceAll = (list: ReplacementMetadata[]): void => {
  log(`Replaceing ${list.length} locations`);

  const reverseList = list.slice().reverse();

  reverseList.forEach(
    ({
      filePath,
      zeroBasedLineNumber,
      zeroBasedStartOffset,
      replaceLength,
    }) => {
      log({
        filePath,
        zeroBasedLineNumber,
        zeroBasedStartOffset,
      });
      log();

      const fileText = fs.readFileSync(filePath, 'utf-8');
      const fileLineList = fileText.split('\n');
      const line = fileLineList[zeroBasedLineNumber];
      const lineCharacterList = line.split('');

      lineCharacterList.splice(zeroBasedStartOffset, replaceLength, newSymbol);

      const newLine = lineCharacterList.join('');
      fileLineList[zeroBasedLineNumber] = newLine;
      const newText = fileLineList.join('\n');

      fs.writeFileSync(filePath, newText);
    },
  );
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
        getSymbolReferenceList();
        return;
      }

      if (datum.type === 'response' && datum.command === 'rename') {
        log('Received rename response');
        log(datum);
        log();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { body } = datum as {
          body: {
            locs: {
              file: string;
              locs: {
                start: Position;
                end: Position;
              }[];
            }[];
          };
        };

        const filePositionList: ReplacementMetadata[] = body.locs.flatMap(
          (fileLocation) => {
            return fileLocation.locs.map((position) => {
              if (position.start.line !== position.end.line) {
                throw Error('Unhandled mismatched start and end line');
              }

              return {
                filePath: fileLocation.file,
                zeroBasedLineNumber: position.start.line - 1,
                zeroBasedStartOffset: position.start.offset - 1,
                replaceLength: position.end.offset - position.start.offset,
              } satisfies ReplacementMetadata;
            });
          },
        );

        replaceAll(filePositionList);

        log('Done!');
        process.exit(0);
      }

      log('Reached the unreachable');
      log();
      process.exit(2);
    },
  }),
);

loadProject();
