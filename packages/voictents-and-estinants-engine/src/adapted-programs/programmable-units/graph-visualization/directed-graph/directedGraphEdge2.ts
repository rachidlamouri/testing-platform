import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { PartialEdgeAttributeByKey } from './directedGraphEdge';
import {
  GraphConstituentLocator,
  GraphConstituentLocatorInstance,
} from './graphConstituentLocator';
import { RootGraphLocator } from './rootGraphLocator';
import {
  GlobalDirectedGraphElement2Zorn,
  LocalDirectedGraphElement2Id,
} from './types';

type BaseDirectedGraphEdge2 = {
  attributeByKey?: Omit<PartialEdgeAttributeByKey, 'id'>;
  tailId: string;
  headId: string;
  rootGraphLocator: RootGraphLocator;
};

type DirectedGraphEdge2Prototype = {
  get id(): GlobalDirectedGraphElement2Zorn;
  get oldId(): string;
  get locator(): GraphConstituentLocator;
};

/**
 * Represents the information needed to build a Graphviz edge. The
 * rootGraphLocator allows this object to be assembled into a complete graph.
 */
export type DirectedGraphEdge2 = ObjectWithPrototype<
  BaseDirectedGraphEdge2,
  DirectedGraphEdge2Prototype
>;

export const { DirectedGraphEdge2Instance } = buildConstructorFunctionWithName(
  'DirectedGraphEdge2Instance',
)<BaseDirectedGraphEdge2, DirectedGraphEdge2Prototype, DirectedGraphEdge2>({
  id: (directedEdge) => {
    return directedEdge.locator.id;
  },
  oldId: (directedEdge) => {
    // TODO: get rid of this colon delimited id pattern when "interactiveSvg.html" no longer exists
    return `${directedEdge.tailId}:${directedEdge.headId}`;
  },
  locator: (directedEdge) => {
    return new GraphConstituentLocatorInstance({
      idOverride: directedEdge.oldId,
      rootGraphLocator: directedEdge.rootGraphLocator,
      parentId: directedEdge.rootGraphLocator.oldId,
      localId: LocalDirectedGraphElement2Id.buildEdgeZorn({
        distinguisher: directedEdge.oldId,
      }),
    });
  },
});
