import { InMemoryOdeshin3Voque } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { BoundaryZorn } from './boundary';
import { BoundaryTypeName } from './boundaryTypeName';

type BoundaryConfigurationConstructorInput = {
  typeName: BoundaryTypeName;
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
    'typeName',
    'zorn',
    'displayName',
    'directoryPath',
  ],
} as const)
  .withTypes<BoundaryConfigurationConstructorInput, BoundaryConfiguration>({
    typeCheckErrorMessage: {
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
    typeName: BoundaryTypeName.Engine,
    displayName: 'Core Engine',
    directoryPath: 'packages/voictents-and-estinants-engine/src/core/engine',
  }),
  new BoundaryConfigurationInstance({
    typeName: BoundaryTypeName.Utility,
    displayName: 'Core Types',
    directoryPath: 'packages/voictents-and-estinants-engine/src/core/types',
  }),
  new BoundaryConfigurationInstance({
    typeName: BoundaryTypeName.Utility,
    displayName: 'Adapted Engine',
    directoryPath: 'packages/voictents-and-estinants-engine/src/adapter/engine',
  }),
  new BoundaryConfigurationInstance({
    typeName: BoundaryTypeName.Utility,
    displayName: 'Estinant Builder',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/adapter/programmed-transform-builder',
  }),
  new BoundaryConfigurationInstance({
    typeName: BoundaryTypeName.Utility,
    displayName: 'Odeshin',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/adapter/identifiable-item',
  }),
  new BoundaryConfigurationInstance({
    typeName: BoundaryTypeName.TestProgram,
    displayName: 'Core Test Programs',
    directoryPath: 'packages/voictents-and-estinants-engine/src/core-programs',
  }),
];
