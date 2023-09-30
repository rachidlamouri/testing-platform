import { InMemoryOdeshin2ListVoque } from '../../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { PartitionFact } from '../partition-fact/partitionFact';
import { Boundary, BoundaryZorn } from './boundary';

type PartitionedBoundaryConstructorInput = {
  partitionFact: PartitionFact;
  boundary: Boundary;
};

/**
 * A boundary and the primary partition that represents the boundary
 */
export type PartitionedBoundary = SimplifyN<
  [
    {
      zorn: BoundaryZorn;
    },
    PartitionedBoundaryConstructorInput,
  ]
>;

export const { PartitionedBoundaryInstance } = buildNamedConstructorFunction({
  constructorName: 'PartitionedBoundaryInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'partitionFact',
    'boundary',
  ],
} as const)
  .withTypes<PartitionedBoundaryConstructorInput, PartitionedBoundary>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { partitionFact, boundary } = input;

      return {
        zorn: boundary.zorn,
        partitionFact,
        boundary,
      };
    },
  })
  .assemble();

export const PARTITIONED_BOUNDARY_GEPP = 'partitioned-boundary';

type PartitionedBoundaryGepp = typeof PARTITIONED_BOUNDARY_GEPP;

export type PartitionedBoundaryVoque = InMemoryOdeshin2ListVoque<
  PartitionedBoundaryGepp,
  PartitionedBoundary
>;
