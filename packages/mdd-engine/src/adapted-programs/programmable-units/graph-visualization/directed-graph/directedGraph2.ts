import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { PartialGraphAttributeByKey } from './directedGraph';
import { RootGraphLocator } from './rootGraphLocator';
import { RootDirectedGraphElement2Id } from './types';

type BaseDirectedGraph2 = {
  locator: RootGraphLocator;
  isCluster?: never;
  inputAttributeByKey: Omit<PartialGraphAttributeByKey, 'id'>;
  rankGroupList?: never;
};

type DirectedGraph2Prototype = {
  get id(): RootDirectedGraphElement2Id;
  /** @deprecated */
  get rootGraphLocator(): RootGraphLocator;
  get attributeByKey(): PartialGraphAttributeByKey;
  get isRoot(): true;
  get oldId(): string;
};

/**
 * Represents a Graphviz directed graph without any child objects. This is the
 * top most item in a directed graph. The rootGraphLocator allows this object to
 * be assembled into a complete graph.
 *
 * @todo rename this type (and all related types: DirectedSubgraph2, ...etc) since its too similar to DirectedGraph this object is
 * used to derived DirectedGraph
 */
export type DirectedGraph2 = ObjectWithPrototype<
  BaseDirectedGraph2,
  DirectedGraph2Prototype
>;

export const { DirectedGraph2Instance } = buildConstructorFunctionWithName(
  'DirectedGraph2Instance',
)<BaseDirectedGraph2, DirectedGraph2Prototype, DirectedGraph2>({
  id: (directedGraph) => {
    return directedGraph.locator.id;
  },
  rootGraphLocator: (directedGraph) => {
    return directedGraph.locator;
  },
  attributeByKey: (directedGraph) => {
    return {
      id: directedGraph.locator.oldId,
      ...directedGraph.inputAttributeByKey,
    };
  },
  isRoot: () => true,
  oldId: (directedGraph) => {
    return directedGraph.locator.oldId;
  },
});
