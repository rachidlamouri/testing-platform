import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';

type BaseRootGraphLocator = {
  id: string;
  debugName: string;
};

type RootGraphLocatorPrototype = {
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
