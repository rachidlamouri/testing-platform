import { posix } from 'path';
import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import {
  DirectedGraph2,
  DirectedGraph2Instance,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraph2';
import {
  RootGraphLocator,
  RootGraphLocatorInstance,
} from '../../../programmable-units/graph-visualization/directed-graph/rootGraphLocator';
import { Boundary, BoundaryId } from '../boundary/boundary';
import { CommonBoundaryRoot } from '../common-boundary-root/commonBoundaryRoot';
import { THEME } from '../theme';
import { FactTypeName } from '../fact/factTypeName';
import { Layer } from '../layer/layer';

const PARTITION_FACT_ID_TEMPLATE = [
  ['boundary', BoundaryId],
] as const satisfies GenericComplexIdTemplate;
type PartitionFactIdTemplate = typeof PARTITION_FACT_ID_TEMPLATE;
export class PartitionFactId extends ComplexId<PartitionFactIdTemplate> {
  get rawTemplate(): PartitionFactIdTemplate {
    return PARTITION_FACT_ID_TEMPLATE;
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
      id: PartitionFactId;
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
    'id',
    'layer',
    'boundary',
    'rootGraphLocator',
    'directoryPathRelativeToCommonBoundary',
    'graphElement',
  ],
} as const)
  .withTypes<PartitionFactConstructorInput, PartitionFact>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { layer, boundary, commonBoundaryRoot } = input;

      const id = new PartitionFactId({
        boundary: boundary.id,
      });

      const rootGraphLocator = new RootGraphLocatorInstance({
        distinguisher: boundary.id.forHuman,
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
        id,
        layer,
        boundary,
        rootGraphLocator,
        directoryPathRelativeToCommonBoundary,
        graphElement,
      };
    },
  })
  .assemble();

export const PARTITION_FACT_COLLECTION_ID = 'partition-fact';

type PartitionFactCollectionId = typeof PARTITION_FACT_COLLECTION_ID;

export type PartitionFactStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    PartitionFactCollectionId,
    PartitionFact
  >;
