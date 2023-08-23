import { posix } from 'path';
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

export type BaseInvertedDependencyGroup = {
  importedFact: FileFact;
  importingFactList: FileFact[];
};

type InvertedDependencyGroupPrototype = {
  get zorn(): string;
  get visitedPathSet(): string[];
  get pathFactLists(): {
    pathNodeList: DependencyPathNodeFact[];
    pathSegmentList: DependencyPathSegmentFact[];
  };
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
    visitedPathSet: (group) => {
      // TODO: Move path parsing elsewhere
      const importedPathPartList = group.importedFact.file.directoryPath.split(
        posix.sep,
      );

      const importingPathPartListList = group.importingFactList.map(
        (importingFact) => {
          return importingFact.file.directoryPath.split(posix.sep);
        },
      );

      let commonPrefixPathPartList: string[] = importedPathPartList;
      importingPathPartListList.forEach((importingPathPartList) => {
        const nextCommonPrefixPathPartList: string[] = [];
        let index = 0;
        while (
          index < importedPathPartList.length - 1 &&
          importedPathPartList[index] === importingPathPartList[index]
        ) {
          nextCommonPrefixPathPartList.push(importedPathPartList[index]);

          index += 1;
        }

        if (
          nextCommonPrefixPathPartList.length < commonPrefixPathPartList.length
        ) {
          commonPrefixPathPartList = nextCommonPrefixPathPartList;
        }
      });

      const commonPrefix = commonPrefixPathPartList.join(posix.sep);

      const visitedPathSet = new Set<string>();
      [importedPathPartList, ...importingPathPartListList].forEach(
        (pathPartList) => {
          let index = commonPrefixPathPartList.length;
          let text = commonPrefix;
          while (index < pathPartList.length) {
            text = posix.join(text, pathPartList[index]);
            visitedPathSet.add(text);
            index += 1;
          }
        },
      );

      return [...visitedPathSet];
    },
    pathFactLists: memoizeGetter((group) => {
      // TODO: Move path parsing elsewhere
      const importedPathPartList = group.importedFact.file.directoryPath.split(
        posix.sep,
      );

      const importingPathPartListList = group.importingFactList
        .filter((importingFact) => {
          // TODO: handle cross-boundary relationships
          return (
            importingFact.directoryFact.boundaryFact.boundary.zorn ===
            group.importedFact.directoryFact.boundaryFact.boundary.zorn
          );
        })
        .map((importingFact) => {
          return {
            importingFact,
            importingPathPartList: importingFact.file.directoryPath.split(
              posix.sep,
            ),
          };
        });

      if (importingPathPartListList.length === 0) {
        return {
          pathNodeList: [],
          pathSegmentList: [],
        };
      }

      const importingPathPartListWithCommonPrefixPathPartListList =
        importingPathPartListList.map(
          ({ importingFact, importingPathPartList }) => {
            const commonPrefixPathPartList: string[] = [];
            let index = 0;
            while (
              index < importedPathPartList.length &&
              importedPathPartList[index] === importingPathPartList[index]
            ) {
              commonPrefixPathPartList.push(importedPathPartList[index]);

              index += 1;
            }
            return {
              importingFact,
              importingPathPartList,
              commonPrefixPathPartList,
            };
          },
        );

      const pathFromCommonPrefixToImportedList =
        importingPathPartListWithCommonPrefixPathPartListList.map(
          ({ commonPrefixPathPartList }) => {
            let index = commonPrefixPathPartList.length;
            let currentPath: string = posix.join(...commonPrefixPathPartList);
            const visitedDirectoryPathList: string[] = [currentPath];

            while (index < importedPathPartList.length) {
              currentPath = posix.join(
                currentPath,
                importedPathPartList[index],
              );
              visitedDirectoryPathList.push(currentPath);

              index += 1;
            }

            return {
              visitedDirectoryPathList,
              visitedDirectoryPathSet: new Set(visitedDirectoryPathList),
            };
          },
        );

      const pathFromImportingToCommonPrefixList =
        importingPathPartListWithCommonPrefixPathPartListList.map(
          ({
            importingFact,
            importingPathPartList,
            commonPrefixPathPartList,
          }) => {
            let index = commonPrefixPathPartList.length;
            let currentPath: string = posix.join(...commonPrefixPathPartList);
            const visitedDirectoryPathList: string[] = [currentPath];

            while (index < importingPathPartList.length) {
              currentPath = posix.join(
                currentPath,
                importingPathPartList[index],
              );
              visitedDirectoryPathList.push(currentPath);

              index += 1;
            }

            // the order indicates edge direction. So we want to go from the importing file to the common node
            visitedDirectoryPathList.reverse();

            return {
              importingFact,
              visitedDirectoryPathList,
              visitedDirectoryPathSet: new Set(visitedDirectoryPathList),
            };
          },
        );

      const pathNodeDirectoryPathSet = new Set(
        [
          ...pathFromCommonPrefixToImportedList,
          ...pathFromImportingToCommonPrefixList,
        ].flatMap(({ visitedDirectoryPathList }) => visitedDirectoryPathList),
      );

      const pathNodeFactByDirectoryPath = new Map(
        [...pathNodeDirectoryPathSet].map((directoryPath) => {
          return [
            directoryPath,
            new DependencyPathNodeFactInstance({
              parentZorn: group.zorn,
              directoryPath,
            }),
          ] as const;
        }),
      );

      const getDirectoryNodeId = (directoryPath: string): string => {
        const pathNodeFact = pathNodeFactByDirectoryPath.get(directoryPath);
        if (pathNodeFact === undefined) {
          throw Error(
            'Invalid state. The directory for an importing node was not found.',
          );
        }

        return pathNodeFact.nodeId;
      };

      const importingToDirectoryPathSegmentFactList =
        group.importingFactList.map((importingFact) => {
          return new DependencyPathSegmentFactInstance({
            parentZorn: group.zorn,
            tailId: importingFact.nodeId,
            headId: getDirectoryNodeId(
              importingFact.directoryFact.directory.directoryPath,
            ),
            pathHeadId: group.importedFact.nodeId,
            pathTailIdSet: [importingFact.nodeId],
          });
        });

      const commonPrefixToImportedDependencyPathSegmentFactByZorn = new Map(
        pathFromCommonPrefixToImportedList.flatMap(
          ({ visitedDirectoryPathList }) => {
            return visitedDirectoryPathList
              .slice(0, visitedDirectoryPathList.length - 1)
              .map((firstDirectoryPath, index) => {
                const secondDirectoryPath = visitedDirectoryPathList[index + 1];

                if (secondDirectoryPath === undefined) {
                  return null;
                }

                return new DependencyPathSegmentFactInstance({
                  parentZorn: group.zorn,
                  tailId: getDirectoryNodeId(firstDirectoryPath),
                  headId: getDirectoryNodeId(secondDirectoryPath),
                  pathHeadId: group.importedFact.nodeId,
                  pathTailIdSet: pathFromImportingToCommonPrefixList
                    .filter(
                      ({ visitedDirectoryPathSet }) =>
                        visitedDirectoryPathSet.has(firstDirectoryPath) ||
                        visitedDirectoryPathSet.has(secondDirectoryPath),
                    )
                    .map(({ importingFact }) => {
                      return importingFact.nodeId;
                    }),
                });
              })
              .filter(isNotNull)
              .map((dependencyFact) => {
                return [dependencyFact.zorn, dependencyFact] as const;
              });
          },
        ),
      );

      const importingToCommonPrefixDependencyPathSegmentFactByZorn = new Map(
        pathFromImportingToCommonPrefixList.flatMap(
          ({ visitedDirectoryPathList }) => {
            return visitedDirectoryPathList
              .slice(0, visitedDirectoryPathList.length - 1)
              .map((firstDirectoryPath, index) => {
                const secondDirectoryPath = visitedDirectoryPathList[index + 1];

                if (secondDirectoryPath === undefined) {
                  return null;
                }

                return new DependencyPathSegmentFactInstance({
                  parentZorn: group.zorn,
                  tailId: getDirectoryNodeId(firstDirectoryPath),
                  headId: getDirectoryNodeId(secondDirectoryPath),
                  pathHeadId: group.importedFact.nodeId,
                  pathTailIdSet: pathFromImportingToCommonPrefixList
                    .filter(
                      ({ visitedDirectoryPathSet }) =>
                        visitedDirectoryPathSet.has(firstDirectoryPath) ||
                        visitedDirectoryPathSet.has(secondDirectoryPath),
                    )
                    .map(({ importingFact }) => {
                      return importingFact.nodeId;
                    }),
                });
              })
              .filter(isNotNull)
              .map((dependencyFact) => {
                return [dependencyFact.zorn, dependencyFact] as const;
              });
          },
        ),
      );

      const importedNodeToDirectoryNodePathSegmentFact =
        new DependencyPathSegmentFactInstance({
          parentZorn: group.zorn,
          tailId: getDirectoryNodeId(
            group.importedFact.directoryFact.directory.directoryPath,
          ),
          headId: group.importedFact.nodeId,
          pathHeadId: group.importedFact.nodeId,
          pathTailIdSet: group.importingFactList.map(
            (importingFact) => importingFact.nodeId,
          ),
        });

      return {
        pathNodeList: [...pathNodeFactByDirectoryPath.values()],
        pathSegmentList: [
          ...importingToDirectoryPathSegmentFactList,
          importedNodeToDirectoryNodePathSegmentFact,
          ...commonPrefixToImportedDependencyPathSegmentFactByZorn.values(),
          ...importingToCommonPrefixDependencyPathSegmentFactByZorn.values(),
        ],
      };
    }),
  });

export const INVERTED_DEPENDENCY_GROUP_GEPP = 'inverted-dependency-group';

type InvertedDependencyGroupGepp = typeof INVERTED_DEPENDENCY_GROUP_GEPP;

export type InvertedDependencyGroupVoque = InMemoryOdeshin2Voque<
  InvertedDependencyGroupGepp,
  InvertedDependencyGroup
>;
