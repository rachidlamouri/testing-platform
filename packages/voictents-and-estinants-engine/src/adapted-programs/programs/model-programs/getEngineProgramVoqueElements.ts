import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import {
  ENGINE_VOQUE_2_GEPP,
  EngineVoque2Voque,
} from '../../programmable-units/engine-program/engineVoque2';
import {
  PROGRAM_VOQUE_RELATIONSHIP_2_GEPP,
  ProgramVoqueRelationship2Voque,
} from '../../programmable-units/engine-program/programVoqueRelationship2';
import {
  DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID,
  DirectedGraphElement2StreamMetatype,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { NodeShape } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode';
import { DirectedGraphNode2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { GraphConstituentLocatorInstance } from '../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { LocalDirectedGraphElement2Id } from '../../programmable-units/graph-visualization/directed-graph/types';
import { COMMON_ATTRIBUTE_BY_KEY } from '../../programmable-units/type-script-file-relationships/graph-element/commonAttributeByKey';

/**
 * Gets directed graph elements for collection meta types and their
 * corresponding collections and collection items
 *
 * @readableName getStreamMetatypeModelGraphElement
 */
export const getEngineProgramVoqueElements = buildProgrammedTransform({
  name: 'getEngineProgramVoqueElements',
})
  .fromItem2<ProgramVoqueRelationship2Voque>({
    collectionId: PROGRAM_VOQUE_RELATIONSHIP_2_GEPP,
  })
  .andFromItemTuple2<EngineVoque2Voque, [IdentifiableItemId]>({
    collectionId: ENGINE_VOQUE_2_GEPP,
    getRightKeyTuple: (relationship) => [relationship.item.voqueLocator.id],
    getRightKey: (engineVoque) => engineVoque.item.locator.id,
  })
  .toItem2<DirectedGraphElement2StreamMetatype>({
    collectionId: DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID,
  })
  .onTransform((relationship, [engineVoque]) => {
    const label =
      engineVoque.displayName === 'GenericProgramError'
        ? 'ProgramError'
        : engineVoque.displayName;

    const node = new DirectedGraphNode2Instance({
      locator: new GraphConstituentLocatorInstance({
        rootGraphLocator: relationship.rootGraphLocator,
        parentId: relationship.parentId,
        localId: LocalDirectedGraphElement2Id.buildNodeId({
          distinguisher: label,
        }),
      }),
      inputAttributeByKey: {
        label,
        shape: NodeShape.Box,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
    });

    return node;
  })
  .assemble();
