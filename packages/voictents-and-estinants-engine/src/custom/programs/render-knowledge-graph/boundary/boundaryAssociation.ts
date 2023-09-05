import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';
import { Boundary, BoundaryZorn } from './boundary';

const BOUNDARY_ASSOCIATION_ZORN_TEMPLATE = [
  ['referencingBoundary', BoundaryZorn],
  ['referencedBoundary', BoundaryZorn],
] as const satisfies GenericZorn2Template;
type BoundaryAssociationZornTemplate =
  typeof BOUNDARY_ASSOCIATION_ZORN_TEMPLATE;
class BoundaryAssociationZorn extends Zorn2<BoundaryAssociationZornTemplate> {
  get rawTemplate(): BoundaryAssociationZornTemplate {
    return BOUNDARY_ASSOCIATION_ZORN_TEMPLATE;
  }
}

type BoundaryAssociationConstructorInput = {
  referencingBoundary: Boundary;
  referencedBoundary: Boundary;
};

/**
 * Defines a relationship between two boundaries without defining the direction
 * of that relationship (ie. importing vs imported). A boundary can be
 * associated with itself so that it appears in its own directed graph
 */
type BoundaryAssociation = SimplifyN<
  [
    {
      zorn: BoundaryAssociationZorn;
    },
    BoundaryAssociationConstructorInput,
  ]
>;

export const { BoundaryAssociationInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundaryAssociationInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'referencingBoundary',
    'referencedBoundary',
  ],
} as const)
  .withTypes<BoundaryAssociationConstructorInput, BoundaryAssociation>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { referencingBoundary, referencedBoundary } = input;

      const zorn = new BoundaryAssociationZorn({
        referencingBoundary: referencingBoundary.zorn,
        referencedBoundary: referencedBoundary.zorn,
      });

      return {
        zorn,
        ...input,
      };
    },
  })
  .assemble();

export const BOUNDARY_ASSOCIATION_GEPP = 'boundary-association';

type BoundaryAssociationGepp = typeof BOUNDARY_ASSOCIATION_GEPP;

export type BoundaryAssociationVoque = InMemoryOdeshin2ListVoque<
  BoundaryAssociationGepp,
  BoundaryAssociation
>;
