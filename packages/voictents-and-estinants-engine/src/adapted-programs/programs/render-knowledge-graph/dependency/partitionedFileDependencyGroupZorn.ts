import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../../package-agnostic-utilities/datastructure/zorn';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import { PartitionFactZorn } from '../partition-fact/partitionFact';

const PARTITIONED_FILE_DEPENDENCY_GROUP_ZORN_TEMPLATE = [
  ['partitionFact', PartitionFactZorn],
  ['importedFile', FileSystemNodeZorn],
] as const satisfies GenericComplexzornTemplate;
type PartitionedFileDependencyGroupZornTemplate =
  typeof PARTITIONED_FILE_DEPENDENCY_GROUP_ZORN_TEMPLATE;

/**
 * The complex identifier of a PartitionedFileDependencyGroup
 *
 * @readableName PartitionedFileDependencyGroupComplexId
 */
export class PartitionedFileDependencyGroupZorn extends Complexzorn<PartitionedFileDependencyGroupZornTemplate> {
  get rawTemplate(): PartitionedFileDependencyGroupZornTemplate {
    return PARTITIONED_FILE_DEPENDENCY_GROUP_ZORN_TEMPLATE;
  }
}
