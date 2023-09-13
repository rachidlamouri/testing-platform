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
  ancestorDirectoryPathSet: string[];
};

type FilePathAccumulatorInput = {
  directoryPath: string;
  ancestorDirectoryPathSet: string[];
  ignoredNodePathConfigurationList: ComparisonConfiguration[];
  mutableNodeMetadataList: FileSystemNodeMetadata[];
};
const accumulateFilePaths = ({
  directoryPath,
  ancestorDirectoryPathSet,
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

  const nextAncestorDirectoryPathSet = [
    ...ancestorDirectoryPathSet,
    directoryPath,
  ];

  statuses.forEach((status) => {
    mutableNodeMetadataList.push({
      isDirectory: status.isDirectory,
      nodePath: status.nodePath,
      directoryPath,
      ancestorDirectoryPathSet: nextAncestorDirectoryPathSet,
    });

    if (status.isDirectory) {
      accumulateFilePaths({
        directoryPath: status.nodePath,
        ancestorDirectoryPathSet: nextAncestorDirectoryPathSet,
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
      ancestorDirectoryPathSet: [],
      directoryPath: '',
    },
  ];

  accumulateFilePaths({
    directoryPath,
    ancestorDirectoryPathSet: [],
    ignoredNodePathConfigurationList,
    mutableNodeMetadataList,
  });

  return mutableNodeMetadataList;
};
