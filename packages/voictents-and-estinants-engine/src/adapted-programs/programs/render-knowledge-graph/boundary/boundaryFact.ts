import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { Metadata } from '../app/browser/dynamicComponentTypes';
import { CommonBoundaryRoot } from '../common-boundary-root/commonBoundaryRoot';
import { Boundary, BoundaryId } from './boundary';

type BoundaryFactConstructorInput = {
  boundary: Boundary;
  commonBoundaryRoot: CommonBoundaryRoot;
};

/**
 * Contains the graph metadata for a boundary. A piece of knowledge.
 */
type BoundaryFact = SimplifyN<
  [
    { id: BoundaryId },
    Pick<BoundaryFactConstructorInput, 'boundary'>,
    {
      graphMetadata: Metadata;
    },
  ]
>;

export const { BoundaryFactInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundaryFactInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'boundary',
    'graphMetadata',
  ] as const satisfies readonly (keyof BoundaryFact)[],
})
  .withTypes<BoundaryFactConstructorInput, BoundaryFact>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { boundary, commonBoundaryRoot } = input;

      const { id } = boundary;

      const graphMetadata: Metadata = {
        title: boundary.displayName,
        fileSystemPath: boundary.directory.directoryPath.serialized,
        id: id.forMachine,
        fieldList: [
          {
            label: 'Directory Path',
            value: boundary.directory.directoryPath.serialized.replace(
              commonBoundaryRoot.directoryPath,
              '~c',
            ),
          },
        ],
      };

      return {
        id,
        boundary,
        graphMetadata,
      } satisfies BoundaryFact;
    },
  })
  .assemble();

export const BOUNDARY_FACT_GEPP = 'boundary-fact';

type BoundaryFactGepp = typeof BOUNDARY_FACT_GEPP;

export type BoundaryFactVoque = InMemoryIdentifiableItem2ListStreamMetatype<
  BoundaryFactGepp,
  BoundaryFact
>;
