import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { LabelLocation } from '../../graph-visualization/directed-graph/attribute';
import {
  DirectedGraphVoictent,
  DIRECTED_GRAPH_GEPP,
  DirectedGraph,
  DirectedGraphRankDirection,
} from '../../graph-visualization/directed-graph/directedGraph';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/directedGraphNode';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import { COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';
import {
  FileNodeAttributeByKeyVoictent,
  FILE_NODE_ATTRIBUTE_BY_KEY_GEPP,
} from './fileNodeAttributeByKey';

export const getRootDirectedGraph = buildEstinant({
  name: 'getRootDirectedGraph',
})
  .fromOdeshinVoictent<FileNodeAttributeByKeyVoictent>({
    gepp: FILE_NODE_ATTRIBUTE_BY_KEY_GEPP,
  })
  .toHubblepup<DirectedGraphVoictent>({
    gepp: DIRECTED_GRAPH_GEPP,
  })
  .onPinbe(
    (
      fileNodeAttributeByKeyList,
      // TODO: add more inputs
    ) => {
      const root: DirectedGraph = {
        isRoot: true,
        attributeByKey: {
          label: 'Root',
          rankdir: DirectedGraphRankDirection.LeftRight,
          labelloc: LabelLocation.Top,
          fontsize: 36,
          ...COMMON_ATTRIBUTE_BY_KEY,
        },
        nodeList: [],
        edgeList: [],
        subgraphList: [],
      };

      const nodeList = fileNodeAttributeByKeyList.map((attributeByKey) => {
        const node: DirectedGraphNode = {
          attributeByKey,
        };

        return node;
      });

      root.nodeList = nodeList;

      return {
        zorn: TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
        grition: root,
      };
    },
  )
  .assemble();
