import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../../utilities/simplify';
import {
  FileSystemNode,
  FileSystemNodeZorn,
} from '../../../programmable-units/file/fileSystemNode';
import { FileSystemNodeVoque } from '../../../programmable-units/file/fileSystemNodeVoictent';
import { TypeScriptFile } from '../../../programmable-units/type-script-file/typeScriptFile';
import { Boundary } from '../boundary/boundary';

type BoundedFileConstructorInput = {
  boundary: Boundary;
  file: TypeScriptFile;
};

/**
 * A file and the boundary it's under
 */
export type BoundedFile = SimplifyN<
  [
    {
      zorn: FileSystemNodeZorn;
    },
    BoundedFileConstructorInput,
    Omit<FileSystemNode, 'zorn'>,
  ]
>;

export const { BoundedFileInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundedFileInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'boundary',
    'file',
    'nodePath',
    'nodePathPartList',
  ],
} as const)
  .withTypes<BoundedFileConstructorInput, BoundedFile>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { file } = input;

      const { nodePath } = file;

      const zorn = new FileSystemNodeZorn({
        nodePath,
      });

      return {
        zorn,
        ...input,
        nodePath,
        nodePathPartList: file.nodePathPartList,
      };
    },
  })
  .assemble();

export const BOUNDED_FILE_GEPP = 'bounded-file';

type BoundedFileGepp = typeof BOUNDED_FILE_GEPP;

export type BoundedFileVoque = FileSystemNodeVoque<
  BoundedFileGepp,
  BoundedFile
>;
