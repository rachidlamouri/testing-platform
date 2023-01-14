import yaml from 'yaml';
import {
  JsonFileTarget,
  NotOnDiskJsonFileTarget,
  ParseableOnDiskJsonFileTarget,
  UnparseableOnDiskJsonFileTarget,
} from './jsonFileTarget';
import { buildUtf8FileInstance } from '../utf8File/buildUtf8FileInstance';
import { InstanceBuilder } from '../../../types/builders/instanceBuilder';

export type JsonFileInstanceBuilderBuilderInput = {
  parse: (stringContents: string) => unknown;
};

export type JsonFileInstanceBuilderInput = {
  filePath: string;
};

export const buildBuildJsonFileInstance = ({
  parse,
}: JsonFileInstanceBuilderBuilderInput): InstanceBuilder<
  JsonFileInstanceBuilderInput,
  JsonFileTarget
> => {
  const buildJsonFileInstance: InstanceBuilder<
    JsonFileInstanceBuilderInput,
    JsonFileTarget
  > = ({ filePath }) => {
    const file = buildUtf8FileInstance({
      filePath,
    });

    if (file.isOnDisk) {
      try {
        const parsedContents: unknown = parse(file.stringContents);
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

  return buildJsonFileInstance;
};

export const buildJsonFileInstance = buildBuildJsonFileInstance({
  parse: JSON.parse,
});

export const buildJsonFileInstanceFromYaml = buildBuildJsonFileInstance({
  parse: yaml.parse,
});
