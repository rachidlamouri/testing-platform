import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { FileSystemNodeId } from '../../../programmable-units/file/fileSystemNode';

const FILE_DEPENDENCY_ZORN_TEMPLATE = [
  ['importingFile', FileSystemNodeId],
  ['importedFile', FileSystemNodeId],
] as const satisfies GenericComplexIdTemplate;
type FileDependencyZornTemplate = typeof FILE_DEPENDENCY_ZORN_TEMPLATE;

/**
 * The complex identifier of a FileDependency
 *
 * @readableName FileDependencyComplexId
 */
export class FileDependencyZorn extends ComplexId<FileDependencyZornTemplate> {
  get rawTemplate(): FileDependencyZornTemplate {
    return FILE_DEPENDENCY_ZORN_TEMPLATE;
  }
}
