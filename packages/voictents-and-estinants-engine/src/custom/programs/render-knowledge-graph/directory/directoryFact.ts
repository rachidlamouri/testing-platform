import { posix } from 'path';
import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';
import { Directory } from '../../../programmable-units/file/directory';
import { BoundaryFact } from '../boundary/boundaryFact';
import { FactTypeName } from '../boundary/factTypeName';

type BaseDirectoryFact = {
  directory: Directory;
  boundaryFact: BoundaryFact;
};

type DirectoryFactPrototype = {
  get typeName(): FactTypeName.DirectoryFact;
  get zorn(): string;
  get subgraphZorn(): string;
  get subgraphId(): string;
  get directoryPathRelativeToParentDirectory(): string;
  get isBoundaryDirectory(): boolean;
};

/**
 * Presentation metadata for a directory. A piece of knowledge.
 */
export type DirectoryFact = ObjectWithPrototype<
  BaseDirectoryFact,
  DirectoryFactPrototype
>;

export const { DirectoryFactInstance } = buildConstructorFunctionWithName(
  'DirectoryFactInstance',
)<BaseDirectoryFact, DirectoryFactPrototype, DirectoryFact>({
  typeName: () => FactTypeName.DirectoryFact,
  zorn: (directoryFact) => {
    return getZorn([
      directoryFact.boundaryFact.zorn,
      'directory',
      directoryFact.directory.directoryPath,
      'fact',
    ]);
  },
  subgraphZorn: (directoryFact) => {
    return getZorn([directoryFact.zorn, 'subgraph']);
  },
  subgraphId: (directoryFact) => {
    return getZornableId({ zorn: directoryFact.subgraphZorn });
  },
  directoryPathRelativeToParentDirectory: (directoryFact) => {
    return posix.relative(
      directoryFact.directory.parentDirectoryPath,
      directoryFact.directory.directoryPath,
    );
  },
  isBoundaryDirectory: (directoryFact) => {
    return (
      directoryFact.directory.directoryPath ===
      directoryFact.boundaryFact.boundary.directoryPath
    );
  },
});

export const DIRECTORY_FACT_GEPP = 'directory-fact';

type DirectoryFactGepp = typeof DIRECTORY_FACT_GEPP;

export type DirectoryFactVoque = InMemoryOdeshin2Voque<
  DirectoryFactGepp,
  DirectoryFact
>;
