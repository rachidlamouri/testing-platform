/**
 * Directed graph zorn types
 * @noCanonicalDeclaration
 */

import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../../package-agnostic-utilities/data-structure/zorn';

type FactoryInput = {
  distinguisher: string;
};

const LOCAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE = [
  'elementType',
  // TODO: update the template parent type to allow this to be a string OR a Zorn
  'distinguisher',
] as const satisfies GenericComplexzornTemplate;
type LocalDirectedGraphElement2ZornTemplate =
  typeof LOCAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE;
export class LocalDirectedGraphElement2Zorn extends Complexzorn<LocalDirectedGraphElement2ZornTemplate> {
  static buildSubgraphZorn({
    distinguisher,
  }: FactoryInput): LocalDirectedGraphElement2Zorn {
    return new LocalDirectedGraphElement2Zorn({
      elementType: 'subgraph',
      distinguisher,
    });
  }

  static buildClusterZorn({
    distinguisher,
  }: FactoryInput): LocalDirectedGraphElement2Zorn {
    return new LocalDirectedGraphElement2Zorn({
      elementType: 'cluster',
      distinguisher,
    });
  }

  static buildNodeZorn({
    distinguisher,
  }: FactoryInput): LocalDirectedGraphElement2Zorn {
    return new LocalDirectedGraphElement2Zorn({
      elementType: 'node',
      distinguisher,
    });
  }

  static buildEdgeZorn({
    distinguisher,
  }: FactoryInput): LocalDirectedGraphElement2Zorn {
    return new LocalDirectedGraphElement2Zorn({
      elementType: 'edge',
      distinguisher,
    });
  }

  get rawTemplate(): LocalDirectedGraphElement2ZornTemplate {
    return LOCAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE;
  }
}

export class RootDirectedGraphElement2Zorn extends LocalDirectedGraphElement2Zorn {
  static build({ distinguisher }: FactoryInput): RootDirectedGraphElement2Zorn {
    return new RootDirectedGraphElement2Zorn({
      elementType: 'graph',
      distinguisher,
    });
  }
}

const GLOBAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE = [
  ['root', RootDirectedGraphElement2Zorn],
  ['local', LocalDirectedGraphElement2Zorn],
] as const satisfies GenericComplexzornTemplate;
type GlobalDirectedGraphElement2ZornTemplate =
  typeof GLOBAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE;

export class GlobalDirectedGraphElement2Zorn extends Complexzorn<GlobalDirectedGraphElement2ZornTemplate> {
  get rawTemplate(): GlobalDirectedGraphElement2ZornTemplate {
    return GLOBAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE;
  }
}
