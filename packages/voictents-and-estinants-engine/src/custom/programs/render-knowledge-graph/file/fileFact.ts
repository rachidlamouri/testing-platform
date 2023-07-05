import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';
import { TypeScriptFile } from '../../../programmable-units/type-script-file/typeScriptFile';
import { DirectoryFact } from '../directory/directoryFact';

type BaseFileFact = {
  file: TypeScriptFile;
  directoryFact: DirectoryFact;
};

type FileFactPrototype = {
  get zorn(): string;
  get nodeZorn(): string;
  get nodeId(): string;
};

/**
 * Presentation metadata for a file. A piece of knowledge.
 */
type FileFact = ObjectWithPrototype<BaseFileFact, FileFactPrototype>;

export const { FileFactInstance } = buildConstructorFunctionWithName(
  'FileFactInstance',
)<BaseFileFact, FileFactPrototype, FileFact>({
  zorn: (fileFact) => {
    return getZorn([fileFact.file.zorn, 'fact']);
  },
  nodeZorn: (fileFact) => {
    return getZorn([fileFact.zorn, 'node']);
  },
  nodeId: (fileFact) => {
    return getZornableId({ zorn: fileFact.nodeZorn });
  },
});

export const FILE_FACT_GEPP = 'file-fact';

type FileFactGepp = typeof FILE_FACT_GEPP;

export type FileFactVoque = InMemoryOdeshin2Voque<FileFactGepp, FileFact>;
