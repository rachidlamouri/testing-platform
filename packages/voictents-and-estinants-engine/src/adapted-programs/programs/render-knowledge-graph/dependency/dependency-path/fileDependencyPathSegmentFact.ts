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
import { PartitionedFileDependencyGroupZorn } from '../partitionedFileDependencyGroupZorn';

const FILE_DEPENDENCY_PATH_SEGMENT_FACT_ZORN_TEMPLATE = [
  ['partitionedFileDependencyGroup', PartitionedFileDependencyGroupZorn],
  ['tail', LocalDirectedGraphElement2Id],
  ['head', LocalDirectedGraphElement2Id],
] as const satisfies GenericComplexIdTemplate;
type FileDependencyPathSegmentFactZornTemplate =
  typeof FILE_DEPENDENCY_PATH_SEGMENT_FACT_ZORN_TEMPLATE;
class FileDependencyPathSegmentFactZorn extends ComplexId<FileDependencyPathSegmentFactZornTemplate> {
  get rawTemplate(): FileDependencyPathSegmentFactZornTemplate {
    return FILE_DEPENDENCY_PATH_SEGMENT_FACT_ZORN_TEMPLATE;
  }
}

type FileDependencyPathSegmentFactConstructorInput = {
  partitionFact: PartitionFact;
  dependencyGroupZorn: PartitionedFileDependencyGroupZorn;
  tailGraphElementZorn: LocalDirectedGraphElement2Id;
  headGraphElementZorn: LocalDirectedGraphElement2Id;
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
      id: FileDependencyPathSegmentFactZorn;
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
      'dependencyGroupZorn',
      'tailGraphElementZorn',
      'headGraphElementZorn',
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
          dependencyGroupZorn,
          partitionFact,
          tailGraphElementZorn,
          headGraphElementZorn,
        } = input;

        const id = new FileDependencyPathSegmentFactZorn({
          partitionedFileDependencyGroup: dependencyGroupZorn,
          tail: tailGraphElementZorn,
          head: headGraphElementZorn,
        });

        const graphElement = new DirectedGraphEdge2Instance({
          rootGraphLocator: partitionFact.rootGraphLocator,
          tailId: tailGraphElementZorn.forMachine,
          headId: headGraphElementZorn.forMachine,
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

export const FILE_DEPENDENCY_PATH_SEGMENT_FACT_GEPP =
  'file-dependency-path-segment-fact';

type FileDependencyPathSegmentFactGepp =
  typeof FILE_DEPENDENCY_PATH_SEGMENT_FACT_GEPP;

export type FileDependencyPathSegmentFactVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    FileDependencyPathSegmentFactGepp,
    FileDependencyPathSegmentFact
  >;
