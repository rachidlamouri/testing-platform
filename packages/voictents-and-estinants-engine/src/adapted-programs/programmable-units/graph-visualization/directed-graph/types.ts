/**
 * Directed graph id types
 * @noCanonicalDeclaration
 */

import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';

type FactoryInput = {
  distinguisher: string;
};

const LOCAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE = [
  'elementType',
  // TODO: update the template parent type to allow this to be a string OR an id
  'distinguisher',
] as const satisfies GenericComplexIdTemplate;
type LocalDirectedGraphElement2ZornTemplate =
  typeof LOCAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE;
export class LocalDirectedGraphElement2Id extends ComplexId<LocalDirectedGraphElement2ZornTemplate> {
  static buildSubgraphId({
    distinguisher,
  }: FactoryInput): LocalDirectedGraphElement2Id {
    return new LocalDirectedGraphElement2Id({
      elementType: 'subgraph',
      distinguisher,
    });
  }

  static buildClusterZorn({
    distinguisher,
  }: FactoryInput): LocalDirectedGraphElement2Id {
    return new LocalDirectedGraphElement2Id({
      elementType: 'cluster',
      distinguisher,
    });
  }

  static buildNodeId({
    distinguisher,
  }: FactoryInput): LocalDirectedGraphElement2Id {
    return new LocalDirectedGraphElement2Id({
      elementType: 'node',
      distinguisher,
    });
  }

  static buildEdgeZorn({
    distinguisher,
  }: FactoryInput): LocalDirectedGraphElement2Id {
    return new LocalDirectedGraphElement2Id({
      elementType: 'edge',
      distinguisher,
    });
  }

  get rawTemplate(): LocalDirectedGraphElement2ZornTemplate {
    return LOCAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE;
  }
}

export class RootDirectedGraphElement2Zorn extends LocalDirectedGraphElement2Id {
  static build({ distinguisher }: FactoryInput): RootDirectedGraphElement2Zorn {
    return new RootDirectedGraphElement2Zorn({
      elementType: 'graph',
      distinguisher,
    });
  }
}

const GLOBAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE = [
  ['root', RootDirectedGraphElement2Zorn],
  ['local', LocalDirectedGraphElement2Id],
] as const satisfies GenericComplexIdTemplate;
type GlobalDirectedGraphElement2ZornTemplate =
  typeof GLOBAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE;

export class GlobalDirectedGraphElement2Zorn extends ComplexId<GlobalDirectedGraphElement2ZornTemplate> {
  get rawTemplate(): GlobalDirectedGraphElement2ZornTemplate {
    return GLOBAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE;
  }
}
