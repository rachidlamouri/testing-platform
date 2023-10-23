import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';

const APP_RENDERER_DELAYER_ID_TEMPLATE = [
  'programmedTransformName',
  'distinguisher',
] as const satisfies GenericComplexIdTemplate;
type AppRendererDelayerIdTemplate = typeof APP_RENDERER_DELAYER_ID_TEMPLATE;
class AppRendererDelayerId extends ComplexId<AppRendererDelayerIdTemplate> {
  get rawTemplate(): AppRendererDelayerIdTemplate {
    return APP_RENDERER_DELAYER_ID_TEMPLATE;
  }
}

type AppRendererDelayerConstructorInput = {
  programmedTransformName: string;
  distinguisher?: string;
};

/**
 * Allows a programmed transform to guarantee that it runs before "renderApp". "renderApp"
 * triggers off the collection of this item, so it will have to wait until the
 * entire collection is ready
 */
type AppRendererDelayer = Required<
  SimplifyN<
    [
      {
        id: AppRendererDelayerId;
      },
      AppRendererDelayerConstructorInput,
    ]
  >
>;

export const { AppRendererDelayerInstance } = buildNamedConstructorFunction({
  constructorName: 'AppRendererDelayerInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'programmedTransformName',
    'distinguisher',
  ],
} as const)
  .withTypes<AppRendererDelayerConstructorInput, AppRendererDelayer>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { programmedTransformName, distinguisher = '' } = input;

      const id = new AppRendererDelayerId({
        programmedTransformName,
        distinguisher,
      });

      return {
        id,
        programmedTransformName,
        distinguisher,
      };
    },
  })
  .assemble();

export const APP_RENDERER_DELAYER_COLLECTION_ID = 'app-renderer-delayer';

type AppRendererDelayerCollectionId = typeof APP_RENDERER_DELAYER_COLLECTION_ID;

export type AppRendererDelayerStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    AppRendererDelayerCollectionId,
    AppRendererDelayer
  >;
