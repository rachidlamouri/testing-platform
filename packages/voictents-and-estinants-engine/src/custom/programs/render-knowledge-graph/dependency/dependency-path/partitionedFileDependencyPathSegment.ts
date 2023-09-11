import { InMemoryOdeshin2ListVoque } from '../../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../../utilities/simplify';
import { LocalDirectedGraphElement2Zorn } from '../../../../programmable-units/graph-visualization/directed-graph/types';
import { PartitionFact } from '../../partition-fact/partitionFact';
import { PartitionedFileDependencyGroupZorn } from '../partitionedFileDependencyGroupZorn';

const PARTITIONED_FILE_DEPENDENCY_PATH_SEGMENT_ZORN_TEMPLATE = [
  ['partitionedFileDependencyGroup', PartitionedFileDependencyGroupZorn],
  'tailDirectoryPath',
  'headDirectoryPath',
] as const satisfies GenericZorn2Template;
type PartitionedFileDependencyPathSegmentZornTemplate =
  typeof PARTITIONED_FILE_DEPENDENCY_PATH_SEGMENT_ZORN_TEMPLATE;
class PartitionedFileDependencyPathSegmentZorn extends Zorn2<PartitionedFileDependencyPathSegmentZornTemplate> {
  get rawTemplate(): PartitionedFileDependencyPathSegmentZornTemplate {
    return PARTITIONED_FILE_DEPENDENCY_PATH_SEGMENT_ZORN_TEMPLATE;
  }
}

type PartitionedFileDependencyPathSegmentConstructorInput = {
  partitionFact: PartitionFact;
  dependencyGroupZorn: PartitionedFileDependencyGroupZorn;
  tailDirectoryPath: string;
  headDirectoryPath: string;
};

export type PartitionedFileDependencyPathSegment = SimplifyN<
  [
    { zorn: PartitionedFileDependencyPathSegmentZorn },
    PartitionedFileDependencyPathSegmentConstructorInput,
    {
      localGraphElementZorn: LocalDirectedGraphElement2Zorn;
    },
  ]
>;

export const { PartitionedFileDependencyPathSegmentInstance } =
  buildNamedConstructorFunction({
    constructorName: 'PartitionedFileDependencyPathSegmentInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'partitionFact',
      'dependencyGroupZorn',
      'tailDirectoryPath',
      'headDirectoryPath',
      'localGraphElementZorn',
    ] as const satisfies readonly (keyof PartitionedFileDependencyPathSegment)[],
  } as const)
    .withTypes<
      PartitionedFileDependencyPathSegmentConstructorInput,
      PartitionedFileDependencyPathSegment
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
          tailDirectoryPath,
          headDirectoryPath,
        } = input;

        const zorn = new PartitionedFileDependencyPathSegmentZorn({
          partitionedFileDependencyGroup: dependencyGroupZorn,
          tailDirectoryPath,
          headDirectoryPath,
        });

        const localGraphElementZorn =
          LocalDirectedGraphElement2Zorn.buildEdgeZorn({
            distinguisher: zorn.forHuman,
          });

        return {
          zorn,
          partitionFact,
          dependencyGroupZorn,
          tailDirectoryPath,
          headDirectoryPath,
          localGraphElementZorn,
        } satisfies PartitionedFileDependencyPathSegment;
      },
    })
    .assemble();

export const PARTITIONED_FILE_DEPENDENCY_PATH_SEGMENT_GEPP =
  'partitioned-file-dependency-path-segment';

type PartitionedFileDependencyPathSegmentGepp =
  typeof PARTITIONED_FILE_DEPENDENCY_PATH_SEGMENT_GEPP;

export type PartitionedFileDependencyPathSegmentVoque =
  InMemoryOdeshin2ListVoque<
    PartitionedFileDependencyPathSegmentGepp,
    PartitionedFileDependencyPathSegment
  >;
