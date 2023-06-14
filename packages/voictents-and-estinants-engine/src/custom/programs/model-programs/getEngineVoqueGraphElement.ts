// import { getZorn } from '../../../utilities/getZorn';
// import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
// import {
//   ENGINE_PROGRAM_2_GEPP,
//   EngineProgram2Voque,
// } from '../../programmable-units/engine-program/engineProgram2';
// import {
//   DIRECTED_GRAPH_ELEMENT_2_GEPP,
//   DirectedGraphElement2Voque,
// } from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
// import { NodeShape } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode';
// import { DirectedGraphNode2 } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
// import { COMMON_ATTRIBUTE_BY_KEY } from '../../programmable-units/type-script-file-relationships/graph-element/commonAttributeByKey';

// export const getEngineVoqueGraphElement = buildEstinant({
//   name: 'getEngineVoqueGraphElement',
// })
//   .fromHubblepup2<EngineProgram2Voque>({
//     gepp: ENGINE_PROGRAM_2_GEPP,
//   })
//   .toHubblepupTuple2<DirectedGraphElement2Voque>({
//     gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
//   })
//   .onPinbe((engineProgram) => {
//     const voqueNodeList = engineProgram.allVoqueList.map((voque) => {
//       const node: DirectedGraphNode2 = {
//         zorn: getZorn([engineProgram.programName, voque.displayName]),
//         attributeByKey: {
//           id: voque.id,
//           label: voque.displayName,
//           shape: NodeShape.Box,
//           ...COMMON_ATTRIBUTE_BY_KEY,
//         },
//         rootGraphLocator: engineProgram.locator.rootGraphLocator,
//         parentId: engineProgram.id,
//       };

//       return node;
//     });

//     return voqueNodeList;
//   })
//   .assemble();
