import { InMemoryOdeshin3Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../../utilities/simplify';
import { LayerZorn } from './layerZorn';

type LayerConfigurationConstructorInput = {
  directoryPath: string;
  displayName: string;
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

export const { LayerConfigurationInstance } = buildNamedConstructorFunction({
  constructorName: 'LayerConfigurationInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'directoryPath',
    'displayName',
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
  }),
  new LayerConfigurationInstance({
    directoryPath: 'packages/voictents-and-estinants-engine/src/custom/adapter',
    displayName: 'Adapter Layer',
  }),
  new LayerConfigurationInstance({
    directoryPath:
      'packages/voictents-and-estinants-engine/src/custom/programs',
    displayName: 'Program Layer',
  }),
];
