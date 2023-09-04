import { posix } from 'path';
import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';
import { Directory } from '../../../programmable-units/file/directory';
import { BoundaryFact } from '../boundary/boundaryFact';
import { FactTypeName } from '../boundary/factTypeName';
import { SimplifyN } from '../../../../utilities/simplify';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';

type DirectoryFactConstructorInput = {
  directory: Directory;
  boundaryFact: BoundaryFact;
};

/**
 * Presentation metadata for a directory. A piece of knowledge.
 */
export type DirectoryFact = SimplifyN<
  [
    { zorn: string },
    DirectoryFactConstructorInput,
    {
      typeName: FactTypeName.DirectoryFact;

      subgraphZorn: string;
      subgraphId: string;
      directoryPathRelativeToParentDirectory: string;
      isBoundaryDirectory: boolean;
    },
  ]
>;

export const { DirectoryFactInstance } = buildNamedConstructorFunction({
  constructorName: 'DirectoryFactInstance',
  instancePropertyNameTuple: [
    'directory',
    'boundaryFact',
    'typeName',
    'zorn',
    'subgraphZorn',
    'subgraphId',
    'directoryPathRelativeToParentDirectory',
    'isBoundaryDirectory',
  ],
} as const)
  .withTypes<DirectoryFactConstructorInput, DirectoryFact>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (partialDirectoryFact) => {
      const { directory, boundaryFact } = partialDirectoryFact;

      const typeName = FactTypeName.DirectoryFact;
      const zorn = getZorn([
        boundaryFact.zorn.forHuman,
        'directory',
        directory.directoryPath,
        'fact',
      ]);
      const subgraphZorn = getZorn([zorn, 'subgraph']);
      const subgraphId = getZornableId({ zorn: subgraphZorn });
      const directoryPathRelativeToParentDirectory = posix.relative(
        directory.parentDirectoryPath,
        directory.directoryPath,
      );
      const isBoundaryDirectory =
        directory.directoryPath === boundaryFact.boundary.directoryPath;

      const directoryFact: DirectoryFact = {
        ...partialDirectoryFact,
        typeName,
        zorn,
        subgraphZorn,
        subgraphId,
        directoryPathRelativeToParentDirectory,
        isBoundaryDirectory,
      };

      return directoryFact;
    },
  })
  .assemble();

export const DIRECTORY_FACT_GEPP = 'directory-fact';

type DirectoryFactGepp = typeof DIRECTORY_FACT_GEPP;

export type DirectoryFactVoque = InMemoryOdeshin2ListVoque<
  DirectoryFactGepp,
  DirectoryFact
>;
