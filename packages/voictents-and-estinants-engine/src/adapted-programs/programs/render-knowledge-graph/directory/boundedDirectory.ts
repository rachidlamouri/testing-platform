import { posix } from 'path';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { Directory } from '../../../programmable-units/file/directory';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import { LocalDirectedGraphElement2Zorn } from '../../../programmable-units/graph-visualization/directed-graph/types';
import { Boundary } from '../boundary/boundary';
import { CommonBoundaryRoot } from '../common-boundary-root/commonBoundaryRoot';
import { FileSystemNodeVoque } from '../../../programmable-units/file/fileSystemNodeVoictent';
import { DirectoryPath } from '../../../programmable-units/file/directoryPath';

type BoundedDirectoryConstructorInput = {
  boundary: Boundary;
  commonBoundaryRoot: CommonBoundaryRoot;
  directory: Directory;
};

/**
 * A directory and the boundary it lives under. There can only be one bounded
 * directory per directory.
 */
export type BoundedDirectory = SimplifyN<
  [
    { id: FileSystemNodeZorn },
    Omit<BoundedDirectoryConstructorInput, 'commonBoundaryRoot'>,
    {
      nodePath: DirectoryPath;
      isBoundaryDirectory: boolean;
      directoryPathFromCommonBoundaryRoot: string;
      localGraphElementZorn: LocalDirectedGraphElement2Zorn;
    },
  ]
>;

export const { BoundedDirectoryInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundedDirectoryInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'boundary',
    'directory',
    'nodePath',
    'isBoundaryDirectory',
    'directoryPathFromCommonBoundaryRoot',
    'localGraphElementZorn',
  ],
} as const)
  .withTypes<BoundedDirectoryConstructorInput, BoundedDirectory>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { boundary, commonBoundaryRoot, directory } = input;

      const isBoundaryDirectory =
        directory.directoryPath.serialized ===
        boundary.directory.directoryPath.serialized;

      const directoryPathFromCommonBoundaryRoot = posix.relative(
        commonBoundaryRoot.directoryPath,
        boundary.directory.directoryPath.serialized,
      );

      const localGraphElementZorn =
        LocalDirectedGraphElement2Zorn.buildSubgraphZorn({
          distinguisher: directory.directoryPath.serialized,
        });

      return {
        id: directory.id,
        boundary,
        directory,
        nodePath: directory.nodePath,
        isBoundaryDirectory,
        directoryPathFromCommonBoundaryRoot,
        localGraphElementZorn,
      };
    },
  })
  .assemble();

export const BOUNDED_DIRECTORY_GEPP = 'bounded-directory';

type BoundedDirectoryGepp = typeof BOUNDED_DIRECTORY_GEPP;

export type BoundedDirectoryVoque = FileSystemNodeVoque<
  BoundedDirectoryGepp,
  BoundedDirectory
>;
