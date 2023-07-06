import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { PartialEdgeAttributeByKey } from './directedGraphEdge';
import { RootGraphLocator } from './rootGraphLocator';

type BaseDirectedGraphEdge2 = {
  attributeByKey?: Omit<PartialEdgeAttributeByKey, 'id'>;
  tailId: string;
  headId: string;
  rootGraphLocator: RootGraphLocator;
};

type DirectedGraphEdge2Prototype = {
  get zorn(): string;
  get id(): string;
};

export type DirectedGraphEdge2 = ObjectWithPrototype<
  BaseDirectedGraphEdge2,
  DirectedGraphEdge2Prototype
>;

export const { DirectedGraphEdge2Instance } = buildConstructorFunctionWithName(
  'DirectedGraphEdge2Instance',
)<BaseDirectedGraphEdge2, DirectedGraphEdge2Prototype, DirectedGraphEdge2>({
  zorn: (directedEdge) => {
    return getZorn([directedEdge.rootGraphLocator.zorn, directedEdge.id]);
  },
  id: (directedEdge) => {
    return `${directedEdge.tailId}:${directedEdge.headId}`;
  },
});
