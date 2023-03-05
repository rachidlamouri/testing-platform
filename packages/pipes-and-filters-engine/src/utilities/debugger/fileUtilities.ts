import fs from 'fs';
import { posix } from 'path';
import { serialize } from '../serialize';

const DEBUG_DIR_PATH = './debug/' as const;
const CACHE_PATH = posix.join(DEBUG_DIR_PATH, 'cache');

fs.rmSync(DEBUG_DIR_PATH, { recursive: true, force: true });
fs.mkdirSync(CACHE_PATH, { recursive: true });

export type FileCacheWriterInput = {
  directoryName: string;
  fileName: string;
  data: unknown;
};

export const fileUtilities = {
  writeCacheFile: ({
    directoryName,
    fileName,
    data,
  }: FileCacheWriterInput): void => {
    const filePath = posix.join(
      CACHE_PATH,
      serialize(directoryName),
      `${serialize(fileName)}.txt`,
    );
    fs.mkdirSync(posix.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, serialize(data));
  },
};
