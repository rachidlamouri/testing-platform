import { posix } from 'path';
import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';
import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';
import { CommonBoundaryRoot } from '../common-boundary-root/commonBoundaryRoot';
import { Boundary, BoundaryZorn } from './boundary';
import {
  RootGraphLocator,
  RootGraphLocatorInstance,
} from '../../../programmable-units/graph-visualization/directed-graph/rootGraphLocator';
import { FactTypeName } from './factTypeName';

const BOUNDARY_FACT_ZORN_TEMPLATE = [
  ['boundary', BoundaryZorn],
] as const satisfies GenericZorn2Template;
type BoundaryFactZornTemplate = typeof BOUNDARY_FACT_ZORN_TEMPLATE;
class BoundaryFactZorn extends Zorn2<BoundaryFactZornTemplate> {
  get rawTemplate(): BoundaryFactZornTemplate {
    return BOUNDARY_FACT_ZORN_TEMPLATE;
  }
}

type BoundaryFactConstructorInput = {
  boundary: Boundary;
  commonBoundaryRoot: CommonBoundaryRoot;
};

/**
 * Presentation metadata for a boundary. A piece of knowledge.
 */
export type BoundaryFact = SimplifyN<
  [
    { zorn: BoundaryFactZorn },
    Pick<BoundaryFactConstructorInput, 'boundary'>,
    {
      typeName: FactTypeName.BoundaryFact;
      rootGraphLocator: RootGraphLocator;
      directoryPathRelativeToCommonBoundary: string;
    },
  ]
>;

export const { BoundaryFactInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundaryFactInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'boundary',
    'typeName',
    'rootGraphLocator',
    'directoryPathRelativeToCommonBoundary',
  ],
} as const)
  .withTypes<BoundaryFactConstructorInput, BoundaryFact>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { boundary, commonBoundaryRoot } = input;

      const zorn = new BoundaryFactZorn({
        boundary: boundary.zorn,
      });

      const rootGraphLocator = new RootGraphLocatorInstance({
        idOverride: getZornableId({
          zorn: getZorn([zorn.forHuman, 'graph']),
        }),
        distinguisher: boundary.displayName,
      });

      const directoryPathRelativeToCommonBoundary = posix.relative(
        commonBoundaryRoot.directoryPath,
        boundary.directory.directoryPath,
      );

      return {
        zorn,
        typeName: FactTypeName.BoundaryFact,
        boundary,
        rootGraphLocator,
        directoryPathRelativeToCommonBoundary,
      };
    },
  })
  .assemble();

export const BOUNDARY_FACT_GEPP = 'boundary-fact';

type BoundaryFactGepp = typeof BOUNDARY_FACT_GEPP;

export type BoundaryFactVoque = InMemoryOdeshin2ListVoque<
  BoundaryFactGepp,
  BoundaryFact
>;
