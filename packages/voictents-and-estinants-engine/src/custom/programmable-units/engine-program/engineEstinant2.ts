import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';
import { getExportLocatorZorn } from '../type-script-file/getExportLocatorZorn';
import { getZornableId } from '../../../utilities/getZornableId';
import { getZorn } from '../../../utilities/getZorn';
import { EstinantInput2 } from './input-output/engineEstinantInput2';
import { EstinantOutput2 } from './input-output/engineEstinantOutput2';
import { EngineVoqueLocator } from './engineVoqueLocator';
import { isNotNull } from '../../../utilities/isNotNull';

type BaseEngineEstinant2 = {
  estinantName: string;
  filePath: string;
  identifierName: string;
  commentText: string;
  inputList: EstinantInput2[];
  outputList: EstinantOutput2[];
  locator: EngineEstinantLocator2;
};

type EngineEstinant2Prototype = {
  get zorn(): string;
  get id(): string;
  get subgraphId(): string;
  get inputSubgraphId(): string;
  get allVoqueLocatorList(): EngineVoqueLocator[];
};

/**
 * Represents a transform for the program modeler
 */
export type EngineEstinant2 = ObjectWithPrototype<
  BaseEngineEstinant2,
  EngineEstinant2Prototype
>;

export const { EngineEstinant2Instance } = buildConstructorFunctionWithName(
  'EngineEstinant2Instance',
)<BaseEngineEstinant2, EngineEstinant2Prototype>({
  zorn: getExportLocatorZorn,
  id: getZornableId,
  subgraphId: (engineEstinant) => {
    const zorn = getZorn(['subgraph', engineEstinant.zorn]);
    return getZornableId({ zorn });
  },
  inputSubgraphId: (engineEstinant) => {
    const zorn = getZorn(['input-subgraph', engineEstinant.zorn]);
    return getZornableId({ zorn });
  },
  allVoqueLocatorList: (engineEstinant) => {
    const list = [...engineEstinant.inputList, ...engineEstinant.outputList]
      .map((inputOutput) => {
        return inputOutput.voqueLocator ?? null;
      })
      .filter(isNotNull);

    return list;
  },
});

export const ENGINE_ESTINANT_2_GEPP = 'engine-estinant-2';

type EngineEstinant2Gepp = typeof ENGINE_ESTINANT_2_GEPP;

export type EngineEstinant2Voque = InMemoryOdeshin2Voque<
  EngineEstinant2Gepp,
  EngineEstinant2
>;
