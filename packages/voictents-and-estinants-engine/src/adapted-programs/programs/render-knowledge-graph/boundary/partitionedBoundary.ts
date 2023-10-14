import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
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
      id: BoundaryZorn;
    },
    PartitionedBoundaryConstructorInput,
  ]
>;

export const { PartitionedBoundaryInstance } = buildNamedConstructorFunction({
  constructorName: 'PartitionedBoundaryInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'partitionFact',
    'boundary',
  ],
} as const)
  .withTypes<PartitionedBoundaryConstructorInput, PartitionedBoundary>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { partitionFact, boundary } = input;

      return {
        id: boundary.id,
        partitionFact,
        boundary,
      };
    },
  })
  .assemble();

export const PARTITIONED_BOUNDARY_GEPP = 'partitioned-boundary';

type PartitionedBoundaryGepp = typeof PARTITIONED_BOUNDARY_GEPP;

export type PartitionedBoundaryVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    PartitionedBoundaryGepp,
    PartitionedBoundary
  >;
