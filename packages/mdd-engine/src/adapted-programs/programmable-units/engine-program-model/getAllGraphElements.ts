import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  DIRECTED_GRAPH_ELEMENT_COLLECTION_ID,
  DirectedGraphElementStreamMetatype,
} from '../graph-visualization/directed-graph/element/directedGraphElement';
import {
  PROGRAM_MODEL_COLLECTION_ID,
  ProgramModelStreamMetatype,
} from './program/programModel';

/**
 * Assembles all graph elements for all program models
 */
export const getAllGraphElements = buildProgrammedTransform({
  name: 'getAllGraphElements',
})
  // TODO: get the graph from the program model, not from the skeleton
  .fromCollection2<ProgramModelStreamMetatype>({
    collectionId: PROGRAM_MODEL_COLLECTION_ID,
  })
  .toItemTuple2<DirectedGraphElementStreamMetatype>({
    collectionId: DIRECTED_GRAPH_ELEMENT_COLLECTION_ID,
  })
  .onTransform((programModelCollection) => {
    return [
      ...programModelCollection.list.flatMap((model) => model.graphElementList),
    ];
  })
  .assemble();
