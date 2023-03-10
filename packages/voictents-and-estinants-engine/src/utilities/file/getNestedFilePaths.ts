import fs from 'fs';
import { posix } from 'path';

export enum ComparisonConfigurationTypeName {
  Equals = 'Equals',
  EndsWith = 'EndsWith',
}

type ComparisonConfiguration = {
  typeName: ComparisonConfigurationTypeName;
  value: string;
};

const comparisonImplementationsByTypeName: Record<
  ComparisonConfiguration['typeName'],
  (
    nodePath: string,
    comparisonConfiguration: ComparisonConfiguration,
  ) => boolean
> = {
  Equals: (nodePath, thing) => nodePath === thing.value,
  EndsWith: (nodePath, thing) => nodePath.endsWith(thing.value),
};

type FilePathAccumulatorInput = {
  directoryPath: string;
  ignoredNodePathConfigurations: ComparisonConfiguration[];
  mutableFilePathList: string[];
};

const accumulateFilePaths = ({
  directoryPath,
  ignoredNodePathConfigurations: configurationsForIgnoring,
  mutableFilePathList,
}: FilePathAccumulatorInput): void => {
  const statuses = fs
    .readdirSync(directoryPath)
    .map((nodeName) => posix.join(directoryPath, nodeName))
    .filter((nodePath) => {
      const isIgnored = configurationsForIgnoring.some(
        (comparisonConfiguration) => {
          const performComparison =
            comparisonImplementationsByTypeName[
              comparisonConfiguration.typeName
            ];
          return performComparison(nodePath, comparisonConfiguration);
        },
      );

      return !isIgnored;
    })
    .map((nodePath) => {
      const status = fs.statSync(nodePath);
      return {
        nodePath,
        isDirectory: status.isDirectory(),
      };
    });

  statuses.forEach((status) => {
    if (status.isDirectory) {
      accumulateFilePaths({
        directoryPath: status.nodePath,
        ignoredNodePathConfigurations: configurationsForIgnoring,
        mutableFilePathList,
      });
    } else {
      mutableFilePathList.push(status.nodePath);
    }
  });
};

export type FilePathAccessorInput = Pick<
  FilePathAccumulatorInput,
  'directoryPath' | 'ignoredNodePathConfigurations'
>;

export const getNestedFilePaths = ({
  directoryPath,
  ignoredNodePathConfigurations,
}: FilePathAccessorInput): string[] => {
  const mutableFilePathList: string[] = [];

  accumulateFilePaths({
    directoryPath,
    ignoredNodePathConfigurations,
    mutableFilePathList,
  });

  return mutableFilePathList;
};
