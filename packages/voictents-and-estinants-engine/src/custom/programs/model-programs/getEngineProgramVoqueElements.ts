import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_VOQUE_2_GEPP,
  EngineVoque2Voque,
} from '../../programmable-units/engine-program/engineVoque2';
import {
  PROGRAM_VOQUE_RELATIONSHIP_2_GEPP,
  ProgramVoqueRelationship2Voque,
} from '../../programmable-units/engine-program/programVoqueRelationship2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { NodeShape } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode';
import { DirectedGraphNode2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { COMMON_ATTRIBUTE_BY_KEY } from '../../programmable-units/type-script-file-relationships/graph-element/commonAttributeByKey';

/**
 * Gets directed graph elements for collection meta types and their
 * corresponding collections and collection items
 */
export const getEngineProgramVoqueElements = buildEstinant({
  name: 'getEngineProgramVoqueElements',
})
  .fromHubblepup2<ProgramVoqueRelationship2Voque>({
    gepp: PROGRAM_VOQUE_RELATIONSHIP_2_GEPP,
  })
  .andFromHubblepupTuple2<EngineVoque2Voque, [string]>({
    gepp: ENGINE_VOQUE_2_GEPP,
    framate: (relationship) => [relationship.hubblepup.voqueLocator.zorn],
    croard: (engineVoque) => engineVoque.hubblepup.locator.zorn,
  })
  .toHubblepup2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((relationship, [engineVoque]) => {
    const label =
      engineVoque.displayName === 'GenericProgramError'
        ? 'ProgramError'
        : engineVoque.displayName;

    const node = new DirectedGraphNode2Instance({
      attributeByKey: {
        id: engineVoque.id,
        label,
        shape: NodeShape.Box,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
      rootGraphLocator: relationship.rootGraphLocator,
      parentId: relationship.parentId,
    });

    return node;
  })
  .assemble();
