import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { FileSystemNodeId } from '../../../programmable-units/file/fileSystemNode';
import { PartitionFactId } from '../partition-fact/partitionFact';

const PARTITIONED_FILE_DEPENDENCY_GROUP_ZORN_TEMPLATE = [
  ['partitionFact', PartitionFactId],
  ['importedFile', FileSystemNodeId],
] as const satisfies GenericComplexIdTemplate;
type PartitionedFileDependencyGroupZornTemplate =
  typeof PARTITIONED_FILE_DEPENDENCY_GROUP_ZORN_TEMPLATE;

/**
 * The complex identifier of a PartitionedFileDependencyGroup
 *
 * @readableName PartitionedFileDependencyGroupComplexId
 *
 * @canonicalDeclaration
 */
export class PartitionedFileDependencyGroupId extends ComplexId<PartitionedFileDependencyGroupZornTemplate> {
  get rawTemplate(): PartitionedFileDependencyGroupZornTemplate {
    return PARTITIONED_FILE_DEPENDENCY_GROUP_ZORN_TEMPLATE;
  }
}
