import { posix } from 'path';
import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
  memoizeGetter,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { FileFact } from '../file/fileFact';

type BaseDependencyFact = {
  importingFact: FileFact;
  importedFact: FileFact;
};

type DependencyFactPrototype = {
  get zorn(): string;
  /** the path of the common ancestor directory */
  get apexDirectoryPath(): string;
  get directoryPathSet(): Set<string>;
  get tailId(): string;
  get headId(): string;
  get importingBoundaryZorn(): string;
  get importedBoundaryZorn(): string;
  get isCrossBoundary(): boolean;
};

/**
 * Creates the shortest set of directory paths between the ancestorDirectoryPath
 * and the descendentDirectoryPath
 */
const getVisitedDirectoryPathList = (
  ancestorDirectoryPath: string,
  descendentDirectoryPath: string,
): string[] => {
  const ancestorDirectoryPathPartList = ancestorDirectoryPath.split(posix.sep);
  const descendentDirectoryPathPartList = descendentDirectoryPath.split(
    posix.sep,
  );

  if (!descendentDirectoryPath.startsWith(ancestorDirectoryPath)) {
    throw Error('Invalid file relationship');
  }

  let index = ancestorDirectoryPathPartList.length;
  let currentPath: string = ancestorDirectoryPath;

  const visitedDirectoryPathList: string[] = [currentPath];
  while (index < descendentDirectoryPathPartList.length) {
    currentPath = posix.join(
      currentPath,
      descendentDirectoryPathPartList[index],
    );
    visitedDirectoryPathList.push(currentPath);

    index += 1;
  }

  return visitedDirectoryPathList;
};

/**
 * Presentation metadata for a relationship between two TypeScript files. A piece of knowledge.
 */
export type DependencyFact = ObjectWithPrototype<
  BaseDependencyFact,
  DependencyFactPrototype
>;

export const { DependencyFactInstance } = buildConstructorFunctionWithName(
  'DependencyFactInstance',
)<BaseDependencyFact, DependencyFactPrototype, DependencyFact>({
  zorn: (dependencyFact) => {
    return getZorn([
      dependencyFact.importingFact.directoryFact.boundaryFact.boundary
        .displayName,
      dependencyFact.importingFact.file.onDiskFileName.camelCase,
      'depends-on',
      dependencyFact.importedFact.directoryFact.boundaryFact.boundary
        .displayName,
      dependencyFact.importedFact.file.onDiskFileName.camelCase,
    ]);
  },
  apexDirectoryPath: memoizeGetter((dependencyFact) => {
    const importingDirectoryPathPartList =
      dependencyFact.importingFact.file.directoryPath.split(posix.sep);
    const importedDirectoryPathPartList =
      dependencyFact.importedFact.file.directoryPath.split(posix.sep);

    const apexDirectoryPathPartList: string[] = [];
    let index = 0;

    while (
      index < importingDirectoryPathPartList.length &&
      index < importedDirectoryPathPartList.length &&
      importedDirectoryPathPartList[index] ===
        importingDirectoryPathPartList[index]
    ) {
      const nextPathPart = importedDirectoryPathPartList[index];
      apexDirectoryPathPartList.push(nextPathPart);

      index += 1;
    }

    const apexDirectoryPath = posix.join(...apexDirectoryPathPartList);
    return apexDirectoryPath;
  }),
  directoryPathSet: (dependencyFact) => {
    const importingToApexDirectoryPathSet = getVisitedDirectoryPathList(
      dependencyFact.apexDirectoryPath,
      dependencyFact.importingFact.file.directoryPath,
    ).reverse();

    const apexToImportedDirectoryPathSet = getVisitedDirectoryPathList(
      dependencyFact.apexDirectoryPath,
      dependencyFact.importedFact.file.directoryPath,
    );

    const directoryPathSet = new Set([
      ...importingToApexDirectoryPathSet,
      ...apexToImportedDirectoryPathSet,
    ]);
    return directoryPathSet;
  },
  tailId: (dependencyFact) => {
    return dependencyFact.importingFact.nodeLocator.id;
  },
  headId: (dependencyFact) => {
    return dependencyFact.importedFact.nodeLocator.id;
  },
  importingBoundaryZorn: (dependencyFact) => {
    return dependencyFact.importingFact.directoryFact.boundaryFact.boundary
      .zorn;
  },
  importedBoundaryZorn: (dependencyFact) => {
    return dependencyFact.importedFact.directoryFact.boundaryFact.boundary.zorn;
  },
  isCrossBoundary: (dependencyFact) => {
    return (
      dependencyFact.importingBoundaryZorn !==
      dependencyFact.importedBoundaryZorn
    );
  },
});

export const DEPENDENCY_FACT_GEPP = 'dependency-fact';

type DependencyFactGepp = typeof DEPENDENCY_FACT_GEPP;

export type DependencyFactVoque = InMemoryOdeshin2ListVoque<
  DependencyFactGepp,
  DependencyFact
>;
