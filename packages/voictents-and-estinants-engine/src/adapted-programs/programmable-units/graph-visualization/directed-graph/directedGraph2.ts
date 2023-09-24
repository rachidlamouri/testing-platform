import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/deprecated-constructor-function/buildConstructorFunction';
import { PartialGraphAttributeByKey } from './directedGraph';
import { RootGraphLocator } from './rootGraphLocator';
import { RootDirectedGraphElement2Zorn } from './types';

type BaseDirectedGraph2 = {
  locator: RootGraphLocator;
  isCluster?: never;
  inputAttributeByKey: Omit<PartialGraphAttributeByKey, 'id'>;
  rankGroupList?: never;
};

type DirectedGraph2Prototype = {
  get zorn(): RootDirectedGraphElement2Zorn;
  /** @deprecated */
  get rootGraphLocator(): RootGraphLocator;
  get attributeByKey(): PartialGraphAttributeByKey;
  get isRoot(): true;
  get id(): string;
};

export type DirectedGraph2 = ObjectWithPrototype<
  BaseDirectedGraph2,
  DirectedGraph2Prototype
>;

export const { DirectedGraph2Instance } = buildConstructorFunctionWithName(
  'DirectedGraph2Instance',
)<BaseDirectedGraph2, DirectedGraph2Prototype, DirectedGraph2>({
  zorn: (directedGraph) => {
    return directedGraph.locator.zorn;
  },
  rootGraphLocator: (directedGraph) => {
    return directedGraph.locator;
  },
  attributeByKey: (directedGraph) => {
    return {
      id: directedGraph.locator.id,
      ...directedGraph.inputAttributeByKey,
    };
  },
  isRoot: () => true,
  id: (directedGraph) => {
    return directedGraph.locator.id;
  },
});
