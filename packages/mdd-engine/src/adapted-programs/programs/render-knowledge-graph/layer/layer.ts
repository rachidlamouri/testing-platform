import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
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
    'id',
    'displayName',
    'directory',
    'sortOrder',
  ] as const satisfies readonly (keyof Layer)[],
})
  .withTypes<LayerConstructorInput, Layer>({
    typeCheckErrorMessage: {
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

export const LAYER_COLLECTION_ID = 'layer';

type LayerCollectionId = typeof LAYER_COLLECTION_ID;

export type LayerStreamMetatype = InMemoryIdentifiableItem3StreamMetatype<
  LayerCollectionId,
  Layer
>;
