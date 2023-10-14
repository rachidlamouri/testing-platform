import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../package-agnostic-utilities/data-structure/id';
import { LocalDirectedGraphElement2Zorn } from '../../../../programmable-units/graph-visualization/directed-graph/types';
import { PartitionFact } from '../../partition-fact/partitionFact';
import { PartitionedFileDependencyGroupZorn } from '../partitionedFileDependencyGroupZorn';
import { FileDependencyPathNode } from './fileDependencyPathNode';

const PARTITIONED_FILE_DEPENDENCY_PATH_NODE_ZORN_TEMPLATE = [
  ['partitionedFileDependencyGroup', PartitionedFileDependencyGroupZorn],
  'directoryPath',
] as const satisfies GenericComplexIdTemplate;
type PartitionedFileDependencyPathNodeZornTemplate =
  typeof PARTITIONED_FILE_DEPENDENCY_PATH_NODE_ZORN_TEMPLATE;
export class PartitionedFileDependencyPathNodeZorn extends ComplexId<PartitionedFileDependencyPathNodeZornTemplate> {
  get rawTemplate(): PartitionedFileDependencyPathNodeZornTemplate {
    return PARTITIONED_FILE_DEPENDENCY_PATH_NODE_ZORN_TEMPLATE;
  }
}

type PartitionedFileDependencyPathNodeConstructorInput = {
  partitionFact: PartitionFact;
  dependencyGroupZorn: PartitionedFileDependencyGroupZorn;
  pathNode: FileDependencyPathNode;
  pathHeadId: string;
  pathTailIdSet: Set<string>;
};

/**
 * A node that delineates the start and end of two file dependency path segments. Each node
 * corresponds to one file dependency group and one directory.
 */
export type PartitionedFileDependencyPathNode = {
  id: PartitionedFileDependencyPathNodeZorn;
  partitionFact: PartitionFact;
  directoryPath: string;
  localGraphElementZorn: LocalDirectedGraphElement2Zorn;
  pathHeadId: string;
  pathTailIdSet: Set<string>;
};

export const { PartitionedFileDependencyPathNodeInstance } =
  buildNamedConstructorFunction({
    constructorName: 'PartitionedFileDependencyPathNodeInstance',
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'id',
      'partitionFact',
      'directoryPath',
      'localGraphElementZorn',
      'pathHeadId',
      'pathTailIdSet',
    ],
  } as const)
    .withTypes<
      PartitionedFileDependencyPathNodeConstructorInput,
      PartitionedFileDependencyPathNode
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
          partitionFact,
          dependencyGroupZorn,
          pathNode: { directoryPath },
          pathHeadId,
          pathTailIdSet,
        } = input;

        const id = new PartitionedFileDependencyPathNodeZorn({
          partitionedFileDependencyGroup: dependencyGroupZorn,
          directoryPath,
        });

        const localGraphElementZorn =
          LocalDirectedGraphElement2Zorn.buildNodeZorn({
            distinguisher: id.forHuman,
          });

        return {
          id,
          partitionFact,
          directoryPath,
          localGraphElementZorn,
          pathHeadId,
          pathTailIdSet,
        } satisfies PartitionedFileDependencyPathNode;
      },
    })
    .assemble();

export const PARTITIONED_FILE_DEPENDENCY_PATH_NODE_GEPP =
  'partitioned-file-dependency-path-node';

type PartitionedFileDependencyPathNodeGepp =
  typeof PARTITIONED_FILE_DEPENDENCY_PATH_NODE_GEPP;

export type PartitionedFileDependencyPathNodeVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    PartitionedFileDependencyPathNodeGepp,
    PartitionedFileDependencyPathNode
  >;
