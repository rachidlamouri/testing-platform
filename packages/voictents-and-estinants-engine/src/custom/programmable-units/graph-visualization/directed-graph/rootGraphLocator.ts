import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';

export type BaseRootGraphLocator = {
  id: string;
  debugName: string;
};

export type RootGraphLocatorPrototype = {
  get zorn(): string;
};

export type RootGraphLocator = ObjectWithPrototype<
  BaseRootGraphLocator,
  RootGraphLocatorPrototype
>;

export const { RootGraphLocatorInstance } = buildConstructorFunctionWithName(
  'RootGraphLocatorInstance',
)<BaseRootGraphLocator, RootGraphLocatorPrototype>({
  zorn: (locator) => {
    return getZorn([locator.id, locator.debugName]);
  },
});
