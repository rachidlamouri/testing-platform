import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { LayerZorn } from './layerZorn';

type LayerConfigurationConstructorInput = {
  directoryPath: string;
  displayName: string;
  sortOrder: number;
};

/**
 * Input information to construct a layer
 */
export type LayerConfiguration = SimplifyN<
  [
    {
      id: LayerZorn;
    },
    LayerConfigurationConstructorInput,
  ]
>;

const { LayerConfigurationInstance } = buildNamedConstructorFunction({
  constructorName: 'LayerConfigurationInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'directoryPath',
    'displayName',
    'sortOrder',
  ] as const satisfies readonly (keyof LayerConfiguration)[],
})
  .withTypes<LayerConfigurationConstructorInput, LayerConfiguration>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { directoryPath, displayName } = input;

      return {
        id: new LayerZorn({
          directoryPath,
          displayName,
        }),
        ...input,
      } satisfies LayerConfiguration;
    },
  })
  .assemble();

export const LAYER_CONFIGURATION_GEPP = 'layer-configuration';

type LayerConfigurationGepp = typeof LAYER_CONFIGURATION_GEPP;

export type LayerConfigurationVoque = InMemoryIdentifiableItem3StreamMetatype<
  LayerConfigurationGepp,
  LayerConfiguration
>;

export const LAYER_CONFIGURATION_LIST: LayerConfiguration[] = [
  new LayerConfigurationInstance({
    directoryPath: 'packages/voictents-and-estinants-engine/src/core',
    displayName: 'Core Layer',
    sortOrder: 1,
  }),
  new LayerConfigurationInstance({
    directoryPath: 'packages/voictents-and-estinants-engine/src/core-programs',
    displayName: 'Core Program Layer',
    sortOrder: 2,
  }),
  new LayerConfigurationInstance({
    directoryPath: 'packages/voictents-and-estinants-engine/src/adapter',
    displayName: 'Adapter Layer',
    sortOrder: 3,
  }),
  new LayerConfigurationInstance({
    directoryPath:
      'packages/voictents-and-estinants-engine/src/adapted-programs',
    displayName: 'Adapted Program Layer',
    sortOrder: 4,
  }),
  new LayerConfigurationInstance({
    directoryPath:
      'packages/voictents-and-estinants-engine/src/layer-agnostic-utilities',
    displayName: 'Layer-Agnostic Layer',
    sortOrder: 5,
  }),
  new LayerConfigurationInstance({
    directoryPath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities',
    displayName: 'Package-Agnostic Layer',
    sortOrder: 5,
  }),
];
