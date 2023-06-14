import { getZorn } from '../../../utilities/getZorn';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_VOQUE_GEPP,
  EngineVoqueVoque,
} from '../../programmable-units/engine-program/engineVoque';
import {
  PROGRAM_RELATIONSHIP_GEPP,
  ProgramRelationshipVoque,
} from '../../programmable-units/engine-program/programRelationship';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { NodeShape } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode';
import { DirectedGraphNode2 } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { COMMON_ATTRIBUTE_BY_KEY } from '../../programmable-units/type-script-file-relationships/graph-element/commonAttributeByKey';

export const getEngineProgramVoqueElements = buildEstinant({
  name: 'getEngineProgramVoqueElements',
})
  .fromHubblepup2<ProgramRelationshipVoque>({
    gepp: PROGRAM_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<EngineVoqueVoque, [string]>({
    gepp: ENGINE_VOQUE_GEPP,
    framate: (relationship) => [relationship.hubblepup.relatedZorn],
    croard: (voqueLocator) => voqueLocator.hubblepup.zorn,
  })
  .toHubblepup2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((relationship, [engineVoque]) => {
    if (relationship.parentId === undefined) {
      throw Error('parentId is required');
    }

    const label =
      engineVoque.displayName === 'GenericProgramError'
        ? 'ProgramError'
        : engineVoque.displayName;

    const node: DirectedGraphNode2 = {
      zorn: getZorn([
        relationship.rootGraphLocator.debugName,
        engineVoque.displayName,
      ]),
      attributeByKey: {
        id: engineVoque.id,
        label,
        shape: NodeShape.Box,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
      rootGraphLocator: relationship.rootGraphLocator,
      parentId: relationship.parentId,
    };

    return node;
  })
  .assemble();
