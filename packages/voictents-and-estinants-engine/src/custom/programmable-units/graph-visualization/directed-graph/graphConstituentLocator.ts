import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { RootGraphLocator } from './rootGraphLocator';
import {
  LocalDirectedGraphElement2Zorn,
  GlobalDirectedGraphElement2Zorn,
} from './types';

type BaseGraphConstituentLocator = {
  // TODO: deprecate "idOverride"
  idOverride?: string;
  rootGraphLocator: RootGraphLocator;
  localZorn: LocalDirectedGraphElement2Zorn;
  parentId: string;
};

type GraphConstituentLocatorPrototype = {
  get isRoot(): false;
  get zorn(): GlobalDirectedGraphElement2Zorn;
  get id(): string;
};

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
    zorn: (locator) => {
      return new GlobalDirectedGraphElement2Zorn({
        root: locator.rootGraphLocator.zorn,
        local: locator.localZorn,
      });
    },
    id: (locator) => {
      return locator.idOverride ?? locator.localZorn.forMachine;
    },
  });
