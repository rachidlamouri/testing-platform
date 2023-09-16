import { InMemoryOdeshin3Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../../utilities/simplify';
import { BoundaryZorn } from './boundary';

type BoundaryConfigurationConstructorInput = {
  displayName: string;
  directoryPath: string;
};

/**
 * The minimum amount of static information needed to instantiate a boundary.
 */
type BoundaryConfiguration = SimplifyN<
  [
    {
      zorn: BoundaryZorn;
    },
    BoundaryConfigurationConstructorInput,
  ]
>;

const { BoundaryConfigurationInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundaryConfigurationInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'displayName',
    'directoryPath',
  ],
} as const)
  .withTypes<BoundaryConfigurationConstructorInput, BoundaryConfiguration>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { displayName } = input;

      const zorn = new BoundaryZorn(displayName);

      return {
        zorn,
        ...input,
      };
    },
  })
  .assemble();

export const BOUNDARY_CONFIGURATION_GEPP = 'boundary-configuration';

type BoundaryConfigurationGepp = typeof BOUNDARY_CONFIGURATION_GEPP;

export type BoundaryConfigurationVoque = InMemoryOdeshin3Voque<
  BoundaryConfigurationGepp,
  BoundaryConfiguration
>;

export const BOUNDARY_CONFIGURATION_LIST: BoundaryConfiguration[] = [
  new BoundaryConfigurationInstance({
    displayName: 'Core Layer',
    directoryPath: 'packages/voictents-and-estinants-engine/src/core',
  }),
  new BoundaryConfigurationInstance({
    // TODO: move to adapter
    displayName: 'Custom Adapter',
    directoryPath: 'packages/voictents-and-estinants-engine/src/custom/adapter',
  }),
  new BoundaryConfigurationInstance({
    // TODO: split these up by program and shared boundaries
    displayName: 'Programmable Units',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/custom/programmable-units',
  }),
  new BoundaryConfigurationInstance({
    displayName: 'Example Programs',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/example-programs',
  }),
  new BoundaryConfigurationInstance({
    displayName: 'Adapter Layer',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/type-script-adapter',
  }),
  new BoundaryConfigurationInstance({
    displayName: 'Utilities',
    directoryPath: 'packages/voictents-and-estinants-engine/src/utilities',
  }),
];