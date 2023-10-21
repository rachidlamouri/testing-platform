import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { EngineProgrammedTransformLocator2 } from './engineProgrammedTransformLocator2';
import { getExportLocatorId } from '../type-script-file/getExportLocatorId';
import { getIdentifiableId } from '../../../layer-agnostic-utilities/deprecated-id/getIdentifiableId';
import { EngineProgrammedTransformInput2 } from './input-output/engineProgrammedTransformInput2';
import { EngineProgrammedTransformOutput2 } from './input-output/engineProgrammedTransformOutput2';
import { isNotNull } from '../../../package-agnostic-utilities/nil/isNotNull';
import { EngineStreamMetatypeLocator2 } from './engineStreamMetatypeLocator2';

type BaseEngineProgrammedTransform3 = {
  programmedTransformName: string;
  filePath: string;
  identifierName: string;
  commentText: string;
  inputList: EngineProgrammedTransformInput2[];
  outputList: EngineProgrammedTransformOutput2[];
  locator: EngineProgrammedTransformLocator2;
};

type EngineProgrammedTransform3Prototype = {
  get id(): string;
  get digestibleId(): string;
  get allStreamMetatypeLocatorList(): EngineStreamMetatypeLocator2[];
};

/**
 * Represents a transform for the program modeler
 *
 * @readableName ProgrammedTransformModel
 */
export type EngineProgrammedTransform3 = ObjectWithPrototype<
  BaseEngineProgrammedTransform3,
  EngineProgrammedTransform3Prototype
>;

export const { EngineProgrammedTransform3Instance } =
  buildConstructorFunctionWithName('EngineEstinant3Instance')<
    BaseEngineProgrammedTransform3,
    EngineProgrammedTransform3Prototype
  >({
    id: getExportLocatorId,
    digestibleId: getIdentifiableId,
    allStreamMetatypeLocatorList: (engineProgrammedTransform) => {
      const list = [
        ...engineProgrammedTransform.inputList,
        ...engineProgrammedTransform.outputList,
      ]
        .map((inputOutput) => {
          return inputOutput.streamMetatypeLocator ?? null;
        })
        .filter(isNotNull);

      return list;
    },
  });

export const ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID = 'engine-estinant-3';

type EngineProgrammedTransform3CollectionId =
  typeof ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID;

export type EngineProgrammedTransform3StreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    EngineProgrammedTransform3CollectionId,
    EngineProgrammedTransform3
  >;
