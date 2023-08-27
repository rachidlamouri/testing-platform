import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
  memoizeGetter,
} from '../../../../utilities/buildConstructorFunction';
import {
  Zorn2,
  GenericZorn2Template,
} from '../../../../utilities/semantic-types/zorn';

const ROOT_GRAPH_LOCATOR_ZORN_TEMPLATE = [
  'id',
  'debugName',
] as const satisfies GenericZorn2Template;
type RootGraphLocatorZornTemplate = typeof ROOT_GRAPH_LOCATOR_ZORN_TEMPLATE;
class RootGraphLocatorZorn extends Zorn2<RootGraphLocatorZornTemplate> {
  get rawTemplate(): RootGraphLocatorZornTemplate {
    return ROOT_GRAPH_LOCATOR_ZORN_TEMPLATE;
  }
}

type BaseRootGraphLocator = {
  id: string;
  debugName: string;
};

type RootGraphLocatorPrototype = {
  get zorn(): RootGraphLocatorZorn;
  // get id(): string;
};

export type RootGraphLocator = ObjectWithPrototype<
  BaseRootGraphLocator,
  RootGraphLocatorPrototype
>;

export const { RootGraphLocatorInstance } = buildConstructorFunctionWithName(
  'RootGraphLocatorInstance',
)<BaseRootGraphLocator, RootGraphLocatorPrototype>({
  zorn: memoizeGetter((locator) => {
    return new RootGraphLocatorZorn({
      id: locator.debugName,
      debugName: locator.debugName,
    });
  }),
  // id: (locator) => {
  //   return locator.zorn.forMachine;
  // },
});
