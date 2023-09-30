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

export type FileSystemNodeMetadata = {
  isDirectory: boolean;
  nodePath: string;
  directoryPath: string;
};

type FilePathAccumulatorInput = {
  directoryPath: string;
  ignoredNodePathConfigurationList: ComparisonConfiguration[];
  mutableNodeMetadataList: FileSystemNodeMetadata[];
};
const accumulateFilePaths = ({
  directoryPath,
  ignoredNodePathConfigurationList,
  mutableNodeMetadataList,
}: FilePathAccumulatorInput): void => {
  const statuses = fs
    .readdirSync(directoryPath)
    .map((nodeName) => posix.join(directoryPath, nodeName))
    .filter((nodePath) => {
      const isIgnored = ignoredNodePathConfigurationList.some(
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
    mutableNodeMetadataList.push({
      isDirectory: status.isDirectory,
      nodePath: status.nodePath,
      directoryPath,
    });

    if (status.isDirectory) {
      accumulateFilePaths({
        directoryPath: status.nodePath,
        ignoredNodePathConfigurationList,
        mutableNodeMetadataList,
      });
    }
  });
};

export type FilePathAccessorInput = Pick<
  FilePathAccumulatorInput,
  'directoryPath' | 'ignoredNodePathConfigurationList'
>;

export const getNestedFileSystemNodeMetadataList = ({
  directoryPath,
  ignoredNodePathConfigurationList,
}: FilePathAccessorInput): FileSystemNodeMetadata[] => {
  const mutableNodeMetadataList: FileSystemNodeMetadata[] = [
    {
      isDirectory: true,
      nodePath: directoryPath,
      directoryPath: '',
    },
  ];

  accumulateFilePaths({
    directoryPath,
    ignoredNodePathConfigurationList,
    mutableNodeMetadataList,
  });

  return mutableNodeMetadataList;
};
