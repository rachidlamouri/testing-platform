import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import {
  PartitionFact,
  PartitionFactId,
} from '../partition-fact/partitionFact';
import { FileDependency } from './fileDependency';
import { FileDependencyId } from './fileDependencyId';

const PARTITIONED_FILE_DEPENDENCY_ID_TEMPLATE = [
  ['partitionFact', PartitionFactId],
  ['fileDependency', FileDependencyId],
] as const satisfies GenericComplexIdTemplate;
type PartitionedFileDependencyIdTemplate =
  typeof PARTITIONED_FILE_DEPENDENCY_ID_TEMPLATE;
class PartitionedFileDependencyId extends ComplexId<PartitionedFileDependencyIdTemplate> {
  get rawTemplate(): PartitionedFileDependencyIdTemplate {
    return PARTITIONED_FILE_DEPENDENCY_ID_TEMPLATE;
  }
}

export type PartitionedFileDependencyConstructorInput = {
  partitionFact: PartitionFact;
  fileDependency: FileDependency;
};

/**
 * A FileDependency and a partition it will be displayed under. A FileDependency
 * can appear in more than one partition.
 */
type PartitionedFileDependency = SimplifyN<
  [
    {
      id: PartitionedFileDependencyId;
    },
    PartitionedFileDependencyConstructorInput,
  ]
>;

export const { PartitionedFileDependencyInstance } =
  buildNamedConstructorFunction({
    constructorName: 'PartitionedFileDependencyInstance',
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'id',
      'partitionFact',
      'fileDependency',
    ],
  } as const)
    .withTypes<
      PartitionedFileDependencyConstructorInput,
      PartitionedFileDependency
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { partitionFact, fileDependency } = input;

        const id = new PartitionedFileDependencyId({
          partitionFact: partitionFact.id,
          fileDependency: fileDependency.id,
        });

        return {
          id,
          partitionFact,
          fileDependency,
        };
      },
    })
    .assemble();

export const PARTITIONED_FILE_DEPENDENCY_COLLECTION_ID =
  'partitioned-file-dependency';

type PartitionedFileDependencyCollectionId =
  typeof PARTITIONED_FILE_DEPENDENCY_COLLECTION_ID;

export type PartitionedFileDependencyStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    PartitionedFileDependencyCollectionId,
    PartitionedFileDependency
  >;
