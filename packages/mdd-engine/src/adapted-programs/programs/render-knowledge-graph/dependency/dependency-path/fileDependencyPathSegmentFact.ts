import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../../package-agnostic-utilities/type/simplify';
import { DirectedGraphEdge2Instance } from '../../../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import { DirectedGraphElement2 } from '../../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { LocalDirectedGraphElement2Id } from '../../../../programmable-units/graph-visualization/directed-graph/types';
import { FactTypeName } from '../../fact/factTypeName';
import { PartitionFact } from '../../partition-fact/partitionFact';
import { THEME } from '../../theme';
import { PartitionedFileDependencyGroupId } from '../partitionedFileDependencyGroupId';

const FILE_DEPENDENCY_PATH_SEGMENT_FACT_ID_TEMPLATE = [
  ['partitionedFileDependencyGroup', PartitionedFileDependencyGroupId],
  ['tail', LocalDirectedGraphElement2Id],
  ['head', LocalDirectedGraphElement2Id],
] as const satisfies GenericComplexIdTemplate;
type FileDependencyPathSegmentFactIdTemplate =
  typeof FILE_DEPENDENCY_PATH_SEGMENT_FACT_ID_TEMPLATE;
class FileDependencyPathSegmentFactId extends ComplexId<FileDependencyPathSegmentFactIdTemplate> {
  get rawTemplate(): FileDependencyPathSegmentFactIdTemplate {
    return FILE_DEPENDENCY_PATH_SEGMENT_FACT_ID_TEMPLATE;
  }
}

type FileDependencyPathSegmentFactConstructorInput = {
  partitionFact: PartitionFact;
  dependencyGroupId: PartitionedFileDependencyGroupId;
  tailGraphElementId: LocalDirectedGraphElement2Id;
  headGraphElementId: LocalDirectedGraphElement2Id;
  pathHeadId: string;
  pathTailIdSet: Set<string>;
};

/**
 * Contains the graph element for a piece of an edge between one or more
 * importing files and a single imported file. A piece of knowledge.
 */
export type FileDependencyPathSegmentFact = SimplifyN<
  [
    {
      typeName: FactTypeName.FileDependencyPathSegmentFact;
      id: FileDependencyPathSegmentFactId;
    },
    FileDependencyPathSegmentFactConstructorInput,
    {
      graphElement: DirectedGraphElement2;
    },
  ]
>;

export const { FileDependencyPathSegmentFactInstance } =
  buildNamedConstructorFunction({
    constructorName: 'FileDependencyPathSegmentFactInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'typeName',
      'id',
      'partitionFact',
      'dependencyGroupId',
      'tailGraphElementId',
      'headGraphElementId',
      'graphElement',
      'pathHeadId',
      'pathTailIdSet',
    ] as const satisfies readonly (keyof FileDependencyPathSegmentFact)[],
  })
    .withTypes<
      FileDependencyPathSegmentFactConstructorInput,
      FileDependencyPathSegmentFact
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const {
          dependencyGroupId,
          partitionFact,
          tailGraphElementId,
          headGraphElementId,
        } = input;

        const id = new FileDependencyPathSegmentFactId({
          partitionedFileDependencyGroup: dependencyGroupId,
          tail: tailGraphElementId,
          head: headGraphElementId,
        });

        const graphElement = new DirectedGraphEdge2Instance({
          rootGraphLocator: partitionFact.rootGraphLocator,
          tailId: tailGraphElementId.forMachine,
          headId: headGraphElementId.forMachine,
          attributeByKey: {
            ...THEME.dependencyEdge,
          },
        });

        return {
          typeName: FactTypeName.FileDependencyPathSegmentFact,
          id,
          ...input,
          graphElement,
        } satisfies FileDependencyPathSegmentFact;
      },
    })
    .assemble();

export const FILE_DEPENDENCY_PATH_SEGMENT_FACT_COLLECTION_ID =
  'file-dependency-path-segment-fact';

type FileDependencyPathSegmentFactCollectionId =
  typeof FILE_DEPENDENCY_PATH_SEGMENT_FACT_COLLECTION_ID;

export type FileDependencyPathSegmentFactStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    FileDependencyPathSegmentFactCollectionId,
    FileDependencyPathSegmentFact
  >;
