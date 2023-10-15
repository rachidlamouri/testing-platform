import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { FilePath } from '../../../programmable-units/file/filePath';
import { FileSystemNodeId } from '../../../programmable-units/file/fileSystemNode';
import { FileSystemNodeStreamMetatype } from '../../../programmable-units/file/fileSystemNodeCollection';
import { LocalDirectedGraphElement2Id } from '../../../programmable-units/graph-visualization/directed-graph/types';
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
  id: FileSystemNodeId;
  sourcePartitionFact: PartitionFact;
  boundary: Boundary;
  file: TypeScriptFile;
  nodePath: FilePath;
  directoryPathSetFromBoundary: string[];
  directoryPathSetToBoundary: string[];
  localGraphElementId: LocalDirectedGraphElement2Id;
};

export const { BoundedFileInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundedFileInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'sourcePartitionFact',
    'boundary',
    'file',
    'nodePath',
    'directoryPathSetFromBoundary',
    'directoryPathSetToBoundary',
    'localGraphElementId',
  ],
} as const)
  .withTypes<BoundedFileConstructorInput, BoundedFile>({
    typeCheckErrorMessage: {
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
          return directoryPath === boundary.directory.directoryPath.serialized;
        },
      );

      const directoryPathSetFromBoundary = ancestorDirectoryPathSet.slice(
        boundaryDirectoryPathIndex,
      );

      const directoryPathSetToBoundary = directoryPathSetFromBoundary
        .slice()
        .reverse();

      const localGraphElementId = LocalDirectedGraphElement2Id.buildNodeId({
        distinguisher: file.filePath.serialized,
      });

      return {
        id: file.id,
        sourcePartitionFact: partitionFact,
        boundary,
        file,
        nodePath: file.nodePath,
        directoryPathSetFromBoundary,
        directoryPathSetToBoundary,
        localGraphElementId,
      };
    },
  })
  .assemble();

export const BOUNDED_FILE_COLLECTION_ID = 'bounded-file';

type BoundedFileCollectionId = typeof BOUNDED_FILE_COLLECTION_ID;

export type BoundedFileStreamMetatype = FileSystemNodeStreamMetatype<
  BoundedFileCollectionId,
  BoundedFile
>;
