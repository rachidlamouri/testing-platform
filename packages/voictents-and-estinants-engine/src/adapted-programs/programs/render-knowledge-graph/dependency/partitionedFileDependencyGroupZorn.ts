import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import { PartitionFactZorn } from '../partition-fact/partitionFact';

const PARTITIONED_FILE_DEPENDENCY_GROUP_ZORN_TEMPLATE = [
  ['partitionFact', PartitionFactZorn],
  ['importedFile', FileSystemNodeZorn],
] as const satisfies GenericComplexIdTemplate;
type PartitionedFileDependencyGroupZornTemplate =
  typeof PARTITIONED_FILE_DEPENDENCY_GROUP_ZORN_TEMPLATE;

/**
 * The complex identifier of a PartitionedFileDependencyGroup
 *
 * @readableName PartitionedFileDependencyGroupComplexId
 */
export class PartitionedFileDependencyGroupZorn extends ComplexId<PartitionedFileDependencyGroupZornTemplate> {
  get rawTemplate(): PartitionedFileDependencyGroupZornTemplate {
    return PARTITIONED_FILE_DEPENDENCY_GROUP_ZORN_TEMPLATE;
  }
}
