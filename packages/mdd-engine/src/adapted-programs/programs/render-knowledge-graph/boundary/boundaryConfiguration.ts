import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { BoundaryId } from './boundary';
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
      id: BoundaryId;
    },
    BoundaryConfigurationConstructorInput,
  ]
>;

const { BoundaryConfigurationInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundaryConfigurationInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'typeName',
    'id',
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

      const id = new BoundaryId({
        typeName: BoundaryTypeName.Unspecified,
        displayName,
      });

      return {
        id,
        ...input,
      };
    },
  })
  .assemble();

export const BOUNDARY_CONFIGURATION_COLLECTION_ID = 'boundary-configuration';

type BoundaryConfigurationCollectionId =
  typeof BOUNDARY_CONFIGURATION_COLLECTION_ID;

export type BoundaryConfigurationStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    BoundaryConfigurationCollectionId,
    BoundaryConfiguration
  >;

export const BOUNDARY_CONFIGURATION_LIST: BoundaryConfiguration[] = [
  new BoundaryConfigurationInstance({
    typeName: BoundaryTypeName.Engine,
    displayName: 'Core Engine',
    directoryPath: 'packages/mdd-engine/src/core/engine',
  }),
  new BoundaryConfigurationInstance({
    typeName: BoundaryTypeName.Utility,
    displayName: 'Core Types',
    directoryPath: 'packages/mdd-engine/src/core/types',
  }),
  new BoundaryConfigurationInstance({
    typeName: BoundaryTypeName.Utility,
    displayName: 'Adapted Engine',
    directoryPath: 'packages/mdd-engine/src/adapter/engine',
  }),
  new BoundaryConfigurationInstance({
    typeName: BoundaryTypeName.Utility,
    displayName: 'Estinant Builder',
    directoryPath:
      'packages/mdd-engine/src/adapter/programmed-transform-builder',
  }),
  new BoundaryConfigurationInstance({
    typeName: BoundaryTypeName.Utility,
    displayName: 'Odeshin',
    directoryPath: 'packages/mdd-engine/src/adapter/identifiable-item',
  }),
  new BoundaryConfigurationInstance({
    typeName: BoundaryTypeName.TestProgram,
    displayName: 'Core Test Programs',
    directoryPath: 'packages/mdd-engine/src/core-programs',
  }),
];
