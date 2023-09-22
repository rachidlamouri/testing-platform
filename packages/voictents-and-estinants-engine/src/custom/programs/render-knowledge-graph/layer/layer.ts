import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../../utilities/simplify';
import { Directory } from '../../../programmable-units/file/directory';
import { LayerConfiguration } from './layerConfiguration';

type LayerConstructorInput = {
  layerConfiguration: LayerConfiguration;
  directory: Directory;
};

/**
 * A group of boundaries. Boundaries in a layer may have similar roles, but for
 * different purposes. Eg. all adapted programs are in the adapted program
 * layer, but each program is different.
 */
export type Layer = SimplifyN<
  [
    Omit<LayerConfiguration, 'directoryPath'>,
    {
      directory: Directory;
    },
  ]
>;

export const { LayerInstance } = buildNamedConstructorFunction({
  constructorName: 'LayerInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'displayName',
    'directory',
    'sortOrder',
  ] as const satisfies readonly (keyof Layer)[],
})
  .withTypes<LayerConstructorInput, Layer>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { layerConfiguration, directory } = input;

      return {
        ...layerConfiguration,
        directory,
      } satisfies Layer;
    },
  })
  .assemble();

export const LAYER_GEPP = 'layer';

type LayerGepp = typeof LAYER_GEPP;

export type LayerVoque = InMemoryOdeshin2ListVoque<LayerGepp, Layer>;
