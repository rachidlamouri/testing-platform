import { posix } from 'path';
import {
  memoizeGetter,
  ObjectWithPrototype,
} from '../../../utilities/buildConstructorFunction';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../utilities/semantic-types/zorn';

const FILE_SYSTEM_NODE_ZORN_TEMPLATE = [
  'nodePath',
] as const satisfies GenericZorn2Template;
type FileSystemNodeZornTemplate = typeof FILE_SYSTEM_NODE_ZORN_TEMPLATE;
class FileSystemNodeZorn extends Zorn2<FileSystemNodeZornTemplate> {
  get rawTemplate(): FileSystemNodeZornTemplate {
    return FILE_SYSTEM_NODE_ZORN_TEMPLATE;
  }
}

export type BaseFileSystemNode = {
  nodePath: string;
};

export type FileSystemNodePrototype = {
  get zorn(): FileSystemNodeZorn;
  get nodePathPartList(): string[];
};

export type FileSystemNode = ObjectWithPrototype<
  BaseFileSystemNode,
  FileSystemNodePrototype
>;

export const getFileSystemNodeZorn = (
  node: FileSystemNode,
): FileSystemNodeZorn => {
  return new FileSystemNodeZorn({
    nodePath: node.nodePath,
  });
};

export const getFileSystemNodePathPartList = memoizeGetter(
  (node: FileSystemNode): string[] => {
    return node.nodePath.split(posix.sep);
  },
);
