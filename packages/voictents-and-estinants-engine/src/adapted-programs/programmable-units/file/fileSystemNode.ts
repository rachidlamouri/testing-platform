import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../package-agnostic-utilities/datastructure/zorn';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { NodePath } from './nodePath';

const FILE_SYSTEM_NODE_ZORN_TEMPLATE = [
  'nodePath',
] as const satisfies GenericComplexzornTemplate;
type FileSystemNodeZornTemplate = typeof FILE_SYSTEM_NODE_ZORN_TEMPLATE;
export class FileSystemNodeZorn extends Complexzorn<FileSystemNodeZornTemplate> {
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
      zorn: FileSystemNodeZorn;
    },
    FileSystemNodeConstructorInput,
  ]
>;
