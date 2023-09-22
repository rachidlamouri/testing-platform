import { PartialNodeAttributeByKey } from './directedGraphNode';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { GraphConstituentLocator } from './graphConstituentLocator';
import { GlobalDirectedGraphElement2Zorn } from './types';
import { RootGraphLocator } from './rootGraphLocator';

type BaseDirectedGraphNode2 = {
  locator: GraphConstituentLocator;
  inputAttributeByKey: Omit<PartialNodeAttributeByKey, 'id'>;
};

type DirectedGraphNode2Prototype = {
  get zorn(): GlobalDirectedGraphElement2Zorn;
  get id(): string;
  get parentId(): string;
  get rootGraphLocator(): RootGraphLocator;
  get attributeByKey(): PartialNodeAttributeByKey;
};

export type DirectedGraphNode2 = ObjectWithPrototype<
  BaseDirectedGraphNode2,
  DirectedGraphNode2Prototype
>;

export const { DirectedGraphNode2Instance } = buildConstructorFunctionWithName(
  'DirectedGraphNode2Instance',
)<BaseDirectedGraphNode2, DirectedGraphNode2Prototype, DirectedGraphNode2>({
  zorn: (directedNode) => {
    return directedNode.locator.zorn;
  },
  id: (directedNode) => {
    return directedNode.locator.id;
  },
  parentId: (directedNode) => {
    return directedNode.locator.parentId;
  },
  rootGraphLocator: (directedNode) => {
    return directedNode.locator.rootGraphLocator;
  },
  attributeByKey: (directedNode) => {
    return {
      id: directedNode.id,
      ...directedNode.inputAttributeByKey,
    };
  },
});
