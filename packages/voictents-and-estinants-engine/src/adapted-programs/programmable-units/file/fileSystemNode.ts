import {
  GenericZorn2Template,
  Zorn2,
} from '../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../utilities/types/simplify';
import { NodePath } from './nodePath';

const FILE_SYSTEM_NODE_ZORN_TEMPLATE = [
  'nodePath',
] as const satisfies GenericZorn2Template;
type FileSystemNodeZornTemplate = typeof FILE_SYSTEM_NODE_ZORN_TEMPLATE;
export class FileSystemNodeZorn extends Zorn2<FileSystemNodeZornTemplate> {
  get rawTemplate(): FileSystemNodeZornTemplate {
    return FILE_SYSTEM_NODE_ZORN_TEMPLATE;
  }
}

type FileSystemNodeConstructorInput = {
  nodePath: NodePath;
};

export type FileSystemNode = SimplifyN<
  [
    {
      zorn: FileSystemNodeZorn;
    },
    FileSystemNodeConstructorInput,
  ]
>;
