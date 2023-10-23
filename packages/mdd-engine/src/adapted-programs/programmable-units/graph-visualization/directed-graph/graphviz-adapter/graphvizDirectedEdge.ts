import { PartialEdgeAttributeByKey } from '../directedGraphEdge';
import { DirectedEdge } from '../element/directedEdge';
import {
  EdgeRelationshipStatement,
  EdgeStatement,
  getAttributeStatementList,
  joinAttributeListSingleLine,
  quote,
} from './codeUtilities';

/**
 * Encodable Graphviz directed edge object
 */
export class GraphvizDirectedEdge {
  sourceEdge: DirectedEdge;

  attributeByKey: PartialEdgeAttributeByKey;

  constructor(sourceEdge: DirectedEdge) {
    this.sourceEdge = sourceEdge;
    this.attributeByKey = {
      id: sourceEdge.localIdDigest,
      ...sourceEdge.attributeByKey,
    };
  }

  getCode(): EdgeStatement {
    const attributeStatementList = getAttributeStatementList(
      this.sourceEdge.attributeByKey,
    );

    const attributeListStatement = joinAttributeListSingleLine(
      attributeStatementList,
    );

    const quotedTailId = quote(this.sourceEdge.tail.localIdDigest);
    const quotedHeadId = quote(this.sourceEdge.head.localIdDigest);
    const edgeRelationshipStatement: EdgeRelationshipStatement = `${quotedTailId} -> ${quotedHeadId}`;

    const edgeStatement: EdgeStatement = `${edgeRelationshipStatement} ${attributeListStatement}`;
    return edgeStatement;
  }
}
