import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { NodePath } from './nodePath';

const FILE_SYSTEM_NODE_ID_TEMPLATE = [
  'nodePath',
] as const satisfies GenericComplexIdTemplate;
type FileSystemNodeIdTemplate = typeof FILE_SYSTEM_NODE_ID_TEMPLATE;
export class FileSystemNodeId extends ComplexId<FileSystemNodeIdTemplate> {
  get rawTemplate(): FileSystemNodeIdTemplate {
    return FILE_SYSTEM_NODE_ID_TEMPLATE;
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
      id: FileSystemNodeId;
    },
    FileSystemNodeConstructorInput,
  ]
>;
