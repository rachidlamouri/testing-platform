import { PartialSubgraphAttributeByKey } from './directedSubgraph';
import { RootGraphLocator } from './rootGraphLocator';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { GlobalDirectedGraphElement2Zorn } from './types';
import { GraphConstituentLocator } from './graphConstituentLocator';

type BaseDirectedSubgraph2 = {
  locator: GraphConstituentLocator;
  inputAttributeByKey: Omit<PartialSubgraphAttributeByKey, 'id'>;
  rankGroupList?: string[][];
};

type DirectedSubgraph2Prototype = {
  get id(): GlobalDirectedGraphElement2Zorn;
  get oldId(): string;
  get parentId(): string;
  get attributeByKey(): PartialSubgraphAttributeByKey;
  get isRoot(): false;
  get isCluster(): false;
  get rootGraphLocator(): RootGraphLocator;
};

/**
 * Represents a Graphviz Subgraph without the child objects. The
 * rootGraphLocator allows this object to be assembled into a complete graph.
 */
export type DirectedSubgraph2 = ObjectWithPrototype<
  BaseDirectedSubgraph2,
  DirectedSubgraph2Prototype
>;

export const { DirectedSubgraph2Instance } = buildConstructorFunctionWithName(
  'DirectedSubgraph2Instance',
)<BaseDirectedSubgraph2, DirectedSubgraph2Prototype>({
  id: (directedSubgraph) => {
    return directedSubgraph.locator.id;
  },
  oldId: (directedSubgraph) => {
    return directedSubgraph.locator.oldId;
  },
  parentId: (directedSubgraph) => {
    return directedSubgraph.locator.parentId;
  },
  attributeByKey: (directedSubgraph) => {
    return {
      id: directedSubgraph.oldId,
      ...directedSubgraph.inputAttributeByKey,
    };
  },
  isRoot: () => false,
  isCluster: () => false,
  rootGraphLocator: (directedSubgraph) => {
    return directedSubgraph.locator.rootGraphLocator;
  },
});
