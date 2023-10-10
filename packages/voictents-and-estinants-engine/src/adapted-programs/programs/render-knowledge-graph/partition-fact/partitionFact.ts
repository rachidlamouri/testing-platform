import { posix } from 'path';
import { InMemoryOdeshin3Voque } from '../../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../../package-agnostic-utilities/data-structure/zorn';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
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
import { FactTypeName } from '../fact/factTypeName';
import { Layer } from '../layer/layer';

const PARTITION_FACT_ZORN_TEMPLATE = [
  ['boundary', BoundaryZorn],
] as const satisfies GenericComplexzornTemplate;
type PartitionFactZornTemplate = typeof PARTITION_FACT_ZORN_TEMPLATE;
export class PartitionFactZorn extends Complexzorn<PartitionFactZornTemplate> {
  get rawTemplate(): PartitionFactZornTemplate {
    return PARTITION_FACT_ZORN_TEMPLATE;
  }
}

type PartitionFactConstructorInput = {
  layer: Layer;
  boundary: Boundary;
  commonBoundaryRoot: CommonBoundaryRoot;
};

/**
 * A section of the knowledge graph
 */
export type PartitionFact = SimplifyN<
  [
    {
      typeName: FactTypeName.PartitionFact;
      zorn: PartitionFactZorn;
    },
    Pick<PartitionFactConstructorInput, 'layer' | 'boundary'>,
    {
      rootGraphLocator: RootGraphLocator;
      directoryPathRelativeToCommonBoundary: string;
      graphElement: DirectedGraph2;
    },
  ]
>;

export const { PartitionFactInstance } = buildNamedConstructorFunction({
  constructorName: 'PartitionFactInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'typeName',
    'zorn',
    'layer',
    'boundary',
    'rootGraphLocator',
    'directoryPathRelativeToCommonBoundary',
    'graphElement',
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
      const { layer, boundary, commonBoundaryRoot } = input;

      const zorn = new PartitionFactZorn({
        boundary: boundary.zorn,
      });

      const rootGraphLocator = new RootGraphLocatorInstance({
        distinguisher: boundary.zorn.forHuman,
      });

      const directoryPathRelativeToCommonBoundary = posix.relative(
        commonBoundaryRoot.directoryPath,
        boundary.directory.directoryPath.serialized,
      );

      const graphElement = new DirectedGraph2Instance({
        locator: rootGraphLocator,
        inputAttributeByKey: {
          label: boundary.displayName,
          ...THEME.graph,
        },
      });

      return {
        typeName: FactTypeName.PartitionFact,
        zorn,
        layer,
        boundary,
        rootGraphLocator,
        directoryPathRelativeToCommonBoundary,
        graphElement,
      };
    },
  })
  .assemble();

export const PARTITION_FACT_GEPP = 'partition-fact';

type PartitionFactGepp = typeof PARTITION_FACT_GEPP;

export type PartitionFactVoque = InMemoryOdeshin3Voque<
  PartitionFactGepp,
  PartitionFact
>;
