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
import { jsonUtils } from '../../../../utilities/json';
import { serialize } from '../../../../utilities/typed-datum/serializer/serialize';
import { isNotNull } from '../../../../utilities/isNotNull';

export type BaseInvertedDependencyGroup = {
  importedFact: FileFact;
  importingFactList: FileFact[];
};

type InvertedDependencyGroupPrototype = {
  get zorn(): string;
  get visitedPathSet(): string[];
  get idk(): {
    pathNodeList: DependencyPathNodeFact[];
    pathSegmentList: DependencyPathSegmentFact[];
  };
};

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

      // TODO: go over every path part list (including the imported one) and create the set of paths that come after the common prefix path
      // TODO LATER: once you have the set of directories you have a set of new nodes to make. then tie each dependencyFact to the invertedDpendencyGroup and find the nearest node to form an edge
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
    idk: memoizeGetter((group) => {
      // TODO: Move path parsing elsewhere
      const importedPathPartList = group.importedFact.file.directoryPath.split(
        posix.sep,
      );

      // if (
      //   group.importedFact.file.filePath ===
      //   'packages/voictents-and-estinants-engine/src/utilities/getPrototypeNameTuple.ts'
      // ) {
      //   console.log('hello');
      // }

      const list0 = group.importingFactList
        .filter((importingFact) => {
          // TODO: handle cross-boundary relationships
          return (
            importingFact.directoryFact.boundaryFact.boundary.zorn ===
            group.importedFact.directoryFact.boundaryFact.boundary.zorn
          );
        })
        .map((importingFact) => {
          return {
            importingPathPartList: importingFact.file.directoryPath.split(
              posix.sep,
            ),
          };
        });

      if (list0.length === 0) {
        return {
          pathNodeList: [],
          pathSegmentList: [],
        };
      }

      // const importingPathPartListList = list0
      //   .filter((importingFact) => {
      //     // TODO: handle cross-boundary relationships
      //     return (
      //       importingFact.directoryFact.boundaryFact.boundary.zorn ===
      //       group.importedFact.directoryFact.boundaryFact.boundary.zorn
      //     );
      //   })
      //   .map((importingFact) => {
      //     return importingFact.file.directoryPath.split(posix.sep);
      //   });

      const list1 = list0.map(({ importingPathPartList }) => {
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
          importingPathPartList,
          commonPrefixPathPartList,
        };
      });

      const list2 = list1.map(
        ({ importingPathPartList, commonPrefixPathPartList }) => {
          let index = commonPrefixPathPartList.length;
          let currentPath: string = posix.join(...commonPrefixPathPartList);
          const outputList: string[] = [currentPath];

          while (index < importedPathPartList.length) {
            currentPath = posix.join(currentPath, importedPathPartList[index]);
            outputList.push(currentPath);

            index += 1;
          }

          return {
            imported: group.importedFact.file.filePath,
            importing: posix.join(...importingPathPartList),
            commonPrefix: posix.join(...commonPrefixPathPartList),
            outputList,
          };
        },
      );

      const list3 = list1.map(
        ({ importingPathPartList, commonPrefixPathPartList }) => {
          let index = commonPrefixPathPartList.length;
          let currentPath: string = posix.join(...commonPrefixPathPartList);
          const outputList: string[] = [currentPath];

          while (index < importingPathPartList.length) {
            currentPath = posix.join(currentPath, importingPathPartList[index]);
            outputList.push(currentPath);

            index += 1;
          }

          // the order indicates edge direction. So we want to go from the importing file to the common node
          outputList.reverse();

          return {
            imported: group.importedFact.file.filePath,
            importing: posix.join(...importingPathPartList),
            commonPrefix: posix.join(...commonPrefixPathPartList),
            outputList,
          };
        },
      );

      const pathNodeDirectoryPathSet = new Set(
        [...list2, ...list3].flatMap(({ outputList }) => outputList),
      );

      const x = new Map(
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
        const thingy = x.get(directoryPath);
        if (thingy === undefined) {
          console.log(
            serialize({
              group,
              // g: group.importedFact.file.filePath,
              directoryPath,
              x,
            }),
          );

          throw Error(
            'Invalid state. The directory for an importing node was not found.',
          );
        }

        return thingy.nodeId;
      };

      const y = group.importingFactList.map((importingFact) => {
        return new DependencyPathSegmentFactInstance({
          parentZorn: group.zorn,
          tailId: importingFact.nodeId,
          headId: getDirectoryNodeId(
            importingFact.directoryFact.directory.directoryPath,
          ),
        });
      });

      const i = new Map(
        list2.flatMap(({ outputList }) => {
          return outputList
            .slice(0, outputList.length - 1)
            .map((firstDirectoryPath, index) => {
              const secondDirectoryPath = outputList[index + 1];

              if (secondDirectoryPath === undefined) {
                return null;
              }

              return new DependencyPathSegmentFactInstance({
                parentZorn: group.zorn,
                tailId: getDirectoryNodeId(firstDirectoryPath),
                headId: getDirectoryNodeId(secondDirectoryPath),
              });
            })
            .filter(isNotNull)
            .map((dependencyFact) => {
              return [dependencyFact.zorn, dependencyFact] as const;
            });
        }),
      );

      const k = new Map(
        list3.flatMap(({ outputList }) => {
          return outputList
            .slice(0, outputList.length - 1)
            .map((firstDirectoryPath, index) => {
              const secondDirectoryPath = outputList[index + 1];

              if (secondDirectoryPath === undefined) {
                return null;
              }

              return new DependencyPathSegmentFactInstance({
                parentZorn: group.zorn,
                tailId: getDirectoryNodeId(firstDirectoryPath),
                headId: getDirectoryNodeId(secondDirectoryPath),
              });
            })
            .filter(isNotNull)
            .map((dependencyFact) => {
              return [dependencyFact.zorn, dependencyFact] as const;
            });
        }),
      );

      const n = new DependencyPathSegmentFactInstance({
        parentZorn: group.zorn,
        tailId: getDirectoryNodeId(
          group.importedFact.directoryFact.directory.directoryPath,
        ),
        headId: group.importedFact.nodeId,
      });

      return {
        pathNodeList: [...x.values()],
        pathSegmentList: [...y, n, ...i.values(), ...k.values()],
      };
    }),
  });

export const INVERTED_DEPENDENCY_GROUP_GEPP = 'inverted-dependency-group';

export type InvertedDependencyGroupGepp = typeof INVERTED_DEPENDENCY_GROUP_GEPP;

export type InvertedDependencyGroupVoque = InMemoryOdeshin2Voque<
  InvertedDependencyGroupGepp,
  InvertedDependencyGroup
>;
