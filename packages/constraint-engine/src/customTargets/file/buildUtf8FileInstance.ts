import fs from 'fs';
import { InstanceBuilder } from '../../types/builder';
import {
  NotOnDiskUtf8FileTarget,
  OnDiskUtf8FileTarget,
  Utf8FileTarget,
} from './utf8FileTarget';

export type Utf8FileInstanceBuilderInput = {
  filePath: string;
};

export const buildUtf8FileInstance: InstanceBuilder<
  Utf8FileInstanceBuilderInput,
  Utf8FileTarget
> = ({ filePath }) => {
  if (fs.existsSync(filePath)) {
    return {
      filePath,
      isOnDisk: true,
      stringContents: fs.readFileSync(filePath, 'utf8'),
    } satisfies OnDiskUtf8FileTarget;
  }

  return {
    filePath,
    isOnDisk: false,
    stringContents: undefined,
  } satisfies NotOnDiskUtf8FileTarget;
};
