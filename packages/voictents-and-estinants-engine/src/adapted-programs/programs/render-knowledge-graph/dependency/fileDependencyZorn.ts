import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../../package-agnostic-utilities/data-structure/zorn';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';

const FILE_DEPENDENCY_ZORN_TEMPLATE = [
  ['importingFile', FileSystemNodeZorn],
  ['importedFile', FileSystemNodeZorn],
] as const satisfies GenericComplexzornTemplate;
type FileDependencyZornTemplate = typeof FILE_DEPENDENCY_ZORN_TEMPLATE;

/**
 * The complex identifier of a FileDependency
 *
 * @readableName FileDependencyComplexId
 */
export class FileDependencyZorn extends Complexzorn<FileDependencyZornTemplate> {
  get rawTemplate(): FileDependencyZornTemplate {
    return FILE_DEPENDENCY_ZORN_TEMPLATE;
  }
}
