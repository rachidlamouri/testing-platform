import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';
import { getExportLocatorZorn } from '../type-script-file/getExportLocatorZorn';
import { getIdentifiableId } from '../../../layer-agnostic-utilities/deprecated-id/getIdentifiableId';
import { EngineEstinantInput2 } from './input-output/engineEstinantInput2';
import { EngineEstinantOutput2 } from './input-output/engineEstinantOutput2';
import { isNotNull } from '../../../package-agnostic-utilities/nil/isNotNull';
import { EngineVoqueLocator2 } from './engineVoqueLocator2';

type BaseEngineEstinant3 = {
  programmedTransformName: string;
  filePath: string;
  identifierName: string;
  commentText: string;
  inputList: EngineEstinantInput2[];
  outputList: EngineEstinantOutput2[];
  locator: EngineEstinantLocator2;
};

type EngineEstinant3Prototype = {
  get id(): string;
  get digestibleId(): string;
  get allVoqueLocatorList(): EngineVoqueLocator2[];
};

/**
 * Represents a transform for the program modeler
 *
 * @readableName ProgrammedTransformModel
 */
export type EngineEstinant3 = ObjectWithPrototype<
  BaseEngineEstinant3,
  EngineEstinant3Prototype
>;

export const { EngineEstinant3Instance } = buildConstructorFunctionWithName(
  'EngineEstinant3Instance',
)<BaseEngineEstinant3, EngineEstinant3Prototype>({
  id: getExportLocatorZorn,
  digestibleId: getIdentifiableId,
  allVoqueLocatorList: (engineEstinant) => {
    const list = [...engineEstinant.inputList, ...engineEstinant.outputList]
      .map((inputOutput) => {
        return inputOutput.streamMetatypeLocator ?? null;
      })
      .filter(isNotNull);

    return list;
  },
});

export const ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID = 'engine-estinant-3';

type EngineEstinant3Gepp = typeof ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID;

export type EngineProgrammedTransform3StreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    EngineEstinant3Gepp,
    EngineEstinant3
  >;
