import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { PartialClusterAttributeByKey } from './directedSubgraph';
import { GraphConstituentLocator } from './graphConstituentLocator';
import { RootGraphLocator } from './rootGraphLocator';
import { GlobalDirectedGraphElement2Zorn } from './types';

type BaseDirectedCluster2 = {
  locator: GraphConstituentLocator;
  inputAttributeByKey: Omit<PartialClusterAttributeByKey, 'id'>;
  rankGroupList?: never;
};

type DirectedCluster2Prototype = {
  get zorn(): GlobalDirectedGraphElement2Zorn;
  get id(): string;
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
  zorn: (directedSubgraph) => {
    return directedSubgraph.locator.zorn;
  },
  id: (directedSubgraph) => {
    return directedSubgraph.locator.id;
  },
  parentId: (directedSubgraph) => {
    return directedSubgraph.locator.parentId;
  },
  rootGraphLocator: (directedCluster) => {
    return directedCluster.locator.rootGraphLocator;
  },
  attributeByKey: (directedSubgraph) => {
    return {
      id: directedSubgraph.id,
      ...directedSubgraph.inputAttributeByKey,
    };
  },
  isRoot: () => false,
  isCluster: () => true,
});
