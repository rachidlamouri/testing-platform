import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../package-agnostic-utilities/data-structure/id';
import { LocalDirectedGraphElement2Id } from '../../../../programmable-units/graph-visualization/directed-graph/types';
import { PartitionFact } from '../../partition-fact/partitionFact';
import { PartitionedFileDependencyGroupId } from '../partitionedFileDependencyGroupId';
import { FileDependencyPathNode } from './fileDependencyPathNode';

const PARTITIONED_FILE_DEPENDENCY_PATH_NODE_ID_TEMPLATE = [
  ['partitionedFileDependencyGroup', PartitionedFileDependencyGroupId],
  'directoryPath',
] as const satisfies GenericComplexIdTemplate;
type PartitionedFileDependencyPathNodeIdTemplate =
  typeof PARTITIONED_FILE_DEPENDENCY_PATH_NODE_ID_TEMPLATE;
export class PartitionedFileDependencyPathNodeId extends ComplexId<PartitionedFileDependencyPathNodeIdTemplate> {
  get rawTemplate(): PartitionedFileDependencyPathNodeIdTemplate {
    return PARTITIONED_FILE_DEPENDENCY_PATH_NODE_ID_TEMPLATE;
  }
}

type PartitionedFileDependencyPathNodeConstructorInput = {
  partitionFact: PartitionFact;
  dependencyGroupId: PartitionedFileDependencyGroupId;
  pathNode: FileDependencyPathNode;
  pathHeadId: string;
  pathTailIdSet: Set<string>;
};

/**
 * A node that delineates the start and end of two file dependency path segments. Each node
 * corresponds to one file dependency group and one directory.
 */
export type PartitionedFileDependencyPathNode = {
  id: PartitionedFileDependencyPathNodeId;
  partitionFact: PartitionFact;
  directoryPath: string;
  localGraphElementId: LocalDirectedGraphElement2Id;
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
      'localGraphElementId',
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
          dependencyGroupId,
          pathNode: { directoryPath },
          pathHeadId,
          pathTailIdSet,
        } = input;

        const id = new PartitionedFileDependencyPathNodeId({
          partitionedFileDependencyGroup: dependencyGroupId,
          directoryPath,
        });

        const localGraphElementId = LocalDirectedGraphElement2Id.buildNodeId({
          distinguisher: id.forHuman,
        });

        return {
          id,
          partitionFact,
          directoryPath,
          localGraphElementId,
          pathHeadId,
          pathTailIdSet,
        } satisfies PartitionedFileDependencyPathNode;
      },
    })
    .assemble();

export const PARTITIONED_FILE_DEPENDENCY_PATH_NODE_COLLECTION_ID =
  'partitioned-file-dependency-path-node';

type PartitionedFileDependencyPathNodeCollectionId =
  typeof PARTITIONED_FILE_DEPENDENCY_PATH_NODE_COLLECTION_ID;

export type PartitionedFileDependencyPathNodeStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    PartitionedFileDependencyPathNodeCollectionId,
    PartitionedFileDependencyPathNode
  >;
