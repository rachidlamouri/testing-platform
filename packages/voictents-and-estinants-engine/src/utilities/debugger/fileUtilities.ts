import fs from 'fs';
import { posix } from 'path';
import { serialize } from '../serialize';

const DEBUG_DIR_PATH = './debug/' as const;
const CACHE_PATH = posix.join(DEBUG_DIR_PATH, 'cache');
const OUTPUT_PATH = posix.join(DEBUG_DIR_PATH, 'output');

fs.rmSync(DEBUG_DIR_PATH, { recursive: true, force: true });
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
      fileExtensionSuffix = 'json';
    } else {
      fileExtensionSuffix = 'txt';
    }

    const filePath = posix.join(
      CACHE_PATH,
      input.directoryName.toString(),
      `${input.fileName.toString()}.${fileExtensionSuffix}`,
    );
    fs.mkdirSync(posix.dirname(filePath), { recursive: true });

    const text: string = hasData(input) ? serialize(input.data) : input.text;

    fs.writeFileSync(filePath, text);
  },
  writeOutputFile: (fileNameWithExtension: string, data: string): void => {
    const filePath = posix.join(OUTPUT_PATH, fileNameWithExtension);

    fs.writeFileSync(filePath, data);
  },
};
