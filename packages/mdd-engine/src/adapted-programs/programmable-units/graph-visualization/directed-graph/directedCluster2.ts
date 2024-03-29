import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { PartialClusterAttributeByKey } from './directedSubgraph';
import { GraphConstituentLocator } from './graphConstituentLocator';
import { RootGraphLocator } from './rootGraphLocator';
import { GlobalDirectedGraphElement2Id } from './types';

type BaseDirectedCluster2 = {
  locator: GraphConstituentLocator;
  inputAttributeByKey: Omit<PartialClusterAttributeByKey, 'id'>;
  rankGroupList?: never;
};

type DirectedCluster2Prototype = {
  get id(): GlobalDirectedGraphElement2Id;
  get oldId(): string;
  get parentId(): string;
  get rootGraphLocator(): RootGraphLocator;
  get attributeByKey(): PartialClusterAttributeByKey;
  get isRoot(): false;
  get isCluster(): true;
};

/**
 * Represents a Graphviz Cluster without the child objects. The rootGraphLocator allows this object to
 * be assembled into a complete graph.
 */
export type DirectedCluster2 = ObjectWithPrototype<
  BaseDirectedCluster2,
  DirectedCluster2Prototype
>;

export const { DirectedCluster2Instance } = buildConstructorFunctionWithName(
  'DirectedCluster2Instance',
)<BaseDirectedCluster2, DirectedCluster2Prototype, DirectedCluster2>({
  // TODO: rename arguments to "directedCluster"
  id: (directedSubgraph) => {
    return directedSubgraph.locator.id;
  },
  oldId: (directedSubgraph) => {
    return directedSubgraph.locator.oldId;
  },
  parentId: (directedSubgraph) => {
    return directedSubgraph.locator.parentId;
  },
  rootGraphLocator: (directedCluster) => {
    return directedCluster.locator.rootGraphLocator;
  },
  attributeByKey: (directedSubgraph) => {
    return {
      id: directedSubgraph.oldId,
      ...directedSubgraph.inputAttributeByKey,
    };
  },
  isRoot: () => false,
  isCluster: () => true,
});
