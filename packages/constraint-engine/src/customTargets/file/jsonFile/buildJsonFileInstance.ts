import {
  JsonFileTarget,
  NotOnDiskJsonFileTarget,
  ParseableOnDiskJsonFileTarget,
  UnparseableOnDiskJsonFileTarget,
} from './jsonFileTarget';
import { buildUtf8FileInstance } from '../utf8File/buildUtf8FileInstance';
import { InstanceBuilder } from '../../../types/builders/instanceBuilder';

export type JsonFileInstanceBuilderInput = {
  filePath: string;
};

export const buildJsonFileInstance: InstanceBuilder<
  JsonFileInstanceBuilderInput,
  JsonFileTarget
> = ({ filePath }) => {
  const file = buildUtf8FileInstance({
    filePath,
  });

  if (file.isOnDisk) {
    try {
      const parsedContents: unknown = JSON.parse(file.stringContents);
      return {
        ...file,
        isParseable: true,
        parsedContents,
      } satisfies ParseableOnDiskJsonFileTarget;
    } catch {
      return {
        ...file,
        isParseable: false,
        parsedContents: undefined,
      } satisfies UnparseableOnDiskJsonFileTarget;
    }
  } else {
    return {
      ...file,
    } satisfies NotOnDiskJsonFileTarget;
  }
};
