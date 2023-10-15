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

const LOCAL_DIRECTED_GRAPH_ELEMENT_2_ID_TEMPLATE = [
  'elementType',
  // TODO: update the template parent type to allow this to be a string OR an id
  'distinguisher',
] as const satisfies GenericComplexIdTemplate;
type LocalDirectedGraphElement2IdTemplate =
  typeof LOCAL_DIRECTED_GRAPH_ELEMENT_2_ID_TEMPLATE;
export class LocalDirectedGraphElement2Id extends ComplexId<LocalDirectedGraphElement2IdTemplate> {
  static buildSubgraphId({
    distinguisher,
  }: FactoryInput): LocalDirectedGraphElement2Id {
    return new LocalDirectedGraphElement2Id({
      elementType: 'subgraph',
      distinguisher,
    });
  }

  static buildClusterId({
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

  static buildEdgeId({
    distinguisher,
  }: FactoryInput): LocalDirectedGraphElement2Id {
    return new LocalDirectedGraphElement2Id({
      elementType: 'edge',
      distinguisher,
    });
  }

  get rawTemplate(): LocalDirectedGraphElement2IdTemplate {
    return LOCAL_DIRECTED_GRAPH_ELEMENT_2_ID_TEMPLATE;
  }
}

export class RootDirectedGraphElement2Id extends LocalDirectedGraphElement2Id {
  static build({ distinguisher }: FactoryInput): RootDirectedGraphElement2Id {
    return new RootDirectedGraphElement2Id({
      elementType: 'graph',
      distinguisher,
    });
  }
}

const GLOBAL_DIRECTED_GRAPH_ELEMENT_2_ID_TEMPLATE = [
  ['root', RootDirectedGraphElement2Id],
  ['local', LocalDirectedGraphElement2Id],
] as const satisfies GenericComplexIdTemplate;
type GlobalDirectedGraphElement2IdTemplate =
  typeof GLOBAL_DIRECTED_GRAPH_ELEMENT_2_ID_TEMPLATE;

export class GlobalDirectedGraphElement2Id extends ComplexId<GlobalDirectedGraphElement2IdTemplate> {
  get rawTemplate(): GlobalDirectedGraphElement2IdTemplate {
    return GLOBAL_DIRECTED_GRAPH_ELEMENT_2_ID_TEMPLATE;
  }
}
