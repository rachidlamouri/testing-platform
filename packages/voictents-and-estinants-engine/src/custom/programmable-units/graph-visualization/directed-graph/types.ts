import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';

type FactoryInput = {
  distinguisher: string;
};

const LOCAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE = [
  'elementType',
  'distinguisher',
] as const satisfies GenericZorn2Template;
type LocalDirectedGraphElement2ZornTemplate =
  typeof LOCAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE;
export class LocalDirectedGraphElement2Zorn extends Zorn2<LocalDirectedGraphElement2ZornTemplate> {
  static buildSubgraphZorn({
    distinguisher,
  }: FactoryInput): LocalDirectedGraphElement2Zorn {
    return new LocalDirectedGraphElement2Zorn({
      elementType: 'subgraph',
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
] as const satisfies GenericZorn2Template;
type GlobalDirectedGraphElement2ZornTemplate =
  typeof GLOBAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE;

export class GlobalDirectedGraphElement2Zorn extends Zorn2<GlobalDirectedGraphElement2ZornTemplate> {
  get rawTemplate(): GlobalDirectedGraphElement2ZornTemplate {
    return GLOBAL_DIRECTED_GRAPH_ELEMENT_2_ZORN_TEMPLATE;
  }
}
