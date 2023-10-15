import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { FileSystemNodeId } from '../../../programmable-units/file/fileSystemNode';

const FILE_DEPENDENCY_ID_TEMPLATE = [
  ['importingFile', FileSystemNodeId],
  ['importedFile', FileSystemNodeId],
] as const satisfies GenericComplexIdTemplate;
type FileDependencyIdTemplate = typeof FILE_DEPENDENCY_ID_TEMPLATE;

/**
 * The complex identifier of a FileDependency
 *
 * @readableName FileDependencyComplexId
 *
 * @canonicalDeclaration
 */
export class FileDependencyId extends ComplexId<FileDependencyIdTemplate> {
  get rawTemplate(): FileDependencyIdTemplate {
    return FILE_DEPENDENCY_ID_TEMPLATE;
  }
}
