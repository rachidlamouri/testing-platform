import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';

const FILE_DEPENDENCY_ZORN_TEMPLATE = [
  ['importingFile', FileSystemNodeZorn],
  ['importedFile', FileSystemNodeZorn],
] as const satisfies GenericZorn2Template;
type FileDependencyZornTemplate = typeof FILE_DEPENDENCY_ZORN_TEMPLATE;
export class FileDependencyZorn extends Zorn2<FileDependencyZornTemplate> {
  get rawTemplate(): FileDependencyZornTemplate {
    return FILE_DEPENDENCY_ZORN_TEMPLATE;
  }
}
