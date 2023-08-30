import { posix } from 'path';
import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';
import { CommonBoundaryRoot } from '../common-boundary-root/commonBoundaryRoot';
import { Boundary } from './boundary';
import {
  RootGraphLocator,
  RootGraphLocatorInstance,
} from '../../../programmable-units/graph-visualization/directed-graph/rootGraphLocator';
import { FactTypeName } from './factTypeName';

type BaseBoundaryFact = {
  boundary: Boundary;
  commonBoundaryRoot: CommonBoundaryRoot;
};

type BoundaryFactPrototype = {
  get typeName(): FactTypeName.BoundaryFact;
  get zorn(): string;
  get rootGraphLocator(): RootGraphLocator;
  get directoryPathRelativeToCommonBoundary(): string;
};

/**
 * Presentation metadata for a boundary. A piece of knowledge.
 */
export type BoundaryFact = ObjectWithPrototype<
  BaseBoundaryFact,
  BoundaryFactPrototype
>;

export const { BoundaryFactInstance } = buildConstructorFunctionWithName(
  'BoundaryFactInstance',
)<BaseBoundaryFact, BoundaryFactPrototype, BoundaryFact>({
  typeName: () => FactTypeName.BoundaryFact,
  zorn: (boundaryFact) => {
    return getZorn([boundaryFact.boundary.zorn, 'fact']);
  },
  rootGraphLocator: (boundaryFact) => {
    return new RootGraphLocatorInstance({
      idOverride: getZornableId({
        zorn: getZorn([boundaryFact.zorn, 'graph']),
      }),
      distinguisher: boundaryFact.boundary.displayName,
    });
  },
  directoryPathRelativeToCommonBoundary: (boundaryFact) => {
    return posix.relative(
      boundaryFact.commonBoundaryRoot.directoryPath,
      boundaryFact.boundary.directoryPath,
    );
  },
});

export const BOUNDARY_FACT_GEPP = 'boundary-fact';

type BoundaryFactGepp = typeof BOUNDARY_FACT_GEPP;

export type BoundaryFactVoque = InMemoryOdeshin2Voque<
  BoundaryFactGepp,
  BoundaryFact
>;
