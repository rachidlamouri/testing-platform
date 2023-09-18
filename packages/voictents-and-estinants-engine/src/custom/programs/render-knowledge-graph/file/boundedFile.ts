import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { FilePath } from '../../../programmable-units/file/filePath';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import { FileSystemNodeVoque } from '../../../programmable-units/file/fileSystemNodeVoictent';
import { LocalDirectedGraphElement2Zorn } from '../../../programmable-units/graph-visualization/directed-graph/types';
import { TypeScriptFile } from '../../../programmable-units/type-script-file/typeScriptFile';
import { Boundary } from '../boundary/boundary';
import { PartitionedBoundary } from '../boundary/partitionedBoundary';
import { PartitionFact } from '../partition-fact/partitionFact';

type BoundedFileConstructorInput = {
  boundary: PartitionedBoundary;
  file: TypeScriptFile;
  ancestorDirectoryPathSet: string[];
};

/**
 * A file and the boundary it lives under. A file can only be tied to one
 * boundary.
 */
export type BoundedFile = {
  zorn: FileSystemNodeZorn;
  sourcePartitionFact: PartitionFact;
  boundary: Boundary;
  file: TypeScriptFile;
  nodePath: FilePath;
  directoryPathSetFromBoundary: string[];
  directoryPathSetToBoundary: string[];
  localGraphElementZorn: LocalDirectedGraphElement2Zorn;
};

export const { BoundedFileInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundedFileInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'sourcePartitionFact',
    'boundary',
    'file',
    'nodePath',
    'directoryPathSetFromBoundary',
    'directoryPathSetToBoundary',
    'localGraphElementZorn',
  ],
} as const)
  .withTypes<BoundedFileConstructorInput, BoundedFile>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const {
        boundary: { partitionFact, boundary },
        file,
        ancestorDirectoryPathSet,
      } = input;

      const boundaryDirectoryPathIndex = ancestorDirectoryPathSet.findIndex(
        (directoryPath) => {
          return directoryPath === boundary.directory.directoryPath;
        },
      );

      const directoryPathSetFromBoundary = ancestorDirectoryPathSet.slice(
        boundaryDirectoryPathIndex,
      );

      const directoryPathSetToBoundary = directoryPathSetFromBoundary
        .slice()
        .reverse();

      const localGraphElementZorn =
        LocalDirectedGraphElement2Zorn.buildNodeZorn({
          distinguisher: file.filePath,
        });

      return {
        zorn: file.zorn,
        sourcePartitionFact: partitionFact,
        boundary,
        file,
        nodePath: file.nodePath,
        directoryPathSetFromBoundary,
        directoryPathSetToBoundary,
        localGraphElementZorn,
      };
    },
  })
  .assemble();

export const BOUNDED_FILE_GEPP = 'bounded-file';

type BoundedFileGepp = typeof BOUNDED_FILE_GEPP;

export type BoundedFileVoque = FileSystemNodeVoque<
  BoundedFileGepp,
  BoundedFile
>;
