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
  'filePath',
] as const satisfies GenericZorn2Template;
type FileSystemNodeZornTemplate = typeof FILE_SYSTEM_NODE_ZORN_TEMPLATE;
class FileSystemNodeZorn extends Zorn2<FileSystemNodeZornTemplate> {
  get rawTemplate(): FileSystemNodeZornTemplate {
    return FILE_SYSTEM_NODE_ZORN_TEMPLATE;
  }
}

export type BaseFileSystemNode = {
  filePath: string;
};

export type FileSystemNodePrototype = {
  get zorn(): FileSystemNodeZorn;
  get filePathPartList(): string[];
};

export type FileSystemNode = ObjectWithPrototype<
  BaseFileSystemNode,
  FileSystemNodePrototype
>;

export const getFileSystemNodeZorn = (
  node: FileSystemNode,
): FileSystemNodeZorn => {
  return new FileSystemNodeZorn({
    filePath: node.filePath,
  });
};

export const getFileSystemNodePathPartList = memoizeGetter(
  (node: FileSystemNode): string[] => {
    return node.filePath.split(posix.sep);
  },
);
