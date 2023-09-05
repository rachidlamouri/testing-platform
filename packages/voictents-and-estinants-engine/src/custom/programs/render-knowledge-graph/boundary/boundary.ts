import { InMemoryOdeshin3Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';

const BOUNDARY_ZORN_TEMPLATE = [
  'normalizedDisplayName',
] as const satisfies GenericZorn2Template;
type BoundaryZornTemplate = typeof BOUNDARY_ZORN_TEMPLATE;
export class BoundaryZorn extends Zorn2<BoundaryZornTemplate> {
  get rawTemplate(): BoundaryZornTemplate {
    return BOUNDARY_ZORN_TEMPLATE;
  }
}

type BoundaryConstructorInput = {
  displayName: string;
  directoryPath: string;
};

/**
 * A group of files and directories in the project with some related concerns, or purpose
 */
export type Boundary = SimplifyN<
  [
    {
      zorn: BoundaryZorn;
    },
    BoundaryConstructorInput,
  ]
>;

export const { BoundaryInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundaryInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'displayName',
    'directoryPath',
  ],
} as const)
  .withTypes<BoundaryConstructorInput, Boundary>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { displayName } = input;

      const normalizedDisplayName = displayName.replaceAll(/(:|\s+),'-'/g, '');
      const zorn = new BoundaryZorn({
        normalizedDisplayName,
      });

      return {
        zorn,
        ...input,
      };
    },
  })
  .assemble();

export const BOUNDARY_GEPP = 'boundary';

type BoundaryGepp = typeof BOUNDARY_GEPP;

export type BoundaryVoque = InMemoryOdeshin3Voque<BoundaryGepp, Boundary>;

export const STATIC_BOUNDARY_LIST: Boundary[] = [
  new BoundaryInstance({
    displayName: 'Core Layer',
    directoryPath: 'packages/voictents-and-estinants-engine/src/core',
  }),
  new BoundaryInstance({
    // TODO: move to adapter
    displayName: 'Custom Adapter',
    directoryPath: 'packages/voictents-and-estinants-engine/src/custom/adapter',
  }),
  new BoundaryInstance({
    // TODO: split these up by program and shared boundaries
    displayName: 'Programmable Units',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/custom/programmable-units',
  }),
  new BoundaryInstance({
    displayName: 'Example Programs',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/example-programs',
  }),
  new BoundaryInstance({
    displayName: 'Adapter Layer',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/type-script-adapter',
  }),
  new BoundaryInstance({
    displayName: 'Utilities',
    directoryPath: 'packages/voictents-and-estinants-engine/src/utilities',
  }),
];
