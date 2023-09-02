import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';
import {
  GraphConstituentLocator,
  GraphConstituentLocatorInstance,
} from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { LocalDirectedGraphElement2Zorn } from '../../../programmable-units/graph-visualization/directed-graph/types';
import { TypeScriptFile } from '../../../programmable-units/type-script-file/typeScriptFile';
import { DirectoryFact } from '../directory/directoryFact';

type BaseFileFact = {
  file: TypeScriptFile;
  directoryFact: DirectoryFact;
};

type FileFactPrototype = {
  get zorn(): string;
  get nodeLocator(): GraphConstituentLocator;
};

/**
 * Presentation metadata for a file. A piece of knowledge.
 */
export type FileFact = ObjectWithPrototype<BaseFileFact, FileFactPrototype>;

export const { FileFactInstance } = buildConstructorFunctionWithName(
  'FileFactInstance',
)<BaseFileFact, FileFactPrototype, FileFact>({
  zorn: (fileFact) => {
    return getZorn([fileFact.file.zorn, 'fact']);
  },
  nodeLocator: (fileFact) => {
    return new GraphConstituentLocatorInstance({
      idOverride: getZornableId({ zorn: getZorn([fileFact.zorn, 'node']) }),
      rootGraphLocator: fileFact.directoryFact.boundaryFact.rootGraphLocator,
      parentId: fileFact.directoryFact.subgraphId,
      localZorn: LocalDirectedGraphElement2Zorn.buildNodeZorn({
        distinguisher: fileFact.file.filePath,
      }),
    });
  },
});

export const FILE_FACT_GEPP = 'file-fact';

type FileFactGepp = typeof FILE_FACT_GEPP;

export type FileFactVoque = InMemoryOdeshin2ListVoque<FileFactGepp, FileFact>;
