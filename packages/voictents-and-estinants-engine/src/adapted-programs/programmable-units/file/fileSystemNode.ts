import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { NodePath } from './nodePath';

const FILE_SYSTEM_NODE_ZORN_TEMPLATE = [
  'nodePath',
] as const satisfies GenericComplexIdTemplate;
type FileSystemNodeZornTemplate = typeof FILE_SYSTEM_NODE_ZORN_TEMPLATE;
export class FileSystemNodeZorn extends ComplexId<FileSystemNodeZornTemplate> {
  get rawTemplate(): FileSystemNodeZornTemplate {
    return FILE_SYSTEM_NODE_ZORN_TEMPLATE;
  }
}

type FileSystemNodeConstructorInput = {
  nodePath: NodePath;
};

/**
 * A readable identifier and a NodePath
 */
export type FileSystemNode = SimplifyN<
  [
    {
      id: FileSystemNodeZorn;
    },
    FileSystemNodeConstructorInput,
  ]
>;
