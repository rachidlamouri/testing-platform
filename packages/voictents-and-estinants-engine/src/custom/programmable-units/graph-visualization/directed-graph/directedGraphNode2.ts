import { PartialNodeAttributeByKey } from './directedGraphNode';
import { RootGraphLocator } from './rootGraphLocator';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';

type BaseDirectedGraphNode2 = {
  zorn2?: string;
  attributeByKey: PartialNodeAttributeByKey;
  rootGraphLocator: RootGraphLocator;
  parentId: string;
};

type DirectedGraphNode2Prototype = {
  get zorn(): string;
  get id(): string;
};

export type DirectedGraphNode2 = ObjectWithPrototype<
  BaseDirectedGraphNode2,
  DirectedGraphNode2Prototype
>;

export const { DirectedGraphNode2Instance } = buildConstructorFunctionWithName(
  'DirectedGraphNode2Instance',
)<BaseDirectedGraphNode2, DirectedGraphNode2Prototype, DirectedGraphNode2>({
  zorn: (directedNode) => {
    return (
      directedNode.zorn2 ??
      getZorn([directedNode.rootGraphLocator.zorn, directedNode.id])
    );
  },
  id: (directedNode) => {
    return directedNode.attributeByKey.id;
  },
});
