import { PartialNodeAttributeByKey } from './directedGraphNode';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { GraphConstituentLocator } from './graphConstituentLocator';
import { GlobalDirectedGraphElement2Id } from './types';
import { RootGraphLocator } from './rootGraphLocator';

type BaseDirectedGraphNode2 = {
  locator: GraphConstituentLocator;
  inputAttributeByKey: Omit<PartialNodeAttributeByKey, 'id'>;
};

type DirectedGraphNode2Prototype = {
  get id(): GlobalDirectedGraphElement2Id;
  get oldId(): string;
  get parentId(): string;
  get rootGraphLocator(): RootGraphLocator;
  get attributeByKey(): PartialNodeAttributeByKey;
};

/**
 * Represents a Graphviz node object. The rootGraphLocator allows this object to
 * be assembled into a complete graph.
 */
export type DirectedGraphNode2 = ObjectWithPrototype<
  BaseDirectedGraphNode2,
  DirectedGraphNode2Prototype
>;

export const { DirectedGraphNode2Instance } = buildConstructorFunctionWithName(
  'DirectedGraphNode2Instance',
)<BaseDirectedGraphNode2, DirectedGraphNode2Prototype, DirectedGraphNode2>({
  id: (directedNode) => {
    return directedNode.locator.id;
  },
  oldId: (directedNode) => {
    return directedNode.locator.oldId;
  },
  parentId: (directedNode) => {
    return directedNode.locator.parentId;
  },
  rootGraphLocator: (directedNode) => {
    return directedNode.locator.rootGraphLocator;
  },
  attributeByKey: (directedNode) => {
    return {
      id: directedNode.oldId,
      ...directedNode.inputAttributeByKey,
    };
  },
});
