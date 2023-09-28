import { InMemoryOdeshin3Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../../utilities/types/simplify';
import { BoundaryZorn } from './boundary';
import { BoundaryTypeName } from './boundaryTypeName';

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

      const zorn = new BoundaryZorn({
        typeName: BoundaryTypeName.Unspecified,
        displayName,
      });

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
    displayName: 'Core Engine',
    directoryPath: 'packages/voictents-and-estinants-engine/src/core',
  }),
  new BoundaryConfigurationInstance({
    displayName: 'Adapted Engine',
    directoryPath: 'packages/voictents-and-estinants-engine/src/adapter/engine',
  }),
  new BoundaryConfigurationInstance({
    displayName: 'Estinant Builder',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/adapter/estinant-builder',
  }),
  new BoundaryConfigurationInstance({
    displayName: 'Odeshin',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/adapter/odeshin',
  }),
  new BoundaryConfigurationInstance({
    displayName: 'Core Test Programs',
    directoryPath: 'packages/voictents-and-estinants-engine/src/core-programs',
  }),
];
