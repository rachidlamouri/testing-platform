import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
// import { getZorn } from '../../../../utilities/getZorn';
import { PartialClusterAttributeByKey } from './directedSubgraph';
import { RootGraphLocator } from './rootGraphLocator';

type BaseDirectedCluster2 = {
  // TODO: replace debug name with zorn
  zorn: string;
  attributeByKey: PartialClusterAttributeByKey;
  rankGroupList?: never;
  rootGraphLocator: RootGraphLocator;
  parentId: string;
  debugName?: string;
};

type DirectedCluster2Prototype = {
  // get zorn(): string;
  get id(): string;
  get isRoot(): false;
  get isCluster(): true;
};

export type DirectedCluster2 = ObjectWithPrototype<
  BaseDirectedCluster2,
  DirectedCluster2Prototype
>;

export const { DirectedCluster2Instance } = buildConstructorFunctionWithName(
  'DirectedCluster2Instance',
)<BaseDirectedCluster2, DirectedCluster2Prototype, DirectedCluster2>({
  // zorn: (directedCluster) => {
  //   return getZorn([directedCluster.rootGraphLocator.zorn, directedCluster.id]);
  // },
  id: (directedSubgraph) => {
    return directedSubgraph.attributeByKey.id;
  },
  isRoot: () => false,
  isCluster: () => true,
});
