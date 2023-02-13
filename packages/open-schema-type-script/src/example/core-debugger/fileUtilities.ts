import fs from 'fs';
import { posix } from 'path';
import * as uuid from 'uuid';

const DEBUG_DIR_PATH = './debug/' as const;
const ENGINE_EVENTS_PATH = posix.join(DEBUG_DIR_PATH, 'engine-events');
const CACHE_PATH = posix.join(DEBUG_DIR_PATH, 'cache');

fs.rmSync(DEBUG_DIR_PATH, { recursive: true, force: true });
fs.mkdirSync(ENGINE_EVENTS_PATH, { recursive: true });

export const fileUtilities = {
  getEventFilePath: (fileName: string): string => {
    return posix.join(ENGINE_EVENTS_PATH, `${fileName}.txt`);
  },
  getCacheFilePath: (directoryName: string): string => {
    return posix.join(CACHE_PATH, directoryName, `${uuid.v4()}.txt`);
  },
  writeFile: (filePath: string, text: string): void => {
    fs.mkdirSync(posix.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, text);
  },
};
