import { InMemoryOdeshin2ListVoque } from '../../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../../package-agnostic-utilities/datastructure/zorn';
import { LocalDirectedGraphElement2Zorn } from '../../../../programmable-units/graph-visualization/directed-graph/types';
import { PartitionFact } from '../../partition-fact/partitionFact';
import { PartitionedFileDependencyGroupZorn } from '../partitionedFileDependencyGroupZorn';
import { FileDependencyPathNode } from './fileDependencyPathNode';

const PARTITIONED_FILE_DEPENDENCY_PATH_NODE_ZORN_TEMPLATE = [
  ['partitionedFileDependencyGroup', PartitionedFileDependencyGroupZorn],
  'directoryPath',
] as const satisfies GenericZorn2Template;
type PartitionedFileDependencyPathNodeZornTemplate =
  typeof PARTITIONED_FILE_DEPENDENCY_PATH_NODE_ZORN_TEMPLATE;
export class PartitionedFileDependencyPathNodeZorn extends Zorn2<PartitionedFileDependencyPathNodeZornTemplate> {
  get rawTemplate(): PartitionedFileDependencyPathNodeZornTemplate {
    return PARTITIONED_FILE_DEPENDENCY_PATH_NODE_ZORN_TEMPLATE;
  }
}

type PartitionedFileDependencyPathNodeConstructorInput = {
  partitionFact: PartitionFact;
  dependencyGroupZorn: PartitionedFileDependencyGroupZorn;
  pathNode: FileDependencyPathNode;
  pathHeadId: string;
};

/**
 * A node that delineates the start and end of two file dependency path segments. Each node
 * corresponds to one file dependency group and one directory.
 */
export type PartitionedFileDependencyPathNode = {
  zorn: PartitionedFileDependencyPathNodeZorn;
  partitionFact: PartitionFact;
  directoryPath: string;
  localGraphElementZorn: LocalDirectedGraphElement2Zorn;
  pathHeadId: string;
};

export const { PartitionedFileDependencyPathNodeInstance } =
  buildNamedConstructorFunction({
    constructorName: 'PartitionedFileDependencyPathNodeInstance',
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'partitionFact',
      'directoryPath',
      'localGraphElementZorn',
      'pathHeadId',
    ],
  } as const)
    .withTypes<
      PartitionedFileDependencyPathNodeConstructorInput,
      PartitionedFileDependencyPathNode
    >({
      typeCheckErrorMesssages: {
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
        } = input;

        const zorn = new PartitionedFileDependencyPathNodeZorn({
          partitionedFileDependencyGroup: dependencyGroupZorn,
          directoryPath,
        });

        const localGraphElementZorn =
          LocalDirectedGraphElement2Zorn.buildNodeZorn({
            distinguisher: zorn.forHuman,
          });

        return {
          zorn,
          partitionFact,
          directoryPath,
          localGraphElementZorn,
          pathHeadId,
        } satisfies PartitionedFileDependencyPathNode;
      },
    })
    .assemble();

export const PARTITIONED_FILE_DEPENDENCY_PATH_NODE_GEPP =
  'partitioned-file-dependency-path-node';

type PartitionedFileDependencyPathNodeGepp =
  typeof PARTITIONED_FILE_DEPENDENCY_PATH_NODE_GEPP;

export type PartitionedFileDependencyPathNodeVoque = InMemoryOdeshin2ListVoque<
  PartitionedFileDependencyPathNodeGepp,
  PartitionedFileDependencyPathNode
>;
