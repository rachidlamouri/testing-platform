import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import { PartitionFactZorn } from '../partition-fact/partitionFact';

const PARTITIONED_FILE_DEPENDENCY_GROUP_ZORN_TEMPLATE = [
  ['partitionFact', PartitionFactZorn],
  ['importedFile', FileSystemNodeZorn],
] as const satisfies GenericZorn2Template;
type PartitionedFileDependencyGroupZornTemplate =
  typeof PARTITIONED_FILE_DEPENDENCY_GROUP_ZORN_TEMPLATE;
export class PartitionedFileDependencyGroupZorn extends Zorn2<PartitionedFileDependencyGroupZornTemplate> {
  get rawTemplate(): PartitionedFileDependencyGroupZornTemplate {
    return PARTITIONED_FILE_DEPENDENCY_GROUP_ZORN_TEMPLATE;
  }
}
