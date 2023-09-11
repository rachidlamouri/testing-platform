import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { assertNotUndefined } from '../../../../utilities/assertNotUndefined';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { isNotNull } from '../../../../utilities/isNotNull';
import { SimplifyN } from '../../../../utilities/simplify';
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
      zorn: FileDependencyZorn;
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
    'zorn',
    'importingFile',
    'importedFile',
    'pathNodeSet',
    'pathSegmentSet',
    'tailNode',
    'headNode',
  ],
} as const)
  .withTypes<FileDependencyConstructorInput, FileDependency>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { importingFile, importedFile } = input;

      const zorn = new FileDependencyZorn({
        importingFile: importingFile.zorn,
        importedFile: importedFile.zorn,
      });

      const isCrossBoundary =
        importingFile.boundary.zorn.forHuman !==
        importedFile.boundary.zorn.forHuman;

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
            fileDependencyZorn: zorn,
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
        zorn,
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

export type FileDependencyVoque = InMemoryOdeshin2ListVoque<
  FileDependencyGepp,
  FileDependency
>;
