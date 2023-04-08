// import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
// import { DirectedGraphStyle } from '../../graph-visualization/directed-graph/directedGraph';
// import {
//   BOUNDARY_CONFIGURATION_GEPP,
//   BoundaryConfigurationVoictent,
// } from '../boundaryConfiguration';
// import {
//   BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
//   BoundarySubgraphAttributeByKeyVoictent,
// } from './boundarySubgraphAttributeByKey';
// import { COMMON_ATTRIBUTE_BY_KEY, FONT_SIZE } from './commonAttributeByKey';

// export const getBoundarySubgraphAttributeByKey = buildEstinant({
//   name: 'getBoundarySubgraphAttributeByKey',
// })
//   .fromGrition<BoundaryConfigurationVoictent>({
//     gepp: BOUNDARY_CONFIGURATION_GEPP,
//   })
//   .toGrition<BoundarySubgraphAttributeByKeyVoictent>({
//     gepp: BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
//     getZorn: (leftInput) => leftInput.zorn,
//   })
//   .onPinbe((boundary) => {
//     return {
//       id: boundary.instanceId,
//       label: boundary.directoryPath,
//       fontsize: FONT_SIZE.boundary,
//       style: DirectedGraphStyle.Bold,

//       ...COMMON_ATTRIBUTE_BY_KEY,
//     };
//   })
//   .assemble();
