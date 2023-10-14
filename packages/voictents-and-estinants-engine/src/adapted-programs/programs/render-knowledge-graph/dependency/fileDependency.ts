import { InMemoryIdentifiableItem2IndexByName } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { InMemoryStreamMetatype } from '../../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { assertNotUndefined } from '../../../../package-agnostic-utilities/nil/assertNotUndefined';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { isNotNull } from '../../../../package-agnostic-utilities/nil/isNotNull';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { BoundedFile } from '../file/boundedFile';
import {
  FileDependencyPathNode,
  FileDependencyPathNodeInstance,
} from './dependency-path/fileDependencyPathNode';
import {
  FileDependencyPathSegment,
  FileDependencyPathSegmentInstance,
} from './dependency-path/fileDependencyPathSegment';
import { FileDependencyZorn } from './fileDependencyZorn';

type FileDependencyConstructorInput = {
  importingFile: BoundedFile;
  importedFile: BoundedFile;
};

/**
 * Defines a single import relationship between two bounded files
 */
export type FileDependency = SimplifyN<
  [
    {
      id: FileDependencyZorn;
    },
    FileDependencyConstructorInput,
    {
      pathNodeSet: FileDependencyPathNode[];
      pathSegmentSet: FileDependencyPathSegment[];
      tailNode: FileDependencyPathNode;
      headNode: FileDependencyPathNode;
    },
  ]
>;

export const { FileDependencyInstance } = buildNamedConstructorFunction({
  constructorName: 'FileDependencyInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'importingFile',
    'importedFile',
    'pathNodeSet',
    'pathSegmentSet',
    'tailNode',
    'headNode',
  ],
} as const)
  .withTypes<FileDependencyConstructorInput, FileDependency>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { importingFile, importedFile } = input;

      const id = new FileDependencyZorn({
        importingFile: importingFile.id,
        importedFile: importedFile.id,
      });

      const isCrossBoundary =
        importingFile.boundary.id.forHuman !==
        importedFile.boundary.id.forHuman;

      let dependencyPathDirectoryPathSet: Set<string>;
      if (isCrossBoundary) {
        dependencyPathDirectoryPathSet = new Set([
          ...importingFile.directoryPathSetToBoundary,
          ...importedFile.directoryPathSetFromBoundary,
        ]);
      } else {
        let apexDirectoryPath: string | undefined;

        let index = 0;
        while (
          importedFile.directoryPathSetFromBoundary[index] !== undefined &&
          importedFile.directoryPathSetFromBoundary[index] ===
            importingFile.directoryPathSetFromBoundary[index]
        ) {
          apexDirectoryPath = importedFile.directoryPathSetFromBoundary[index];
          index += 1;
        }

        assertNotUndefined(apexDirectoryPath);

        const indexA = importingFile.directoryPathSetToBoundary.findIndex(
          (directoryPath) => {
            return directoryPath === apexDirectoryPath;
          },
        );

        const indexB = importedFile.directoryPathSetFromBoundary.findIndex(
          (directoryPath) => {
            return directoryPath === apexDirectoryPath;
          },
        );

        dependencyPathDirectoryPathSet = new Set([
          // The first subset will not include the apex directory, but the second subset will
          ...importingFile.directoryPathSetToBoundary.slice(0, indexA),
          ...importedFile.directoryPathSetFromBoundary.slice(indexB),
        ]);
      }

      const dependencyPathDirectoryPathCombination = [
        ...dependencyPathDirectoryPathSet,
      ];

      const pathNodeSet = dependencyPathDirectoryPathCombination.map(
        (directoryPath, index) => {
          return new FileDependencyPathNodeInstance({
            fileDependencyZorn: id,
            directoryPath,
            index,
          });
        },
      );

      const tailNode = pathNodeSet[0];
      const headNode = pathNodeSet[pathNodeSet.length - 1];

      assertNotUndefined(tailNode);
      assertNotUndefined(headNode);

      const pathSegmentSet = dependencyPathDirectoryPathCombination
        .map((tailDirectoryPath, index, list) => {
          const headDirectoryPath = list[index + 1];

          if (headDirectoryPath === undefined) {
            return null;
          }

          return new FileDependencyPathSegmentInstance({
            tailDirectoryPath,
            headDirectoryPath,
          });
        })
        .filter(isNotNull);

      return {
        id,
        importingFile,
        importedFile,
        pathNodeSet,
        pathSegmentSet,
        tailNode,
        headNode,
      } satisfies FileDependency;
    },
  })
  .assemble();

export const FILE_DEPENDENCY_GEPP = 'file-dependency';

type FileDependencyGepp = typeof FILE_DEPENDENCY_GEPP;

export type FileDependencyVoictentPelie = {
  importedFileListByImportingFilePath: Map<string, BoundedFile[]>;
  importingFileListByImportedFilePath: Map<string, BoundedFile[]>;
  list: FileDependency[];
};

export type FileDependencyVoque = InMemoryStreamMetatype<
  FileDependencyGepp,
  FileDependency,
  FileDependency,
  InMemoryIdentifiableItem2IndexByName,
  FileDependencyVoictentPelie
>;
