import { DirectedGraphNode } from '../element/directedGraphNode';
import {
  NodeStatement,
  getAttributeStatementList,
  joinAttributeListSingleLine,
  quote,
} from './codeUtilities';
import { PartialNodeAttributeByKey } from './element-attribute-by-key/partialNodeAttributeByKey';

export class GraphvizDirectedGraphNode {
  sourceNode: DirectedGraphNode;

  attributeByKey: PartialNodeAttributeByKey;

  constructor(sourceNode: DirectedGraphNode) {
    this.sourceNode = sourceNode;
    this.attributeByKey = {
      id: sourceNode.localIdDigest,
      ...sourceNode.inputAttributeByKey,
    };
  }

  getCode(): NodeStatement {
    const attributeStatementList = getAttributeStatementList(
      this.attributeByKey,
    );

    const attributeListStatement = joinAttributeListSingleLine(
      attributeStatementList,
    );

    const quotedId = quote(this.attributeByKey.id);
    const nodeStatement: NodeStatement = `${quotedId} ${attributeListStatement}`;
    return nodeStatement;
  }
}
