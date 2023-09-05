import { posix } from 'path';
import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';
import {
  DirectedGraph2,
  DirectedGraph2Instance,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraph2';
import {
  RootGraphLocator,
  RootGraphLocatorInstance,
} from '../../../programmable-units/graph-visualization/directed-graph/rootGraphLocator';
import { Boundary, BoundaryZorn } from '../boundary/boundary';
import { CommonBoundaryRoot } from '../common-boundary-root/commonBoundaryRoot';
import { THEME } from '../theme';

const PARTITION_FACT_ZORN_TEMPLATE = [
  ['boundary', BoundaryZorn],
] as const satisfies GenericZorn2Template;
type PartitionFactZornTemplate = typeof PARTITION_FACT_ZORN_TEMPLATE;
class PartitionFactZorn extends Zorn2<PartitionFactZornTemplate> {
  get rawTemplate(): PartitionFactZornTemplate {
    return PARTITION_FACT_ZORN_TEMPLATE;
  }
}

type PartitionFactConstructorInput = {
  boundary: Boundary;
  commonBoundaryRoot: CommonBoundaryRoot;
};

type PartitionFact = SimplifyN<
  [
    { zorn: PartitionFactZorn },
    Pick<PartitionFactConstructorInput, 'boundary'>,
    {
      rootGraphLocator: RootGraphLocator;
      directoryPathRelativeToCommonBoundary: string;
      directedGraph: DirectedGraph2;
    },
  ]
>;

export const { PartitionFactInstance } = buildNamedConstructorFunction({
  constructorName: 'PartitionFactInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'boundary',
    'rootGraphLocator',
    'directoryPathRelativeToCommonBoundary',
    'directedGraph',
  ],
} as const)
  .withTypes<PartitionFactConstructorInput, PartitionFact>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { boundary, commonBoundaryRoot } = input;

      const zorn = new PartitionFactZorn({
        boundary: boundary.zorn,
      });

      const rootGraphLocator = new RootGraphLocatorInstance({
        distinguisher: boundary.displayName,
      });

      const directoryPathRelativeToCommonBoundary = posix.relative(
        commonBoundaryRoot.directoryPath,
        boundary.directoryPath,
      );

      const directedGraph = new DirectedGraph2Instance({
        locator: rootGraphLocator,
        inputAttributeByKey: {
          label: boundary.displayName,
          ...THEME.graph,
        },
      });

      return {
        zorn,
        boundary,
        rootGraphLocator,
        directoryPathRelativeToCommonBoundary,
        directedGraph,
      };
    },
  })
  .assemble();

export const PARTITION_FACT_GEPP = 'partition-fact';

type PartitionFactGepp = typeof PARTITION_FACT_GEPP;

export type PartitionFactVoque = InMemoryOdeshin2ListVoque<
  PartitionFactGepp,
  PartitionFact
>;
