import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
  memoizeGetter,
} from '../../../../utilities/buildConstructorFunction';
import { FileFact } from '../file/fileFact';
import {
  DependencyPathNodeFact,
  DependencyPathNodeFactInstance,
} from './dependencyPathNodeFact';
import {
  DependencyPathSegmentFact,
  DependencyPathSegmentFactInstance,
} from './dependencyPathSegmentFact';
import { isNotNull } from '../../../../utilities/isNotNull';
import { DependencyFact } from './dependencyFact';

export type BaseInvertedDependencyGroup = {
  importedFact: FileFact;
  dependencyFactList: DependencyFact[];
};

type InvertedDependencyGroupPrototype = {
  get zorn(): string;
  get importingFactList(): FileFact[];
  get directoryPathSetWithTailIdList(): {
    directoryPathSet: Set<string>;
    tailId: string;
  }[];
  get dependencyPathNodeFactList(): DependencyPathNodeFact[];
  get dependencyPathSegmentFactList(): DependencyPathSegmentFact[];
};

/**
 * A file and the list of files that import it
 */
type InvertedDependencyGroup = ObjectWithPrototype<
  BaseInvertedDependencyGroup,
  InvertedDependencyGroupPrototype
>;

export const { InvertedDependencyGroupInstance } =
  buildConstructorFunctionWithName('InvertedDependencyGroupInstance')<
    BaseInvertedDependencyGroup,
    InvertedDependencyGroupPrototype,
    InvertedDependencyGroup
  >({
    zorn: (group) => group.importedFact.zorn,
    importingFactList: (group) => {
      return group.dependencyFactList.map((dependencyFact) => {
        return dependencyFact.importingFact;
      });
    },
    directoryPathSetWithTailIdList: memoizeGetter((group) => {
      return group.dependencyFactList.map((dependencyFact) => {
        return {
          directoryPathSet: dependencyFact.directoryPathSet,
          tailId: dependencyFact.importingFact.nodeId,
        };
      });
    }),
    dependencyPathNodeFactList: memoizeGetter((group) => {
      const allDirectoryPathSet = new Set(
        group.dependencyFactList.flatMap((dependencyFact) => {
          return [...dependencyFact.directoryPathSet];
        }),
      );

      const dependencyPathNodeFactList = [...allDirectoryPathSet].map(
        (directoryPath) => {
          return new DependencyPathNodeFactInstance({
            parentZorn: group.zorn,
            directoryPath,
          });
        },
      );

      return dependencyPathNodeFactList;
    }),
    dependencyPathSegmentFactList: memoizeGetter((group) => {
      if (group.dependencyPathNodeFactList.length === 0) {
        return [];
      }

      const pathNodeFactByDirectoryPath2 = new Map(
        group.dependencyPathNodeFactList.map((pathNode) => {
          return [pathNode.directoryPath, pathNode] as const;
        }),
      );

      const getPathNodeId = (directoryPath: string): string => {
        const pathNodeFact = pathNodeFactByDirectoryPath2.get(directoryPath);
        if (pathNodeFact === undefined) {
          throw Error(
            'Invalid state. The directory for an importing node was not found.',
          );
        }

        return pathNodeFact.nodeId;
      };

      type DirectoryPathPair = {
        firstDirectoryPath: string;
        secondDirectoryPath: string;
      };

      const directoryPathPairList: DirectoryPathPair[] =
        group.dependencyFactList.flatMap((dependencyFact) => {
          const directoryPathList = [...dependencyFact.directoryPathSet];
          const directoryPathPairSublist = directoryPathList
            .map((firstDirectoryPath, index) => {
              const secondDirectoryPath = directoryPathList[index + 1];

              if (secondDirectoryPath === undefined) {
                return null;
              }

              return {
                firstDirectoryPath,
                secondDirectoryPath,
              };
            })
            .filter(isNotNull);

          return directoryPathPairSublist;
        });

      const directoryPathPairBySecondDirectoryPathByFirstDirectoryPath =
        new Map<string, Map<string, DirectoryPathPair>>();
      directoryPathPairList.forEach((directoryPathPair) => {
        const firstKey = directoryPathPair.firstDirectoryPath;
        const secondKey = directoryPathPair.secondDirectoryPath;

        const directoryPathPairBySecondDirectoryPath =
          directoryPathPairBySecondDirectoryPathByFirstDirectoryPath.get(
            firstKey,
          ) ?? new Map<string, DirectoryPathPair>();

        const storedDirectoryPathPair =
          directoryPathPairBySecondDirectoryPath.get(secondKey) ??
          directoryPathPair;

        directoryPathPairBySecondDirectoryPath.set(
          secondKey,
          storedDirectoryPathPair,
        );

        directoryPathPairBySecondDirectoryPathByFirstDirectoryPath.set(
          firstKey,
          directoryPathPairBySecondDirectoryPath,
        );
      });

      const directoryPathPairSetlike: DirectoryPathPair[] = [
        ...directoryPathPairBySecondDirectoryPathByFirstDirectoryPath.values(),
      ].flatMap((directoryPathPairBySecondDirectoryPath) => {
        return [...directoryPathPairBySecondDirectoryPath.values()];
      });

      const headPathSegment = new DependencyPathSegmentFactInstance({
        parentZorn: group.zorn,
        tailId: getPathNodeId(group.importedFact.file.directoryPath),
        headId: group.importedFact.nodeId,
        pathHeadId: group.importedFact.nodeId,
        pathTailIdSet: group.directoryPathSetWithTailIdList.map(
          ({ tailId }) => tailId,
        ),
      });

      const middlePathSegmentFactList = directoryPathPairSetlike.map(
        ({ firstDirectoryPath, secondDirectoryPath }) => {
          return new DependencyPathSegmentFactInstance({
            parentZorn: group.zorn,
            tailId: getPathNodeId(firstDirectoryPath),
            headId: getPathNodeId(secondDirectoryPath),
            pathHeadId: group.importedFact.nodeId,
            pathTailIdSet: group.directoryPathSetWithTailIdList
              .filter(({ directoryPathSet }) => {
                return (
                  directoryPathSet.has(firstDirectoryPath) &&
                  directoryPathSet.has(secondDirectoryPath)
                );
              })
              .map(({ tailId }) => tailId),
          });
        },
      );

      const tailPathSegmentFactList = group.importingFactList.map(
        (importingFact) => {
          return new DependencyPathSegmentFactInstance({
            parentZorn: group.zorn,
            tailId: importingFact.nodeId,
            headId: getPathNodeId(importingFact.file.directoryPath),
            pathHeadId: group.importedFact.nodeId,
            pathTailIdSet: [importingFact.nodeId],
          });
        },
      );

      const dependencyPathSegmentFactList = [
        headPathSegment,
        ...middlePathSegmentFactList,
        ...tailPathSegmentFactList,
      ];

      return dependencyPathSegmentFactList;
    }),
  });

export const INVERTED_DEPENDENCY_GROUP_GEPP = 'inverted-dependency-group';

type InvertedDependencyGroupGepp = typeof INVERTED_DEPENDENCY_GROUP_GEPP;

export type InvertedDependencyGroupVoque = InMemoryOdeshin2Voque<
  InvertedDependencyGroupGepp,
  InvertedDependencyGroup
>;
