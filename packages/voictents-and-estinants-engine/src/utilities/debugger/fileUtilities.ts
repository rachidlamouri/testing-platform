import fs from 'fs';
import { posix } from 'path';
import { serialize } from '../typed-datum/serializer/serialize';

const DEBUG_DIR_PATH = './debug/' as const;
const CACHE_PATH = posix.join(DEBUG_DIR_PATH, 'cache');
const OUTPUT_PATH = posix.join(DEBUG_DIR_PATH, 'output');

fs.rmSync(DEBUG_DIR_PATH, { recursive: true, force: true });

// TODO: decide if we want this logging here
const directoryLoggingShenanigans = (directoryPath: string): void => {
  if (!fs.existsSync(directoryPath)) {
    // eslint-disable-next-line no-console
    console.log('NEW:', directoryPath);
  }
};

directoryLoggingShenanigans(CACHE_PATH);
directoryLoggingShenanigans(OUTPUT_PATH);

fs.mkdirSync(CACHE_PATH, { recursive: true });
fs.mkdirSync(OUTPUT_PATH, { recursive: true });

export type FileCacheWriterInput = {
  directoryName: string;
  fileName: string;
  fileExtensionSuffix?: string;
} & ({ data: unknown } | { text: string });

const hasData = (
  input: FileCacheWriterInput,
): input is Extract<FileCacheWriterInput, { data: unknown }> => 'data' in input;

export const fileUtilities = {
  writeCacheFile: (input: FileCacheWriterInput): void => {
    let fileExtensionSuffix: string;
    if (input.fileExtensionSuffix !== undefined) {
      fileExtensionSuffix = input.fileExtensionSuffix;
    } else if (hasData(input)) {
      fileExtensionSuffix = 'yml';
    } else {
      fileExtensionSuffix = 'txt';
    }

    const filePath = posix.join(
      CACHE_PATH,
      input.directoryName.toString(),
      `${input.fileName.toString()}.${fileExtensionSuffix}`,
    );

    const directoryPath = posix.dirname(filePath);
    directoryLoggingShenanigans(directoryPath);

    fs.mkdirSync(directoryPath, { recursive: true });

    const text: string = hasData(input) ? serialize(input.data) : input.text;

    fs.writeFileSync(filePath, text);
  },
  writeOutputFile: (fileNameWithExtension: string, data: string): void => {
    const filePath = posix.join(OUTPUT_PATH, fileNameWithExtension);

    fs.writeFileSync(filePath, data);
  },
};
