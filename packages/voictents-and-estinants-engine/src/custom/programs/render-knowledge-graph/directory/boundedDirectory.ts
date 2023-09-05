import { posix } from 'path';
import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';
import { Directory } from '../../../programmable-units/file/directory';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import { LocalDirectedGraphElement2Zorn } from '../../../programmable-units/graph-visualization/directed-graph/types';
import { Boundary, BoundaryZorn } from '../boundary/boundary';
import { CommonBoundaryRoot } from '../common-boundary-root/commonBoundaryRoot';

const BOUNDED_DIRECTORY_ZORN_TEMPLATE = [
  ['boundary', BoundaryZorn],
  ['directory', FileSystemNodeZorn],
] as const satisfies GenericZorn2Template;
type BoundedDirectoryZornTemplate = typeof BOUNDED_DIRECTORY_ZORN_TEMPLATE;
export class BoundedDirectoryZorn extends Zorn2<BoundedDirectoryZornTemplate> {
  get rawTemplate(): BoundedDirectoryZornTemplate {
    return BOUNDED_DIRECTORY_ZORN_TEMPLATE;
  }
}

type BoundedDirectoryConstructorInput = {
  boundary: Boundary;
  // parentDirectory: Directory;
  directory: Directory;
  commonBoundaryRoot: CommonBoundaryRoot;
};

export type BoundedDirectory = SimplifyN<
  [
    { zorn: BoundedDirectoryZorn },
    Omit<BoundedDirectoryConstructorInput, 'commonBoundaryRoot'>,
    {
      directoryPathRelativeToCommonBoundary: string;
      isBoundaryDirectory: boolean;
      localSubgraphZorn: LocalDirectedGraphElement2Zorn;
    },
  ]
>;

export const { BoundedDirectoryInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundedDirectoryInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'boundary',
    // 'parentDirectory',
    'directory',
    'directoryPathRelativeToCommonBoundary',
    'isBoundaryDirectory',
    'localSubgraphZorn',
  ],
} as const)
  .withTypes<BoundedDirectoryConstructorInput, BoundedDirectory>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const {
        boundary,
        // parentDirectory,
        directory,
        commonBoundaryRoot,
      } = input;

      const zorn = new BoundedDirectoryZorn({
        boundary: boundary.zorn,
        directory: directory.zorn,
      });

      const directoryPathRelativeToCommonBoundary = posix.relative(
        commonBoundaryRoot.directoryPath,
        directory.directoryPath,
      );

      const isBoundaryDirectory =
        directory.directoryPath === boundary.directoryPath;

      const localSubgraphZorn =
        LocalDirectedGraphElement2Zorn.buildSubgraphZorn({
          distinguisher: directory.directoryPath,
        });

      return {
        zorn,
        boundary,
        // parentDirectory,
        directory,
        directoryPathRelativeToCommonBoundary,
        isBoundaryDirectory,
        localSubgraphZorn,
      };
    },
  })
  .assemble();

export const BOUNDED_DIRECTORY_GEPP = 'bounded-directory';

type BoundedDirectoryGepp = typeof BOUNDED_DIRECTORY_GEPP;

export type BoundedDirectoryVoque = InMemoryOdeshin2ListVoque<
  BoundedDirectoryGepp,
  BoundedDirectory
>;
