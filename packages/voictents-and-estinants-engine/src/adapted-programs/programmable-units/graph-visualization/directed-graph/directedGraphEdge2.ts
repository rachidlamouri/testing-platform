import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/deprecated-constructor-function/buildConstructorFunction';
import { PartialEdgeAttributeByKey } from './directedGraphEdge';
import {
  GraphConstituentLocator,
  GraphConstituentLocatorInstance,
} from './graphConstituentLocator';
import { RootGraphLocator } from './rootGraphLocator';
import {
  GlobalDirectedGraphElement2Zorn,
  LocalDirectedGraphElement2Zorn,
} from './types';

type BaseDirectedGraphEdge2 = {
  attributeByKey?: Omit<PartialEdgeAttributeByKey, 'id'>;
  tailId: string;
  headId: string;
  rootGraphLocator: RootGraphLocator;
};

type DirectedGraphEdge2Prototype = {
  get zorn(): GlobalDirectedGraphElement2Zorn;
  get id(): string;
  get locator(): GraphConstituentLocator;
};

export type DirectedGraphEdge2 = ObjectWithPrototype<
  BaseDirectedGraphEdge2,
  DirectedGraphEdge2Prototype
>;

export const { DirectedGraphEdge2Instance } = buildConstructorFunctionWithName(
  'DirectedGraphEdge2Instance',
)<BaseDirectedGraphEdge2, DirectedGraphEdge2Prototype, DirectedGraphEdge2>({
  zorn: (directedEdge) => {
    return directedEdge.locator.zorn;
  },
  id: (directedEdge) => {
    // TODO: get rid of this colon delimited id pattern when "interactiveSvg.html" no longer exists
    return `${directedEdge.tailId}:${directedEdge.headId}`;
  },
  locator: (directedEdge) => {
    return new GraphConstituentLocatorInstance({
      idOverride: directedEdge.id,
      rootGraphLocator: directedEdge.rootGraphLocator,
      parentId: directedEdge.rootGraphLocator.id,
      localZorn: LocalDirectedGraphElement2Zorn.buildEdgeZorn({
        distinguisher: directedEdge.id,
      }),
    });
  },
});
