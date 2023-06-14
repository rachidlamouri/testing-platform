import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_ESTINANT_2_GEPP,
  EngineEstinant2Voque,
} from '../../programmable-units/engine-program/engineEstinant2';
import {
  ENGINE_PROGRAM_2_GEPP,
  EngineProgram2Voque,
} from '../../programmable-units/engine-program/engineProgram2';
import {
  ENGINE_VOQUE_GEPP,
  EngineVoqueVoque,
} from '../../programmable-units/engine-program/engineVoque';
import {
  GRAPH_SOURCE_ELEMENT_BY_ID_GEPP,
  GraphSourceElement,
  GraphSourceElementById,
  GraphSourceElementByIdVoque,
} from './graphSourceElementById';

export const getGraphSourceElementById = buildEstinant({
  name: 'getGraphSourceElementById',
})
  .fromVoictent2<EngineProgram2Voque>({
    gepp: ENGINE_PROGRAM_2_GEPP,
  })
  .andFromVoictent2<EngineVoqueVoque>({
    gepp: ENGINE_VOQUE_GEPP,
  })
  .andFromVoictent2<EngineEstinant2Voque>({
    gepp: ENGINE_ESTINANT_2_GEPP,
  })
  .toHubblepup2<GraphSourceElementByIdVoque>({
    gepp: GRAPH_SOURCE_ELEMENT_BY_ID_GEPP,
  })
  .onPinbe((engineProgramList, engineVoqueList, engineEstinantList) => {
    const entryList = [
      ...engineProgramList.map<[string, GraphSourceElement]>(
        (engineProgram) => {
          return [engineProgram.id, engineProgram];
        },
      ),
      ...engineVoqueList.map<[string, GraphSourceElement]>((engineVoque) => {
        return [engineVoque.id, engineVoque];
      }),
      ...engineEstinantList.map<[string, GraphSourceElement]>(
        (engineEstinant) => {
          return [engineEstinant.id, engineEstinant];
        },
      ),
    ];

    const map: GraphSourceElementById = new Map(entryList);

    return map;
  })
  .assemble();
