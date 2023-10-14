import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../adapter/identifiable-item/identifiableItem';
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
import { GraphConstituentLocatorInstance } from '../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { LocalDirectedGraphElement2Zorn } from '../../programmable-units/graph-visualization/directed-graph/types';
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
  .andFromHubblepupTuple2<EngineVoque2Voque, [OdeshinZorn]>({
    collectionId: ENGINE_VOQUE_2_GEPP,
    getRightKeyTuple: (relationship) => [relationship.item.voqueLocator.zorn],
    getRightKey: (engineVoque) => engineVoque.item.locator.zorn,
  })
  .toItem2<DirectedGraphElement2Voque>({
    collectionId: DIRECTED_GRAPH_ELEMENT_2_GEPP,
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
        localZorn: LocalDirectedGraphElement2Zorn.buildNodeZorn({
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
