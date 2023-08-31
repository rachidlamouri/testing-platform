import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
  memoizeGetter,
} from '../../../../utilities/buildConstructorFunction';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import {
  GraphConstituentLocator,
  GraphConstituentLocatorInstance,
} from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { AssociatedBoundaryFact } from '../associated-boundary/associatedBoundaryFact';
import { FileFact } from './fileFact';

const CROSS_BOUNDARY_FILE_FACT_ZORN_TEMPLATE = [
  'boundary',
  'importedFile',
] as const satisfies GenericZorn2Template;
type CrossBoundaryFileFactZornTemplate =
  typeof CROSS_BOUNDARY_FILE_FACT_ZORN_TEMPLATE;
class CrossBoundaryFileFactZorn extends Zorn2<CrossBoundaryFileFactZornTemplate> {
  get rawTemplate(): CrossBoundaryFileFactZornTemplate {
    return CROSS_BOUNDARY_FILE_FACT_ZORN_TEMPLATE;
  }
}

type BaseCrossBoundaryFileFact = {
  associatedBoundaryFact: AssociatedBoundaryFact;
  fileFact: FileFact;
};

type CrossBoundaryFileFactPrototype = {
  get zorn(): CrossBoundaryFileFactZorn;
  get importedFileNodeLocator(): GraphConstituentLocator;
};

type CrossBoundaryFileFact = ObjectWithPrototype<
  BaseCrossBoundaryFileFact,
  CrossBoundaryFileFactPrototype
>;

export const { CrossBoundaryFileFactInstance } =
  buildConstructorFunctionWithName('CrossBoundaryFileFactInstance')<
    BaseCrossBoundaryFileFact,
    CrossBoundaryFileFactPrototype,
    CrossBoundaryFileFact
  >({
    zorn: memoizeGetter((crossBoundaryFileFact) => {
      return new CrossBoundaryFileFactZorn({
        boundary:
          crossBoundaryFileFact.associatedBoundaryFact.referencingBoundaryFact
            .zorn,
        importedFile: crossBoundaryFileFact.fileFact.zorn,
      });
    }),
    importedFileNodeLocator: (crossBoundaryFileFact) => {
      return new GraphConstituentLocatorInstance({
        idOverride: crossBoundaryFileFact.fileFact.nodeLocator.id,
        rootGraphLocator:
          crossBoundaryFileFact.associatedBoundaryFact.rootGraphLocator,
        parentId:
          crossBoundaryFileFact.associatedBoundaryFact.subgraphLocator.id,
        localZorn: crossBoundaryFileFact.fileFact.nodeLocator.localZorn,
      });
    },
  });

export const CROSS_BOUNDARY_FILE_FACT_GEPP = 'cross-boundary-file-fact';

type CrossBoundaryFileFactGepp = typeof CROSS_BOUNDARY_FILE_FACT_GEPP;

export type CrossBoundaryFileFactVoque = InMemoryOdeshin2Voque<
  CrossBoundaryFileFactGepp,
  CrossBoundaryFileFact
>;
