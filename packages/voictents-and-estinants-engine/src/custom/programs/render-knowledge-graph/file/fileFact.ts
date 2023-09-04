import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';
import {
  GraphConstituentLocator,
  GraphConstituentLocatorInstance,
} from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { LocalDirectedGraphElement2Zorn } from '../../../programmable-units/graph-visualization/directed-graph/types';
import { TypeScriptFile } from '../../../programmable-units/type-script-file/typeScriptFile';
import { DirectoryFact } from '../directory/directoryFact';
import { SimplifyN } from '../../../../utilities/simplify';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';

type FileFactConstructorInput = {
  file: TypeScriptFile;
  directoryFact: DirectoryFact;
};

/**
 * Presentation metadata for a file. A piece of knowledge.
 */
export type FileFact = SimplifyN<
  [
    { zorn: string },
    FileFactConstructorInput,
    {
      nodeLocator: GraphConstituentLocator;
    },
  ]
>;

export const { FileFactInstance } = buildNamedConstructorFunction({
  constructorName: 'FileFactInstance',
  instancePropertyNameTuple: ['file', 'directoryFact', 'zorn', 'nodeLocator'],
} as const)
  .withTypes<FileFactConstructorInput, FileFact>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (partialFileFact) => {
      const { file, directoryFact } = partialFileFact;
      const zorn = getZorn([file.filePath, 'fact']);
      const nodeLocator = new GraphConstituentLocatorInstance({
        idOverride: getZornableId({
          zorn: getZorn([zorn, 'node']),
        }),
        rootGraphLocator: directoryFact.boundaryFact.rootGraphLocator,
        parentId: directoryFact.subgraphId,
        localZorn: LocalDirectedGraphElement2Zorn.buildNodeZorn({
          distinguisher: file.filePath,
        }),
      });

      const fileFact: FileFact = {
        ...partialFileFact,
        zorn,
        nodeLocator,
      };

      return fileFact;
    },
  })
  .assemble();

export const FILE_FACT_GEPP = 'file-fact';

type FileFactGepp = typeof FILE_FACT_GEPP;

export type FileFactVoque = InMemoryOdeshin2ListVoque<FileFactGepp, FileFact>;
