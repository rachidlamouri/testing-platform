import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getFileZorn } from '../../../utilities/getFileZorn';
import { getZornableId } from '../../../utilities/getZornableId';
import {
  RootGraphLocator,
  RootGraphLocatorInstance,
} from '../graph-visualization/directed-graph/rootGraphLocator';

type BasePartialEngineProgramLocator2 = {
  programName: string;
  filePath: string;
};

type EngineProgramLocator2Prototype = {
  get zorn(): string;
  get id(): string;
  get rootGraphLocator(): RootGraphLocator;
};

type PartialEngineProgramLocator2 = ObjectWithPrototype<
  BasePartialEngineProgramLocator2,
  EngineProgramLocator2Prototype
>;

export const getEngineProgramZorn = getFileZorn;

export const { PartialEngineProgramLocator2Instance } =
  buildConstructorFunctionWithName('PartialEngineProgramLocator2Instance')<
    BasePartialEngineProgramLocator2,
    EngineProgramLocator2Prototype
  >({
    zorn: getEngineProgramZorn,
    id: getZornableId,
    rootGraphLocator: (
      locator: PartialEngineProgramLocator2,
    ): RootGraphLocator => {
      return new RootGraphLocatorInstance({
        idOverride: locator.id,
        distinguisher: locator.programName,
      });
    },
  });
