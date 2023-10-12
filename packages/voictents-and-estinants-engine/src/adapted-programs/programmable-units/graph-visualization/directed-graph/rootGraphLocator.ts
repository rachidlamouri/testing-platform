import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import {
  LocalDirectedGraphElement2Zorn,
  RootDirectedGraphElement2Zorn,
} from './types';

type BaseRootGraphLocator = {
  // // TODO: deprecate "idOverride"
  idOverride?: string;
  distinguisher: string;
};

type RootGraphLocatorPrototype = {
  get isRoot(): true;
  get zorn(): RootDirectedGraphElement2Zorn;
  get localZorn(): LocalDirectedGraphElement2Zorn;
  get id(): string;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  rootLocator: RootGraphLocator;
};

/**
 * The information needed to find a directed graph. It is used by graph
 * constiuents to tie them all to the same graph.
 */
export type RootGraphLocator = ObjectWithPrototype<
  BaseRootGraphLocator,
  RootGraphLocatorPrototype
>;

export const { RootGraphLocatorInstance } = buildConstructorFunctionWithName(
  'RootGraphLocatorInstance',
)<BaseRootGraphLocator, RootGraphLocatorPrototype, RootGraphLocator>({
  isRoot: () => true,
  zorn: (locator) => {
    return RootDirectedGraphElement2Zorn.build({
      distinguisher: locator.distinguisher,
    });
  },
  localZorn: (locator) => {
    return locator.zorn;
  },
  id: (locator) => {
    return locator.idOverride ?? locator.zorn.forMachine;
  },
  rootLocator: (locator) => {
    return locator;
  },
});
