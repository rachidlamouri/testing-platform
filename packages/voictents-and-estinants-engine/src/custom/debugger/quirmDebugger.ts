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

// TODO: move to a utility or something
export const escapePathSeparator = (text: string): string =>
  text.replaceAll(/\//g, ' | ');

export const buildQuirmDebugger = (
  programName: string,
): QuirmDebugger<OutputFileVoictent> => {
  const createDirectory = (directoryPath: string): void => {
    if (!fs.existsSync(directoryPath)) {
      // eslint-disable-next-line no-console
      console.log(`NEW: ${directoryPath}`);
    }

    fs.mkdirSync(directoryPath, { recursive: true });
  };

  const DEBUG_DIRECTORY_PATH = 'debug';
  createDirectory(DEBUG_DIRECTORY_PATH);

  const programDirectoryPath = posix.join(DEBUG_DIRECTORY_PATH, programName);
  fs.rmSync(programDirectoryPath, { recursive: true, force: true });
  createDirectory(programDirectoryPath);

  // TODO: convert this to an object parameter
  const writeHubblepupFile = (
    gepp: string,
    fileName: string,
    fileExtensionSuffix: string,
    text: string,
  ): void => {
    const filePath = posix.join(
      programDirectoryPath,
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
  };

  return quirmDebugger;
};

export const buildBasicQuirmDebugger = (
  programName: string,
): QuirmDebugger<Voictent> => {
  return {
    handlerByGepp: {},
    defaultHandler: buildQuirmDebugger(programName).defaultHandler,
  };
};

export const buildDefaultHandler = (
  programName: string,
): QuirmDebugger<Voictent>['defaultHandler'] =>
  buildBasicQuirmDebugger(programName).defaultHandler;
