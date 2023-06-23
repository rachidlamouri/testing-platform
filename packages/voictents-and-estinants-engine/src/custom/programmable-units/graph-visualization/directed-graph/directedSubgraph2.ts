import { PartialSubgraphAttributeByKey } from './directedSubgraph';
import { RootGraphLocator } from './rootGraphLocator';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';

type BaseDirectedSubgraph2 = {
  zorn: string;
  attributeByKey: PartialSubgraphAttributeByKey;
  rankGroupList?: string[][];
  rootGraphLocator: RootGraphLocator;
  parentId: string;
  debugName: string;
};

type DirectedSubgraph2Prototype = {
  // get zorn(): string;
  get id(): string;
  get isRoot(): false;
  get isCluster(): false;
};

export type DirectedSubgraph2 = ObjectWithPrototype<
  BaseDirectedSubgraph2,
  DirectedSubgraph2Prototype
>;

export const { DirectedSubgraph2Instance } = buildConstructorFunctionWithName(
  'DirectedSubgraph2Instance',
)<BaseDirectedSubgraph2, DirectedSubgraph2Prototype>({
  // zorn: (directedSubgraph) => {
  //   return getZorn([
  //     directedSubgraph.rootGraphLocator.zorn,
  //     directedSubgraph.id,
  //   ]);
  // },
  id: (directedSubgraph) => {
    return directedSubgraph.attributeByKey.id;
  },
  isRoot: () => false,
  isCluster: () => false,
});
