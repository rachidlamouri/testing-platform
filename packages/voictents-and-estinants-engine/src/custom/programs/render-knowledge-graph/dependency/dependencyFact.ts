import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { FileFact } from '../file/fileFact';

type BaseDependencyFact = {
  importingFact: FileFact;
  importedFact: FileFact;
};

type DependencyFactPrototype = {
  get zorn(): string;
  get tailId(): string;
  get headId(): string;
};

/**
 * Presentation metadata for a relationship between two TypeScript files. A piece of knowledge.
 */
type DependencyFact = ObjectWithPrototype<
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
  tailId: (dependencyFact) => {
    return dependencyFact.importingFact.nodeId;
  },
  headId: (dependencyFact) => {
    return dependencyFact.importedFact.nodeId;
  },
});

export const DEPENDENCY_FACT_GEPP = 'dependency-fact';

type DependencyFactGepp = typeof DEPENDENCY_FACT_GEPP;

export type DependencyFactVoque = InMemoryOdeshin2Voque<
  DependencyFactGepp,
  DependencyFact
>;
