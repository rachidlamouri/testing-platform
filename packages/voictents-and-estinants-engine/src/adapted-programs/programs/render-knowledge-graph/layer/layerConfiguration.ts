import { InMemoryOdeshin3Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../../utilities/types/simplify';
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
      zorn: LayerZorn;
    },
    LayerConfigurationConstructorInput,
  ]
>;

const { LayerConfigurationInstance } = buildNamedConstructorFunction({
  constructorName: 'LayerConfigurationInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'directoryPath',
    'displayName',
    'sortOrder',
  ] as const satisfies readonly (keyof LayerConfiguration)[],
})
  .withTypes<LayerConfigurationConstructorInput, LayerConfiguration>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { directoryPath, displayName } = input;

      return {
        zorn: new LayerZorn({
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

export type LayerConfigurationVoque = InMemoryOdeshin3Voque<
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
    directoryPath: 'packages/voictents-and-estinants-engine/src/utilities',
    displayName: 'Layer-Agnostic ... Layer',
    sortOrder: 5,
  }),
];
