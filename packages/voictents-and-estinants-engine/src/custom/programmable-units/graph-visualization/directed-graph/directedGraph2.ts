import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { PartialGraphAttributeByKey } from './directedGraph';
import { RootGraphLocator } from './rootGraphLocator';

type BaseDirectedGraph2 = {
  isCluster?: never;
  attributeByKey: PartialGraphAttributeByKey;
  rankGroupList?: never;
  rootGraphLocator: RootGraphLocator;
};

type DirectedGraph2Prototype = {
  get zorn(): string;
  get id(): string;
  get isRoot(): true;
};

export type DirectedGraph2 = ObjectWithPrototype<
  BaseDirectedGraph2,
  DirectedGraph2Prototype
>;

export const { DirectedGraph2Instance } = buildConstructorFunctionWithName(
  'DirectedGraph2Instance',
)<BaseDirectedGraph2, DirectedGraph2Prototype>({
  zorn: (directedGraph) => {
    return getZorn([directedGraph.rootGraphLocator.zorn, directedGraph.id]);
  },
  id: (directedGraph) => {
    return directedGraph.attributeByKey.id;
  },
  isRoot: () => true,
});
