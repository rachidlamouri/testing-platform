import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getFileId } from '../../../layer-agnostic-utilities/deprecated-id/getFileId';
import { getIdentifiableId } from '../../../layer-agnostic-utilities/deprecated-id/getIdentifiableId';
import {
  RootGraphLocator,
  RootGraphLocatorInstance,
} from '../graph-visualization/directed-graph/rootGraphLocator';

type BasePartialEngineProgramLocator2 = {
  programName: string;
  filePath: string;
};

type EngineProgramLocator2Prototype = {
  get id(): string;
  get digestibleId(): string;
  get rootGraphLocator(): RootGraphLocator;
};

/**
 * The part of an EngineProgramLocator that is required to build the ProgrammedTransform
 * relationships for the actual EngineProgramLocator
 *
 * @readableName PartialProgramLocator
 */
type PartialEngineProgramLocator2 = ObjectWithPrototype<
  BasePartialEngineProgramLocator2,
  EngineProgramLocator2Prototype
>;

export const getEngineProgramId = getFileId;

export const { PartialEngineProgramLocator2Instance } =
  buildConstructorFunctionWithName('PartialEngineProgramLocator2Instance')<
    BasePartialEngineProgramLocator2,
    EngineProgramLocator2Prototype
  >({
    id: getEngineProgramId,
    digestibleId: getIdentifiableId,
    rootGraphLocator: (
      locator: PartialEngineProgramLocator2,
    ): RootGraphLocator => {
      return new RootGraphLocatorInstance({
        idOverride: locator.digestibleId,
        distinguisher: locator.programName,
      });
    },
  });
