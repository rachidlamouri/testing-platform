import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../../utilities/types/simplify';
import { Metadata } from '../app/browser/dynamicComponentTypes';
import { CommonBoundaryRoot } from '../common-boundary-root/commonBoundaryRoot';
import { Boundary, BoundaryZorn } from './boundary';

type BoundaryFactConstructorInput = {
  boundary: Boundary;
  commonBoundaryRoot: CommonBoundaryRoot;
};

/**
 * Contains the graph metadata for a boundary. A piece of knowledge.
 */
type BoundaryFact = SimplifyN<
  [
    { zorn: BoundaryZorn },
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
    'zorn',
    'boundary',
    'graphMetadata',
  ] as const satisfies readonly (keyof BoundaryFact)[],
})
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

      const { zorn } = boundary;

      const graphMetadata: Metadata = {
        title: boundary.displayName,
        fileSystemPath: boundary.directory.directoryPath.serialized,
        id: zorn.forMachine,
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
        zorn,
        boundary,
        graphMetadata,
      } satisfies BoundaryFact;
    },
  })
  .assemble();

export const BOUNDARY_FACT_GEPP = 'boundary-fact';

type BoundaryFactGepp = typeof BOUNDARY_FACT_GEPP;

export type BoundaryFactVoque = InMemoryOdeshin2ListVoque<
  BoundaryFactGepp,
  BoundaryFact
>;
