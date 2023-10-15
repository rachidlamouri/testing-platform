import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import {
  LocalDirectedGraphElement2Id,
  RootDirectedGraphElement2Id,
} from './types';

type BaseRootGraphLocator = {
  // // TODO: deprecate "idOverride"
  idOverride?: string;
  distinguisher: string;
};

type RootGraphLocatorPrototype = {
  get isRoot(): true;
  get id(): RootDirectedGraphElement2Id;
  get localId(): LocalDirectedGraphElement2Id;
  get oldId(): string;
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
  id: (locator) => {
    return RootDirectedGraphElement2Id.build({
      distinguisher: locator.distinguisher,
    });
  },
  localId: (locator) => {
    return locator.id;
  },
  oldId: (locator) => {
    return locator.idOverride ?? locator.id.forMachine;
  },
  rootLocator: (locator) => {
    return locator;
  },
});
