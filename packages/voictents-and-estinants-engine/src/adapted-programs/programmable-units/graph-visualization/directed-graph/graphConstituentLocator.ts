import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { RootGraphLocator } from './rootGraphLocator';
import {
  LocalDirectedGraphElement2Id,
  GlobalDirectedGraphElement2Zorn,
} from './types';

type BaseGraphConstituentLocator = {
  // TODO: deprecate "idOverride"
  idOverride?: string;
  rootGraphLocator: RootGraphLocator;
  localId: LocalDirectedGraphElement2Id;
  parentId: string;
};

type GraphConstituentLocatorPrototype = {
  get isRoot(): false;
  get id(): GlobalDirectedGraphElement2Zorn;
  get oldId(): string;
};

/**
 * The information needed to associate a subobject of a directed graph to the
 * directed graph itself and to the parent object within the directed graph (which
 * could be the graph itself for top level objects)
 */
export type GraphConstituentLocator = ObjectWithPrototype<
  BaseGraphConstituentLocator,
  GraphConstituentLocatorPrototype
>;

export const { GraphConstituentLocatorInstance } =
  buildConstructorFunctionWithName('GraphConstituentLocatorInstance')<
    BaseGraphConstituentLocator,
    GraphConstituentLocatorPrototype,
    GraphConstituentLocator
  >({
    isRoot: () => false,
    id: (locator) => {
      return new GlobalDirectedGraphElement2Zorn({
        root: locator.rootGraphLocator.id,
        local: locator.localId,
      });
    },
    oldId: (locator) => {
      return locator.idOverride ?? locator.localId.forMachine;
    },
  });
