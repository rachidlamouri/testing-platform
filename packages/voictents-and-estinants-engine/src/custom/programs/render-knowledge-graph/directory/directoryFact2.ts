import { posix } from 'path';
import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { assertNotNull } from '../../../../utilities/assertNotNull';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';
import { GraphConstituentLocatorInstance } from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { BoundaryFact, BoundaryFactZorn } from '../boundary/boundaryFact';
import { THEME } from '../theme';
import { BoundedDirectory, BoundedDirectoryZorn } from './boundedDirectory';
import {
  DirectedCluster2,
  DirectedCluster2Instance,
} from '../../../programmable-units/graph-visualization/directed-graph/directedCluster2';

const DIRECTORY_FACT_2_ZORN_TEMPLATE = [
  ['boundaryFact', BoundaryFactZorn],
  ['boundedDirectory', BoundedDirectoryZorn],
] as const satisfies GenericZorn2Template;
type DirectoryFact2ZornTemplate = typeof DIRECTORY_FACT_2_ZORN_TEMPLATE;
class DirectoryFact2Zorn extends Zorn2<DirectoryFact2ZornTemplate> {
  get rawTemplate(): DirectoryFact2ZornTemplate {
    return DIRECTORY_FACT_2_ZORN_TEMPLATE;
  }
}

type DirectoryFact2ConstructorInput = {
  boundaryFact: BoundaryFact;
  parentBoundedDirectory: BoundedDirectory | null;
  boundedDirectory: BoundedDirectory;
};

type DirectoryFact2 = SimplifyN<
  [
    { zorn: DirectoryFact2Zorn },
    DirectoryFact2ConstructorInput,
    {
      subgraph: DirectedCluster2;
    },
  ]
>;

export const { DirectoryFact2Instance } = buildNamedConstructorFunction({
  constructorName: 'DirectoryFact2Instance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'boundaryFact',
    'boundedDirectory',
    'parentBoundedDirectory',
    'subgraph',
  ],
} as const)
  .withTypes<DirectoryFact2ConstructorInput, DirectoryFact2>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { boundaryFact, parentBoundedDirectory, boundedDirectory } = input;

      let parentId: string;
      // const label = boundedDirectory.directory.directoryPath;
      let label: string;
      if (boundedDirectory.isBoundaryDirectory) {
        parentId = boundaryFact.rootGraphLocator.id;
        label = boundaryFact.directoryPathRelativeToCommonBoundary + posix.sep;
      } else {
        assertNotNull(parentBoundedDirectory);
        parentId = parentBoundedDirectory.localSubgraphZorn.forMachine;
        label = boundedDirectory.directory.directoryName + posix.sep;
      }

      const zorn = new DirectoryFact2Zorn({
        boundaryFact: boundaryFact.zorn,
        boundedDirectory: boundedDirectory.zorn,
      });

      const subgraph = new DirectedCluster2Instance({
        locator: new GraphConstituentLocatorInstance({
          rootGraphLocator: boundaryFact.rootGraphLocator,
          parentId,
          localZorn: boundedDirectory.localSubgraphZorn,
        }),
        inputAttributeByKey: {
          label,
          ...THEME.directorySubgraph,
        },
      });

      return {
        zorn,
        boundaryFact,
        parentBoundedDirectory,
        boundedDirectory,
        subgraph,
      };
    },
  })
  .assemble();

export const DIRECTORY_FACT_2_GEPP = 'directory-fact-2';

type DirectoryFact2Gepp = typeof DIRECTORY_FACT_2_GEPP;

export type DirectoryFact2Voque = InMemoryOdeshin2ListVoque<
  DirectoryFact2Gepp,
  DirectoryFact2
>;
