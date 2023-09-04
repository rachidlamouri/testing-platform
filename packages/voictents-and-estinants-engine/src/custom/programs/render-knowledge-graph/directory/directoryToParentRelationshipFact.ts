import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
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
import { BoundaryFact } from '../boundary/boundaryFact';
import { DirectoryFact } from './directoryFact';
import { FactTypeName } from '../boundary/factTypeName';
import { LocalDirectedGraphElement2Zorn } from '../../../programmable-units/graph-visualization/directed-graph/types';

const DIRECTORY_TO_PARENT_RELATIONSHIP_FACT_ZORN_TEMPLATE = [
  // TODO: make these Zorns when DirectoryFact and BoundaryFact have Zorn subclasses
  'parentFact',
  'childDirectoryFact',
] as const satisfies GenericZorn2Template;
type DirectoryToParentRelationshipFactZornTemplate =
  typeof DIRECTORY_TO_PARENT_RELATIONSHIP_FACT_ZORN_TEMPLATE;
class DirectoryToParentRelationshipFactZorn extends Zorn2<DirectoryToParentRelationshipFactZornTemplate> {
  get rawTemplate(): DirectoryToParentRelationshipFactZornTemplate {
    return DIRECTORY_TO_PARENT_RELATIONSHIP_FACT_ZORN_TEMPLATE;
  }
}

type BaseDirectoryToParentRelationshipFact = {
  childDirectoryFact: DirectoryFact;
  inputParentDirectoryFact: DirectoryFact | null;
};

type DirectoryToParentRelationshipFactPrototype = {
  get zorn(): DirectoryToParentRelationshipFactZorn;
  get boundaryFact(): BoundaryFact;
  get parentFact(): DirectoryFact | BoundaryFact;
  get childDirectorySubgraphLocator(): GraphConstituentLocator;
  get childDirectorySubgraphLabel(): string;
};

/**
 * The relationship between a directory fact and its parent fact: another
 * directory fact or a boundary fact. This includes metadata for graph elements
 * related to a directory and its parent subgraph information
 */
type DirectoryToParentRelationshipFact = ObjectWithPrototype<
  BaseDirectoryToParentRelationshipFact,
  DirectoryToParentRelationshipFactPrototype
>;

export const { DirectoryToParentRelationshipFactInstance } =
  buildConstructorFunctionWithName('DirectoryToParentRelationshipFactInstance')<
    BaseDirectoryToParentRelationshipFact,
    DirectoryToParentRelationshipFactPrototype,
    DirectoryToParentRelationshipFact
  >({
    zorn: memoizeGetter((relationshipFact) => {
      return new DirectoryToParentRelationshipFactZorn({
        parentFact:
          typeof relationshipFact.parentFact.zorn === 'string'
            ? relationshipFact.parentFact.zorn
            : relationshipFact.parentFact.zorn.forHuman,
        childDirectoryFact: relationshipFact.childDirectoryFact.zorn,
      });
    }),
    boundaryFact: (relationshipFact) => {
      return relationshipFact.childDirectoryFact.boundaryFact;
    },
    parentFact: (relationshipFact) => {
      return (
        relationshipFact.inputParentDirectoryFact ??
        relationshipFact.boundaryFact
      );
    },
    childDirectorySubgraphLocator: (relationshipFact) => {
      const { parentFact } = relationshipFact;
      const parentId =
        parentFact.typeName === FactTypeName.BoundaryFact
          ? parentFact.rootGraphLocator.id
          : parentFact.subgraphId;

      return new GraphConstituentLocatorInstance({
        idOverride: relationshipFact.childDirectoryFact.subgraphId,
        rootGraphLocator:
          relationshipFact.childDirectoryFact.boundaryFact.rootGraphLocator,
        parentId,
        localZorn: LocalDirectedGraphElement2Zorn.buildClusterZorn({
          distinguisher:
            relationshipFact.childDirectoryFact.directory.directoryPath,
        }),
      });
    },
    childDirectorySubgraphLabel: (relationshipFact) => {
      if (relationshipFact.parentFact.typeName === FactTypeName.BoundaryFact) {
        return `${relationshipFact.parentFact.directoryPathRelativeToCommonBoundary}/`;
      }

      return `${relationshipFact.childDirectoryFact.directoryPathRelativeToParentDirectory}/`;
    },
  });

export const DIRECTORY_TO_PARENT_RELATIONSHIP_FACT_GEPP =
  'directory-to-parent-relationship-fact';

type DirectoryToParentRelationshipFactGepp =
  typeof DIRECTORY_TO_PARENT_RELATIONSHIP_FACT_GEPP;

export type DirectoryToParentRelationshipFactVoque = InMemoryOdeshin2ListVoque<
  DirectoryToParentRelationshipFactGepp,
  DirectoryToParentRelationshipFact
>;
