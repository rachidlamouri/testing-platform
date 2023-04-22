import fs from 'fs';
import { posix } from 'path';
import * as uuid from 'uuid';
import { QuirmDebugger } from '../../type-script-adapter/digikikify';
import { serialize } from '../../utilities/typed-datum/serializer/serialize';
import { isOdeshin } from '../adapter/odeshin';
import { Voictent } from '../adapter/voictent';
import {
  OutputFileVoictent,
  OUTPUT_FILE_GEPP,
} from '../programmable-units/output-file/outputFile';
import { LanbeTypeName } from '../../core/engine-shell/voictent/lanbe';

// TODO: move to a utility or something
export const escapePathSeparator = (text: string): string =>
  text.replaceAll(/\//g, ' | ');

export const buildQuirmDebugger = (
  programName: string,
  debugDirectoryPath: 'debug' | 'snapshot' = 'debug',
): QuirmDebugger<OutputFileVoictent> => {
  const createDirectory = (directoryPath: string): void => {
    if (!fs.existsSync(directoryPath)) {
      // eslint-disable-next-line no-console
      console.log(`NEW: ${directoryPath}`);
    }

    fs.mkdirSync(directoryPath, { recursive: true });
  };

  const SNAPSHOT_DIRECTORY_PATH = 'snapshot';

  createDirectory(debugDirectoryPath);
  createDirectory(SNAPSHOT_DIRECTORY_PATH);

  const programDebugDirectoryPath = posix.join(debugDirectoryPath, programName);
  fs.rmSync(programDebugDirectoryPath, { recursive: true, force: true });
  createDirectory(programDebugDirectoryPath);

  const programSnapshotDirectoryPath = posix.join(
    SNAPSHOT_DIRECTORY_PATH,
    programName,
  );
  fs.rmSync(programSnapshotDirectoryPath, { recursive: true, force: true });
  createDirectory(programSnapshotDirectoryPath);

  // TODO: convert this to an object parameter
  const writeHubblepupFile = (
    gepp: string,
    fileName: string,
    fileExtensionSuffix: string,
    text: string,
  ): void => {
    const filePath = posix.join(
      programDebugDirectoryPath,
      gepp,
      `${fileName}.${fileExtensionSuffix}`,
    );

    const directoryPath = posix.dirname(filePath);
    if (!fs.existsSync(directoryPath)) {
      // eslint-disable-next-line no-console
      console.log(`NEW: ${directoryPath}`);
    }

    fs.mkdirSync(directoryPath, { recursive: true });
    fs.writeFileSync(filePath, text);
  };

  const quirmDebugger: QuirmDebugger<OutputFileVoictent> = {
    handlerByGepp: {
      [OUTPUT_FILE_GEPP]: ({ gepp, hubblepup }) => {
        const { fileName, fileExtensionSuffix, text } = hubblepup;
        writeHubblepupFile(gepp, fileName, fileExtensionSuffix, text);
      },
    },
    defaultHandler: ({ gepp, hubblepup }) => {
      const fileName = isOdeshin(hubblepup)
        ? escapePathSeparator(hubblepup.zorn)
        : uuid.v4();

      writeHubblepupFile(gepp, fileName, 'yml', serialize(hubblepup));
    },
    onFinish: (statistics) => {
      const filePath = posix.join(
        programSnapshotDirectoryPath,
        `${programName}-runtime-profile.txt`,
      );

      const TRIGGER_CHARACTER = 'X';
      const IDLE_CHARACTER = '-';

      const lineList: string[] = [];

      lineList.push('Collections:');
      lineList.push('');

      statistics.voictentList
        .map((configuration) => {
          let voictentIndex = configuration.voictentTickSeries.findIndex(
            (value) => value === 1,
          );
          voictentIndex = voictentIndex === -1 ? Infinity : voictentIndex;

          let voictentItemIndex =
            configuration.voictentItemTickSeries.findIndex(
              (value) => value === 1,
            );
          voictentItemIndex =
            voictentItemIndex === -1 ? Infinity : voictentItemIndex;

          const sortValue = Math.min(voictentIndex, voictentItemIndex);

          return {
            configuration,
            sortValue,
          };
        })
        .sort((a, b) => a.sortValue - b.sortValue)
        .forEach(({ configuration: c }) => {
          const serializedVoictentItemSeries = c.voictentItemTickSeries.map(
            (value) => (value === 1 ? TRIGGER_CHARACTER : IDLE_CHARACTER),
          );
          const serializedVoictentSeries = c.voictentTickSeries.map((value) =>
            value === 1 ? TRIGGER_CHARACTER : IDLE_CHARACTER,
          );

          lineList.push(`    ${c.gepp}`);
          lineList.push(`      I: |${serializedVoictentItemSeries.join('')}|`);
          lineList.push(`      C: |${serializedVoictentSeries.join('')}|`);
          lineList.push('');
        });

      lineList.push('Transforms:');
      lineList.push('');

      statistics.estinantList
        .map((configuration, index) => {
          let sortValue =
            configuration.relativeExecutionCountTickSeries.findIndex(
              (value) => value > 0,
            );
          sortValue = sortValue === -1 ? Infinity : sortValue;

          return {
            configuration,
            sortValue,
            index,
          };
        })
        .sort((a, b) => a.sortValue - b.sortValue)
        .forEach(({ configuration, index }) => {
          const name = configuration.platomity.estinant.name ?? `${index}`;

          lineList.push(`  ${name}`);

          configuration.connectionList.forEach((connection) => {
            const connectionType =
              connection.lanbe.typeName === LanbeTypeName.VoictentLanbe
                ? 'C'
                : 'I';
            const serializedSeries = connection.tickSeries.map((value) =>
              value === 1 ? TRIGGER_CHARACTER : IDLE_CHARACTER,
            );

            lineList.push(`    ${connection.gepp}`);
            lineList.push(
              `      ${connectionType}: |${serializedSeries.join('')}|`,
            );
          });

          const executionCountList =
            configuration.relativeExecutionCountTickSeries.map((value) => {
              if (value === 0) {
                return IDLE_CHARACTER;
              }

              if (value < 10) {
                return value;
              }

              return 'n';
            });

          lineList.push(
            `         |${executionCountList.map(() => '_').join('')}|`,
          );
          lineList.push(`      E: |${executionCountList.join('')}|`);

          lineList.push('');
        });

      const text = lineList.join('\n');

      fs.writeFileSync(filePath, text);

      // eslint-disable-next-line no-console
      console.log('\nRUNTIME PROFILE:', filePath);
    },
  };

  return quirmDebugger;
};

export const buildBasicQuirmDebugger = (
  programName: string,
  debugDirectoryPath?: 'debug' | 'snapshot',
): QuirmDebugger<Voictent> => {
  const quirmDebugger = buildQuirmDebugger(programName, debugDirectoryPath);

  return {
    ...quirmDebugger,
    handlerByGepp: {},
  };
};

export const buildDefaultHandler = (
  programName: string,
): QuirmDebugger<Voictent>['defaultHandler'] =>
  buildBasicQuirmDebugger(programName).defaultHandler;
