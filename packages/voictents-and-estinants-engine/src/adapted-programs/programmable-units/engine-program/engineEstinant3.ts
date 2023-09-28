import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';
import { getExportLocatorZorn } from '../type-script-file/getExportLocatorZorn';
import { getZornableId } from '../../../layer-agnostic-utilities/deprecated-zorn/getZornableId';
import { EstinantInput2 } from './input-output/engineEstinantInput2';
import { EstinantOutput2 } from './input-output/engineEstinantOutput2';
import { isNotNull } from '../../../package-agnostic-utilities/nil/isNotNull';
import { EngineVoqueLocator2 } from './engineVoqueLocator2';

type BaseEngineEstinant3 = {
  estinantName: string;
  filePath: string;
  identifierName: string;
  commentText: string;
  inputList: EstinantInput2[];
  outputList: EstinantOutput2[];
  locator: EngineEstinantLocator2;
};

type EngineEstinant3Prototype = {
  get zorn(): string;
  get id(): string;
  get allVoqueLocatorList(): EngineVoqueLocator2[];
};

/**
 * Represents a transform for the program modeler
 */
export type EngineEstinant3 = ObjectWithPrototype<
  BaseEngineEstinant3,
  EngineEstinant3Prototype
>;

export const { EngineEstinant3Instance } = buildConstructorFunctionWithName(
  'EngineEstinant3Instance',
)<BaseEngineEstinant3, EngineEstinant3Prototype>({
  zorn: getExportLocatorZorn,
  id: getZornableId,
  allVoqueLocatorList: (engineEstinant) => {
    const list = [...engineEstinant.inputList, ...engineEstinant.outputList]
      .map((inputOutput) => {
        return inputOutput.voqueLocator ?? null;
      })
      .filter(isNotNull);

    return list;
  },
});

export const ENGINE_ESTINANT_3_GEPP = 'engine-estinant-3';

type EngineEstinant3Gepp = typeof ENGINE_ESTINANT_3_GEPP;

export type EngineEstinant3Voque = InMemoryOdeshin2ListVoque<
  EngineEstinant3Gepp,
  EngineEstinant3
>;
