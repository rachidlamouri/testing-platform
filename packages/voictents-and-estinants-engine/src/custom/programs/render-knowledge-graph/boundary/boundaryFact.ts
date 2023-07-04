import { posix } from 'path';
import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';
import {
  RootGraphLocator,
  RootGraphLocatorInstance,
} from '../../../programmable-units/graph-visualization/directed-graph/rootGraphLocator';
import { CommonBoundaryRoot } from '../common-boundary-root/commonBoundaryRoot';
import { Boundary } from './boundary';

type BaseBoundaryFact = {
  boundary: Boundary;
  commonBoundaryRoot: CommonBoundaryRoot;
};

type BoundaryFactPrototype = {
  get zorn(): string;
  get graphZorn(): string;
  get graphId(): string;
  get subgraphZorn(): string;
  get subgraphId(): string;
  get directoryPathRelativeToCommonBoundary(): string;
  get rootGraphLocator(): RootGraphLocator;
};

/**
 * Presentation metadata for a boundary. A piece of knowledge.
 */
export type BoundaryFact = ObjectWithPrototype<
  BaseBoundaryFact,
  BoundaryFactPrototype
>;

const memoizedLocatorCache = new Map<BoundaryFact, RootGraphLocator>();

export const { BoundaryFactInstance } = buildConstructorFunctionWithName(
  'BoundaryFactInstance',
)<BaseBoundaryFact, BoundaryFactPrototype, BoundaryFact>({
  zorn: (boundaryFact) => {
    return getZorn([boundaryFact.boundary.zorn, 'fact']);
  },
  graphZorn: (boundaryFact) => {
    return getZorn([boundaryFact.zorn, 'graph']);
  },
  graphId: (boundaryFact) => {
    return getZornableId({ zorn: boundaryFact.graphZorn });
  },
  subgraphZorn: (boundaryFact) => {
    return getZorn([boundaryFact.zorn, 'subgraph']);
  },
  subgraphId: (boundaryFact) => {
    return getZornableId({ zorn: boundaryFact.subgraphZorn });
  },
  directoryPathRelativeToCommonBoundary: (boundaryFact) => {
    return posix.relative(
      boundaryFact.commonBoundaryRoot.directoryPath,
      boundaryFact.boundary.directoryPath,
    );
  },
  rootGraphLocator: (boundaryFact) => {
    const locator =
      memoizedLocatorCache.get(boundaryFact) ??
      new RootGraphLocatorInstance({
        id: boundaryFact.graphId,
        debugName: boundaryFact.boundary.displayName,
      });

    memoizedLocatorCache.set(boundaryFact, locator);
    return locator;
  },
});

export const BOUNDARY_FACT_GEPP = 'boundary-fact';

type BoundaryFactGepp = typeof BOUNDARY_FACT_GEPP;

export type BoundaryFactVoque = InMemoryOdeshin2Voque<
  BoundaryFactGepp,
  BoundaryFact
>;
